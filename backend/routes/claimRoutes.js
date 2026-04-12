const express = require('express');
const { submitClaimController, getClaimController } = require('../controllers/claimController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All claim routes are protected

router.post('/submit', submitClaimController);
router.get('/:id', getClaimController);

module.exports = router;
