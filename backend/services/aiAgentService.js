const fetch = require('node-fetch'); // Assuming Node >= 18 has native fetch, but we can just use global fetch.

/**
 * AI Agent workflow simulator for hackathon integrated with Supervity AI
 */
const evaluateClaim = async (policy, claimData, userId) => {
    // We'll use the native fetch if available, which it should be on Node 22
    const token = process.env.SUPERVITY_API_TOKEN;
    const workflowId = process.env.SUPERVITY_WORKFLOW_ID;

    if (!token || !workflowId) {
        throw new Error("Supervity configuration missing from environment variables.");
    }

    const formData = new FormData();
    formData.append('workflowId', workflowId);
    formData.append('inputs[image_url]', claimData.image_url || '');
    formData.append('inputs[description]', claimData.description || '');
    formData.append('inputs[user_id]', userId || 'mock_user');
    formData.append('inputs[timestamp]', new Date().toISOString());
    formData.append('inputs[gps_location]', claimData.GPS || 'unknown');
    formData.append('inputs[policy_status]', policy ? policy.status : 'inactive');
    formData.append('inputs[claim_history]', claimData.claim_history || 'none');

    try {
        const response = await fetch("https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "x-source": "v1"
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`AI Agent Workflow failed: ${response.statusText}`);
        }

        const textData = await response.text();
        const lines = textData.split('\n');

        let finalDecision = 'REVIEW';
        let finalScore = 0.5;
        let finalFlags = [];
        let finalExplanation = 'Claim requires manual review due to missing AI analysis.';

        // Parse SSE stream
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const payload = JSON.parse(line.replace('data: ', '').trim());
                    
                    if (payload.type === 'WorkflowRunFinish' && payload.data && payload.data.outputs) {
                        const outputs = payload.data.outputs;
                        
                        if (outputs.decision) {
                            // "Rejected", "Approved", "Review" -> uppercase
                            finalDecision = outputs.decision.toUpperCase();
                        }
                        if (outputs.score !== undefined) {
                            finalScore = parseFloat(outputs.score);
                        }
                        if (outputs.flags && Array.isArray(outputs.flags)) {
                            finalFlags = outputs.flags;
                        }
                        if (outputs.explanation) {
                            finalExplanation = outputs.explanation;
                        }
                    }
                } catch (e) {
                    // Ignore JSON parsing errors for partial lines
                    console.error("Supervity SSE Parse Error:", e);
                }
            }
        }

        return {
            decision: finalDecision,
            risk_score: finalScore,
            flags: finalFlags,
            ai_explanation: finalExplanation
        };

    } catch (error) {
        console.error("Supervity API Call Failed:", error);
        // Fallback or re-throw
        return {
            decision: 'REVIEW',
            risk_score: 0.5,
            flags: ['API_ERROR'],
            ai_explanation: 'Failed to evaluate claim with Supervity AI. Defaulting to manual review.'
        };
    }
};

module.exports = {
    evaluateClaim
};
