const feedback = require("../models/FeedbackModel.js")

const createFeedback = async (req, res) => {
    try {
        await feedback.create(req.body);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getFeedback = async (req, res) => {
    try {
        const feedbacks = await feedback.findAll();
        res.json(feedbacks);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getFeedbackById = async (req, res) => {
    let id = req.params.id
    try {
        const feedbacks = await feedback.findOne({
            where: { id: id }
        });
        res.status(200).send(feedbacks)
    } catch (error) {
        res.json({ message: error.message });
    }
}



const deleteFeedback = async (req, res) => {
    try {
        await feedback.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const updateFeedback = async (req, res) => {
    try {
        await feedback.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {
    createFeedback,
    getFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedback
}