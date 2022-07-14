const { User, Thought } = require('../models');

module.exports = {
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .populate('friends')
            .populate('thoughts')
            .then(userData  => res.json(userData))
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then(userData => res.json(userData))
    },
    addUser(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            friends: [req.body.friends],
            thoughts: [req.body.thoughts]
        })
            .then(userData => res.json(userData))
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, {
            username: req.body.username,
            email: req.body.email,
            friends: [req.body.friends],
            thoughts: [req.body.thoughts]
        }, { new: true })
            .then(userData => res.json(userData))
    },
    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
            .then(userData => {
                Thought.deleteMany({ _id: { $in: userData.thoughts } })
            })
            .then(() => res.json({ message: "User and user's thoughts deleted." }))
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendsId } }, { new: true })
            .then(friendData => res.json(friendData))
    },
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendsId } }, { new: true })
            .then(friendData => res.json(friendData))
    }
}