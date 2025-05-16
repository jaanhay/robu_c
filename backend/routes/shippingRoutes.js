import express from 'express';
import Shipping from '../models/Shipping.js';
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    console.log("📦 Shipping POST hit");
    console.log("🧾 Request body:", req.body);

    const { userId, name, address, city, postalCode, country } = req.body;

    if (!userId || !name || !address || !city || !postalCode || !country) {
      return res.status(400).json({ message: 'Missing fields in shipping info' });
    }

    let shipping = await Shipping.findOne({ user: userId });

    if (shipping) {
      return res.status(400).json({ message: 'Shipping info already exists' });
    }

    shipping = new Shipping({
      user: userId,
      name,
      address,
      city,
      postalCode,
      country,
    });

    await shipping.save();
    res.status(201).json(shipping);
  } catch (err) {
    console.error("❌ Error saving shipping info:", err);
    res.status(500).json({ message: err.message });
  }
});

  
// Example Express route
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const shipping = await Shipping.findOne({ user: userId }); // ✅ not _id
      if (!shipping) {
        return res.status(404).json({ message: 'Shipping info not found' });
      }
      res.json(shipping);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
export default router;
