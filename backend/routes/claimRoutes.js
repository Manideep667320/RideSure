const express = require('express');
const { submitClaimController, getClaimController, getUserClaimsController } = require('../controllers/claimController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All claim routes are protected

router.post('/submit', submitClaimController);
router.get('/', getUserClaimsController);
router.get('/:id', getClaimController);

module.exports = router;
