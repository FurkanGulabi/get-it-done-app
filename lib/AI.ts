import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateDescriptionFromTitleAI(prompt: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(
    `Create a professional and concise todo task description based on this title: "${prompt}"

    Important:
    - Detect the language of the title and use THE SAME LANGUAGE for the description
    - If title is in Turkish, write description in Turkish
    - If title is in English, write description in English
    - Match the language style and tone of the input title

    Requirements:
    - Keep it under 150 characters
    - Use clear, professional language
    - Focus on actionable items
    - Avoid unnecessary words
    - Be specific and direct
    - Use present tense
    - Just give the description
    
    Examples:
    If title is "Weekly team meeting": "Coordinate and lead weekly team sync to discuss project progress, blockers, and next steps."
    If title is "Haftalık ekip toplantısı": "Proje ilerlemesini, engelleri ve sonraki adımları görüşmek için haftalık ekip toplantısını koordine et ve yönet."
    `
  );
  const response = result.response;
  const text = response.text();

  return text;
}
