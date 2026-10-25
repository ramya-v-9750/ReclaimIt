
const express = require('express');
const router = express.Router();
const FoundItem = require('../models/FoundItem');

// Get all found items
router.get('/', async (req, res) => {
  try {
    const foundItems = await FoundItem.find().sort({ createdAt: -1 });
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new found item (❌ removed auth for now)
router.post('/', async (req, res) => {
  try {
    const foundItem = new FoundItem(req.body);
    await foundItem.save();
    res.status(201).json(foundItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

