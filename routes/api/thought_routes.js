const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
   try {
    const thoughtId = req.params.id;
    const updatedThoughtData = req.body;
    
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updatedThoughtData, {new: true, runValidators: true});
    
    if (!updatedThought) {
        return res.status(404).json({message: 'No thought with this id!'});
    } 
    res.json(updatedThought);
    
   } catch (error) {
        res.status(500).json(error);
   }
});

router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        thought.reactions.push(req.body);
        await thought.save();
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/reactionId', async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            thought.reactions.pull(req.params.reactionId);
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;


