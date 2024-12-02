const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Campaign = require('./models/campaign'); 
const User = require('./models/User');

const app = express();

const { SuiClient } = require('@mysten/sui/client');
const { Transaction } = require('@mysten/sui/transactions');
const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mongoose connection
const mongoURI = 'mongodb+srv://user:user@cluster0suiadnetwork.tsxr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0suiadnetwork';

mongoose.connect(mongoURI)
  .then(() => console.log('🚀 MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// POST: Create a new campaign
app.post('/campaigns', async (req, res) => {
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
});

app.get('/dashboard/:suiwid', async (req, res) => {
  try {
    const { suiwid } = req.params;
    const campaigns = await Campaign.find({ suiwid });
    
    const stats = {
      totalCampaigns: campaigns.length,
      activeAds: campaigns.filter(c => c.status === 'active').length,
      totalReach: campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
      totalSpent: campaigns.reduce((sum, c) => sum + (parseFloat(c.totalBudget) || 0), 0),
      recentCampaigns: campaigns.slice(0, 5)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Analytics data
app.get('/analytics/:suiwid', async (req, res) => {
  try {
    const { suiwid } = req.params;
    const campaigns = await Campaign.find({ suiwid });
    
    const analytics = {
      performanceByDay: {},
      campaignPerformance: campaigns.map(c => ({
        name: c.campaignName,
        impressions: c.impressions || 0,
        clicks: c.clicks || 0,
        spent: c.totalBudget
      })),
      totalStats: {
        impressions: campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
        clicks: campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
        spent: campaigns.reduce((sum, c) => sum + (parseFloat(c.totalBudget) || 0), 0)
      }
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// app.get('/analytics/:suiwid', async (req, res) => {
//   try {
//     const { suiwid } = req.params;
//     const { startDate, endDate } = req.query;

//     const query = { suiwid };
//     if (startDate && endDate) {
//       query.createdAt = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     }

//     const campaigns = await Campaign.find(query);

//     const analyticsData = {
//       campaignPerformance: campaigns.map(c => ({
//         name: c.campaignName,
//         impressions: Math.floor(Math.random() * 10000),
//         clicks: Math.floor(Math.random() * 1000),
//         spent: c.totalBudget
//       })),
      
//       demographics: {
//         age: [
//           { group: '18-24', value: 25 },
//           { group: '25-34', value: 40 },
//           { group: '35-44', value: 20 },
//           { group: '45+', value: 15 }
//         ],
//         location: [
//           { name: 'North America', value: 45 },
//           { name: 'Europe', value: 30 },
//           { name: 'Asia', value: 15 },
//           { name: 'Others', value: 10 }
//         ]
//       },

//       blockchainDistribution: [
//         { chain: 'Ethereum', value: 40 },
//         { chain: 'Polygon', value: 25 },
//         { chain: 'Sui', value: 20 },
//         { chain: 'Others', value: 15 }
//       ],

//       conversionMetrics: {
//         daily: Array.from({ length: 30 }, (_, i) => ({
//           date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
//           conversions: Math.floor(Math.random() * 100)
//         }))
//       }
//     };

//     res.json(analyticsData);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });




app.get('/campaigns/:suiwid', async (req, res) => {
  try {
    const { suiwid } = req.params;
    const campaigns = await Campaign.find({ suiwid });
    
    const formattedCampaigns = campaigns.map(campaign => ({
      _id: campaign._id,
      campaignName: campaign.campaignName,
      status: campaign.status,
      totalBudget: campaign.totalBudget,
      spent: campaign.spent,
      metrics: campaign.metrics,
      ctr: ((campaign.metrics.clicks / campaign.metrics.impressions) * 100).toFixed(2) + '%',
      startDate: campaign.startDate,
      endDate: campaign.endDate
    }));

    res.json(formattedCampaigns);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.patch('/campaigns/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/campaigns/active', async (req, res) => {
  try {
    const campaigns = await Campaign.find({ 
      status: 'active',
      spent: { $lt: { $ref: 'totalBudget' } }
    });
    
    if (!campaigns.length) {
      return res.status(404).json({ message: 'No active campaigns available' });
    }
    
    // Randomly select one campaign
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Routes
app.post('/api/users/reward', async (req, res) => {
  try {
    const { suiwid, campaignId } = req.body;
    
    const campaign = await Campaign.findById(campaignId);
    if (!campaign || campaign.spent >= campaign.totalBudget) {
      return res.status(400).json({ message: 'Invalid campaign or budget exhausted' });
    }

    let user = await User.findOne({ suiwid });
    if (!user) {
      user = new User({ suiwid });
    }

    // Add reward
    const rewardAmount = campaign.cpc;
    user.rewardActivity.push({
      type: 'Ad View',
      amount: rewardAmount,
      campaignId
    });
    user.balance += rewardAmount;
    user.totalEarned += rewardAmount;
    await user.save();

    // Update campaign metrics
    campaign.metrics.impressions += 1;
    campaign.spent += rewardAmount;
    await campaign.save();

    // Call Sui smart contract
    const mintResult = await mintEduSui(suiwid, rewardAmount);

    res.json({ 
      success: true,
      user,
      mintResult
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:suiwid', async (req, res) => {
  try {
    const user = await User.findOne({ suiwid: req.params.suiwid })
      .populate('rewardActivity.campaignId');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🎉🎉🎉🎉🎉🎉 SUI CONTRACT DEPLOYEMENT AND TRANSACTION  🎉🎉🎉🎉🎉🎉

// const { SuiClient } = require('@mysten/sui/client');
// const { Transaction } = require('@mysten/sui/transactions');
// const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');

// async function mintEduSui(recipientAddress, amount) {
//   const client = new SuiClient({ url: process.env.SUI_RPC_URL });
//   const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY);

//   const tx = new Transaction();
//   tx.moveCall({
//     target: `${process.env.PACKAGE_ID}::edusui::mint`,
//     arguments: [
//       tx.object(process.env.TREASURY_CAP_ID),
//       tx.pure.u64(BigInt(amount * 1000000000)), // Convert to proper decimals
//       tx.pure.address(recipientAddress),
//     ],
//   });

//   const result = await client.signAndExecuteTransaction({
//     transaction: tx,
//     signer: keypair,
//     options: { showEffects: true }
//   });

//   return result;
// }

async function mintEduSui(recipientAddress, rewardAmount) {
  try {
    // Initialize SUI client
    const client = new SuiClient({ url: "https://rpc-testnet.suiscan.xyz/" });

    // Constants from your deployment
    const PACKAGE_ID = "0xa0d68ecfe5366bee3880370e592dd98fdccf6fc897bb1980a508f6e4ead44058";
    const TREASURY_CAP_ID = "0x250388b71c82ebfef09a2b15be93e880c9924c32889aebf7b1f113f7abf6393c";

    // if (!process.env.PRIVATE_KEY) {
    //   throw new Error("PRIVATE_KEY is not defined in the environment variables");
    // }

    // Create keypair from private key
    const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY);

    // Create transaction block
    const tx = new Transaction();

    // Convert reward amount to proper decimals (9 decimals)
    const amount = BigInt(rewardAmount * 1000000000);

    // Add mint call to transaction
    tx.moveCall({
      target: `${PACKAGE_ID}::sead::mint`,
      arguments: [
        tx.object(TREASURY_CAP_ID),
        tx.pure.u64(amount),
        tx.pure.address(recipientAddress),
      ],
    });

    // Sign and execute the transaction
    const result = await client.signAndExecuteTransaction({
      transaction: tx,
      signer: keypair,
      options: {
        showEffects: true,
        showEvents: true,
        showBalanceChanges: true,
      },
    });

    console.log("Minting successful:", result);
    return result;

  } catch (error) {
    console.error("Error minting SEAD tokens:", error);
    throw error;
  }
}

app.get('/api/users/:suiwid/balance', async (req, res) => {
  try {
    const user = await User.findOne({ suiwid: req.params.suiwid })
      .select('balance totalEarned');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      balance: user.balance,
      totalEarned: user.totalEarned
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:suiwid/activity', async (req, res) => {
  try {
    const user = await User.findOne({ suiwid: req.params.suiwid })
      .select('rewardActivity')
      .populate({
        path: 'rewardActivity.campaignId',
        select: 'adTitle adImage campaignName'
      })
      .sort({ 'rewardActivity.timestamp': -1 })
      .limit(20);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.rewardActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Simplified impression API
app.post('/api/ads/impression', async (req, res) => {
  try {
    const { suiwid } = req.body;
    if (!suiwid) {
      return res.status(400).json({ message: 'suiwid is required' });
    }

    const rewardAmount = 1; // 1 token for impression

    // Find or create user
    let user = await User.findOne({ suiwid });
    if (!user) {
      user = new User({ 
        suiwid,
        balance: 0,
        totalEarned: 0
      });
    }

    // Add reward
    user.rewardActivity.push({
      type: 'Ad Impression',
      amount: rewardAmount
    });
    user.balance += rewardAmount;
    user.totalEarned += rewardAmount;
    await user.save();

    // Try to mint tokens
    try {
      const mintResult = await mintEduSui(suiwid, rewardAmount);
      return res.json({
        success: true,
        reward: rewardAmount,
        balance: user.balance,
        totalEarned: user.totalEarned,
        mintResult
      });
    } catch (mintError) {
      console.error('Minting error:', mintError);
      // Still return success since we updated the database
      return res.json({
        success: true,
        reward: rewardAmount,
        balance: user.balance,
        totalEarned: user.totalEarned,
        mintError: mintError.message
      });
    }
  } catch (error) {
    console.error('Error processing impression:', error);
    res.status(500).json({ error: error.message });
  }
});

// Simplified click API
app.post('/api/ads/click', async (req, res) => {
  try {
    const { suiwid } = req.body;
    if (!suiwid) {
      return res.status(400).json({ message: 'suiwid is required' });
    }

    const rewardAmount = 10; // 10 tokens for click

    // Find or create user
    let user = await User.findOne({ suiwid });
    if (!user) {
      user = new User({ 
        suiwid,
        balance: 0,
        totalEarned: 0
      });
    }

    // Add reward
    user.rewardActivity.push({
      type: 'Ad Click',
      amount: rewardAmount
    });
    user.balance += rewardAmount;
    user.totalEarned += rewardAmount;
    await user.save();

    // Try to mint tokens
    try {
      const mintResult = await mintEduSui(suiwid, rewardAmount);
      return res.json({
        success: true,
        reward: rewardAmount,
        balance: user.balance,
        totalEarned: user.totalEarned,
        mintResult
      });
    } catch (mintError) {
      console.error('Minting error:', mintError);
      // Still return success since we updated the database
      return res.json({
        success: true,
        reward: rewardAmount,
        balance: user.balance,
        totalEarned: user.totalEarned,
        mintError: mintError.message
      });
    }
  } catch (error) {
    console.error('Error processing click:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { suiwid } = req.body;
    
    let user = await User.findOne({ suiwid });
    if (!user) {
      user = new User({ 
        suiwid,
        balance: 0,
        totalEarned: 0
      });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user details with reward history
app.get('/api/users/:suiwid/details', async (req, res) => {
  try {
    const user = await User.findOne({ suiwid: req.params.suiwid })
      .populate({
        path: 'rewardActivity.campaignId',
        select: 'adTitle adImage campaignName'
      });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      suiwid: user.suiwid,
      balance: user.balance,
      totalEarned: user.totalEarned,
      rewardHistory: user.rewardActivity.map(activity => ({
        type: activity.type,
        amount: activity.amount,
        timestamp: activity.timestamp,
        campaign: activity.campaignId
      }))
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
app.get('/api/users/:suiwid/stats', async (req, res) => {
  try {
    const user = await User.findOne({ suiwid: req.params.suiwid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const stats = {
      totalEarned: user.totalEarned,
      currentBalance: user.balance,
      totalImpressions: user.rewardActivity.filter(a => a.type === 'Ad Impression').length,
      totalClicks: user.rewardActivity.filter(a => a.type === 'Ad Click').length,
      recentActivity: user.rewardActivity.slice(-5) // Last 5 activities
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});