import { GoogleGenAI } from "@google/genai";

export async function analyzeWithGemini(reviews: string[]) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a movie sentiment analysis expert.

Analyze the following movie reviews:

1. Provide a short 3-4 line summary of overall audience sentiment.
2. Extract 3 recurring themes (comma separated).
3. End your response with exactly:
Sentiment: positive OR mixed OR negative

Reviews:
${reviews.join("\n")}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
