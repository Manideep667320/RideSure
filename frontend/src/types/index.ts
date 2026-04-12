export interface User {
  id: string;
  email: string;
  name: string;
  role: 'gig_worker' | 'admin';
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  premiumAmount: number;
  coverageLimit: number;
  status: 'active' | 'pending' | 'expired';
}

export interface Claim {
  id: string;
  policyId: string;
  amount: number;
  reason: string;
  status: 'processing' | 'approved' | 'rejected';
  createdAt: string;
}
