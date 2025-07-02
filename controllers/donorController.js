const Donor = require('../models/donorModel');

exports.addDonor = async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json(donor);
};

exports.getDonorsByGroup = async (req, res) => {
  const donors = await Donor.find({ bloodGroup: req.params.bloodGroup });
  res.json(donors);
};