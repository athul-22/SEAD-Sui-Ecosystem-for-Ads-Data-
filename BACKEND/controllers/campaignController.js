const Campaign = require('../models/campaign');

// POST: Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const {
      suiwid,
      campaignName,
      campaignObjective,
      adTitle,
      adDescription,
      adImage,
      adLink,
      totalBudget,
      totalDays,
      cpc,
      interests,
      locations,
      startDate,
      endDate,
    } = req.body;

    // Log the request body for debugging
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!suiwid || !campaignName || !adTitle || !adLink || !totalBudget || !cpc) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create a new campaign object
    const campaign = new Campaign({
      suiwid,
      campaignName,
      campaignObjective,
      adTitle,
      adDescription,
      adImage,
      adLink,
      totalBudget,
      totalDays,
      cpc,
      interests,
      locations,
      startDate,
      endDate,
    });

    // Save the campaign to the database
    const savedCampaign = await campaign.save();

    // Respond with the saved campaign data
    res.status(201).json({
      message: 'Campaign created successfully',
      campaign: savedCampaign,
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
