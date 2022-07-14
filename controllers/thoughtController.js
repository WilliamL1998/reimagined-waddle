const { User, Thought }  = require("../models");

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
    },
    addThought(req, res) {
        Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        })
            .then((thoughtData) => {
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { thoughts: thoughtData._id } },
                    { new: true }
                )
                res.json(thoughtData)
            })
    },
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { thoughText: req.params.thoughtText,
            username: req.params.username},
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
    },
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.json({ message: "Thought deleted." }))
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: [
                {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username
                }
            ]}},
            { new: true }
        )
            .then(reactionData => res.json(reactionData))
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then(reactionData => res.json(reactionData))
    }
}