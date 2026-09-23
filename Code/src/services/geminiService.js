const { GoogleGenerativeAI } = require('@google/generative-ai');

const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  // Fallback to gemini-1.5-flash if env is missing or invalid
  const modelName = process.env.GEMINI_MODEL === 'gemini-1.5' ? 'gemini-1.5-flash' : (process.env.GEMINI_MODEL || 'gemini-1.5-flash');

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    // Initialize the client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Invalid Gemini response');
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
};

module.exports = {
  callGemini,
};