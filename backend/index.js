const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Model/Users');
const DonorModel = require('./Model/Donor');
const RecipientModel = require('./Model/Recipient');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/reddrop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// ------------------- ROUTES ----------------------

// User Registration
app.post("/getData", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await UserModel.create({ firstName, lastName, email, password });
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// User Login
app.post('/checkData', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email doesn't exist" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Password is incorrect" });
    }

    if (user.firstName !== firstName || user.lastName !== lastName) {
      return res.json({ success: false, message: "Name does not match" });
    }

    res.json({ success: true, userId: user._id, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Donor Registration
app.post('/getDonorData', async (req, res) => {
  try {
    const donorData = req.body;

    if (!mongoose.Types.ObjectId.isValid(donorData.userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const newDonor = new DonorModel(donorData);
    const savedDonor = await newDonor.save();

    res.status(201).json({ success: true, message: "Donor registered successfully", donor: savedDonor });
  } catch (error) {
    console.error("Error saving donor data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Recipient Registration
app.post('/getRecipientData', async (req, res) => {
  try {
    const { bloodType, age, gender, reason, contactNumber, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    await RecipientModel.create({ bloodType, age, gender, reason, contactNumber, userId });

    res.status(201).json({ success: true, message: "Recipient registered successfully" });
  } catch (error) {
    console.error("Error saving recipient data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Count Donors and Recipients
app.get('/countStats', async (req, res) => {
  try {
    const donorCount = await DonorModel.countDocuments();
    const recipientCount = await RecipientModel.countDocuments();
    res.json({ success: true, donors: donorCount, recipients: recipientCount });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Fetch All Donors
app.get('/allDonors', async (req, res) => {
  try {
    const donors = await DonorModel.find();
    res.json(donors);  // Return only the array of donors
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Fetch All Recipients
app.get('/allRecipients', async (req, res) => {
  try {
    const recipients = await RecipientModel.find();
    res.json(recipients);  // Return only the array of recipients
  } catch (error) {
    console.error("Error fetching recipients:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Check Blood Availability
app.get('/checkBloodAvailability', async (req, res) => {
  const { bloodType } = req.query;

  try {
    if (!bloodType) {
      return res.status(400).json({ success: false, message: "Blood type is required" });
    }

    const donorAvailable = await DonorModel.exists({ bloodType });

    res.json({ success: true, available: donorAvailable ? true : false });
  } catch (error) {
    console.error("Error checking blood availability:", error);
    res.status(500).json({ success: false, available: false, message: "Internal server error" });
  }
});

// Server Listen
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
