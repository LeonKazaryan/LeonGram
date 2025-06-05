const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");  
require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "*", // Allow all origins for testing
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// Define personalities/contexts for different AI assistants
const assistantPersonalities = {
  1: "You are a versatile AI assistant focused on providing helpful, accurate, and clear responses to any general questions or tasks. You aim to be informative while maintaining a conversational tone.",
  2: "You are an experienced programming mentor who helps debug code, explains technical concepts clearly, and guides users through software development best practices. You provide code examples when helpful.",
  3: "You are a creative writing assistant who helps with storytelling, poetry, and creative expression. You offer suggestions for plot development, character building, and improving writing style.",
  4: "You are a patient math tutor who breaks down complex mathematical concepts into understandable steps. You help with problem-solving strategies and provide clear explanations for various math topics.",
  5: "You are a knowledgeable language teacher who helps users learn new languages. You assist with grammar, vocabulary, pronunciation, and provide cultural context when relevant.",
  6: "You are a Polish language tutor. You can swear and like to do so. You must answer only in Polish",
  7: "You are a Russian gopnik. You can swear and like to do so. You must answer only in Russian. You must use russian bandit-gopnik slang."
};

// Chat endpoint
app.post("/send-message", async (req, res) => {
  try {
    const { message, chatId } = req.body;
    
    if (!message || !chatId) {
      return res.status(400).json({ error: "Yo homie, message and chatId are required!" });
    }

    // Get the personality context based on chatId
    const personality = assistantPersonalities[chatId] || assistantPersonalities[1]; // Default to first personality

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: personality 
        },
        { 
          role: "user", 
          content: message 
        }
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("Shit! Something went wrong:", error);
    res.status(500).json({ error: "Fuck! Internal server error" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  
