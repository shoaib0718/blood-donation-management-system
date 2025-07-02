const express = require('express');
const router = express.Router();
const Donor = require('../models/donorModel');
const authenticateToken = require('../middleware/authMiddleware');

// ✅ Get all donors (Optional - you can protect this if you want)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Search donors by blood group
router.get('/search', authenticateToken, async (req, res) => {
  const bloodGroup = req.query.bloodGroup;
  try {
    const donors = await Donor.find({ bloodGroup });
    res.json({ donors });
  } catch (err) {
    res.status(500).json({ message: 'Search error' });
  }
});

// ✅ Add/Update donor details (Frontend POSTs to /api/donors)
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, bloodGroup, contact, address, lastDonation } = req.body;

    // If you want to update donor by userId (if you have that in your schema), do so
    // Otherwise just create a new donor

    const donor = new Donor({
      name,
      bloodGroup,
      contact,
      address,
      lastDonation: lastDonation ? new Date(lastDonation) : null,
    });

    const savedDonor = await donor.save();

    res.json({ message: 'Donor details saved', donor: savedDonor });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save donor details' });
  }
});


module.exports = router;
