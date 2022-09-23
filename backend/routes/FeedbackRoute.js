const {
    createFeedback,
    getFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedback
} = require("../controllers/FeedbackController.js");


const router = require('express').Router()
router.post('/', createFeedback);
router.get('/', getFeedback);
router.get('/:id', getFeedbackById);
router.delete('/:id', deleteFeedback);
router.patch('/:id', updateFeedback);

module.exports = router;
