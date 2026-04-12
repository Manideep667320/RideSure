const express = require('express');
const { createPolicyController, getPolicyStatusController } = require('../controllers/policyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All policy routes are protected

router.post('/create', createPolicyController);
router.get('/status', getPolicyStatusController);

module.exports = router;
