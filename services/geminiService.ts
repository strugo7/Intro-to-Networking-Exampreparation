import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
// Assume API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIExplanation = async (topic: string, query: string, language: 'en' | 'he'): Promise<string> => {
  try {
    const prompt = `
      You are an expert Computer Networks tutor.
      Topic context: ${topic}.
      User question: ${query}.
      Provide a concise, clear explanation suitable for an undergraduate student.
      Respond in ${language === 'en' ? 'English' : 'Hebrew'}.
      Limit response to 100 words.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now.";
  }
};