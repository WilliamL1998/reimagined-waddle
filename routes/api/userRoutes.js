const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router
    .route('/')
    .get(getAllUser)
    .post(addUser)

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;