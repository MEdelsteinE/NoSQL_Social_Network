const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const updateUser = await User.findByIdAndUpdate(userId, updatedUserData, {new: true, runValidators: true});

        if (!updateUser) {
            return res.status(404).json({message: 'No user with this id!'});
        }
        res.json(updateUser);
        } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId); 
        user.friends.push(friend);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);  
        const friend = await User.findById(req.params.friendId);
        
        user.friends.pull(friend);
    } catch (error) {

    }
});

module.exports = router;