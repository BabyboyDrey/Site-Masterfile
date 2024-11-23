const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

async function getChaptGptResponse(prompt) {
  try {
    // Dynamically import the `openai` package since it is an ES Module
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Call OpenAI API with the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1048, // Ensure max_tokens is at the correct level
    });

    // Return the response content
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Failed to get ChatGPT response:", err);
    throw err;
  }
}

module.exports = getChaptGptResponse;
