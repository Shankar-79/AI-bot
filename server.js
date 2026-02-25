import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messages,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);
      throw new Error(data.error?.message || "Groq API error");
    }

    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("✅ Groq server running on http://localhost:3001");
});