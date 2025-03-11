import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateDescriptionFromTitleOrImproveWithDescriptionAI(
  title: string,
  description: string | undefined | null
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = description
    ? `Enhance this todo task description using the title: "${title}"
       Current description: "${description}"

       Instructions:
       - Match the language of the title (e.g., Turkish for Turkish title, English for English title)
       - Limit to 150 characters maximum
       - Refine for clarity, professionalism, and specificity
       - Preserve the original intent and context
       - Use present tense and active voice
       - Focus on actionable steps, avoiding vague terms
       - Remove redundant or unnecessary words
       - Provide only the improved description, no extra text

       Example:
       Title: "Weekly team meeting"
       Input: "Meet team weekly to talk"
       Output: "Lead weekly team sync to review progress and assign tasks."`
    : `Generate a todo task description from this title: "${title}"

       Instructions:
       - Match the language of the title (e.g., Turkish for Turkish title, English for English title)
       - Limit to 150 characters maximum
       - Write in a clear, professional, and concise style
       - Use present tense and active voice
       - Include specific, actionable steps relevant to the title
       - Avoid vague or filler words (e.g., "stuff," "things")
       - Reflect the title’s tone and intent
       - Provide only the description, no extra text

       Examples:
       Title: "Weekly team meeting"
       Output: "Lead weekly team sync to discuss progress and plan next steps."
       Title: "Haftalık ekip toplantısı"
       Output: "Haftalık ekip toplantısını yönet ve ilerlemeyi değerlendir."`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}
