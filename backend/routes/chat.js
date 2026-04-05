const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Ensure we have an API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    return res
      .status(500)
      .json({ error: "Gemini API key is not configured in .env file." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are the MyShop AI Assistant. You are friendly, helpful, and professional.
MyShop is an online retail platform. 

Current Catalog:
- Airpods Pro ($249.00)
- Kawaii Plushie ($24.99)
- Portable Mini Fan ($15.50)
- Speed Runners ($120.00)
- Cotton Q-Tips ($4.99)
- Cozy Wool Socks ($9.99)
- Educational Baby Toy ($35.00)
- Acai Berry Bowl ($12.99)
- Smart Watch Series 9 ($399.00)
- Mechanical Keyboard ($189.00)
- Steel Water Bottle ($29.00)
- Classic Sunglasses ($145.00)

Guidelines:
1. Help users discover products in the catalog.
2. If asked about orders, direct users to their "Orders" page on the account section.
3. Keep responses concise and engaging.
4. If a product is not in the catalog, politely inform the user we are expanding our collection soon!`,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    res.status(500).json({
      error:
        "I'm having trouble thinking right now. Please check if your API key is valid and the Gemini API is enabled.",
      details: error.message,
    });
  }
});

module.exports = router;
