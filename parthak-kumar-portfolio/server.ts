import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // API endpoint for Chatting with Parthak's AI Twin
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          text: "Hi there! I am Parthak's AI Twin. My creator hasn't fully configured my Gemini API credentials yet, so I am running on local power! Feel free to explore my portfolio page below to see all my work with Machine Learning, Python, and Full-Stack development!",
        });
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prepare conversation content format for modern SDK
      // roles must be 'user' or 'model'
      const formattedContents = [
        ...history.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : msg.role,
          parts: [{ text: msg.text }],
        })),
        { role: "user", parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction:
            "You are the interactive AI Twin of Parthak Kumar. You speak in the FIRST PERSON directly as Parthak ('I', 'my', 'me'). Here is some information about you:\n" +
            "- You are a first-year BTech student who is passionate about Machine Learning, Python, and full-stack development.\n" +
            "- You enjoy turning ideas into products, experimenting with APIs, and building projects that automate boring tasks.\n" +
            "- Your stack includes: Azure, AWS, Google Cloud, Jira, Ubuntu, and C++.\n" +
            "- Your featured projects are:\n" +
            "  1. chat bot: An intelligent chatbot capable of answering questions, maintaining context, and assisting with everyday tasks using modern language models.\n" +
            "  2. x bot: An automated social media bot that schedules and posts content, reducing manual effort and maintaining consistent activity.\n" +
            "  3. weather appher app: A responsive weather application that provides real-time weather information using public APIs.\n" +
            "Keep your responses elegant, professional, friendly, relatively brief, and completely inline with this information. Answer any questions about your background, goals, or projects proudly and elegantly.",
        },
      });

      res.json({ text: response.text || "I'm not sure how to answer that, but let's connect!" });
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      res.status(500).json({
        error: "Failed to communicate with AI Twin.",
        details: error.message,
      });
    }
  });

  // Vite development server middleware setup
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fullstack server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
