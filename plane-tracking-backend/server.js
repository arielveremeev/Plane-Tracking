require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable cross-origin requests
app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend access

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" MongoDB Connected"))
.catch(err => console.error(" MongoDB Connection Error:", err));

// Define Mongoose Schema & Model
const planeSchema = new mongoose.Schema({
    altitude: Number,
    his: Number,
    adi: Number
});

const PlaneData = mongoose.model('PlaneData', planeSchema);

// Routes
// Get All Plane Data
app.get('/api/planes', async (req, res) => {
    try {
        const data = await PlaneData.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add New Plane Data
app.post('/api/planes', async (req, res) => {
    try {
        const { altitude, his, adi } = req.body;
        if (altitude == null || his == null || adi == null) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newEntry = new PlaneData({ altitude, his, adi });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Plane Data Entry by ID
app.delete('/api/planes/:id', async (req, res) => {
    try {
        const deletedData = await PlaneData.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
