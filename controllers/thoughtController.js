const { User, Thought }  = require("../models");

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
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
            })
    },
}