const express = require('express');
const router = express.Router();
const District = require('../models/District');

// Get all districts
router.get('/', async (req, res) => {
  try {
    const districts = await District.find().sort({ name: 1 });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get district by ID
router.get('/:id', async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district) {
      return res.status(404).json({ error: 'District not found' });
    }
    res.json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
