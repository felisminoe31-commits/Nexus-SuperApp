import { GoogleGenAI } from "@google/genai";
import { TOOL_SYSTEM_PROMPTS, FALLBACK_SYSTEM_PROMPT } from '../constants';
import { Tool, Language } from '../types';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Calls the Google Gemini API with multimodal support.
 */
export async function callGeminiAPI(
  tool: Tool, 
  userInput: string, 
  language: Language,
  base64Image?: string,
  outputType?: 'text' | 'image'
): Promise<string> {

  try {
    const isImageOutput = outputType === 'image';
    
    // Select Model: 
    // - gemini-2.5-flash-image for generating or editing images (Image Output)
    // - gemini-2.5-flash for text tasks (including vision tasks that output text)
    const modelId = isImageOutput ? 'gemini-2.5-flash-image' : 'gemini-2.5-flash';
    
    // --- 1. CONSTRUCT PROMPT ---
    // Retrieve the specific system prompt for this tool ID
    const systemPromptText = TOOL_SYSTEM_PROMPTS[tool.id] || FALLBACK_SYSTEM_PROMPT;
    
    // Append language instruction
    const langInstruction = language === 'pt' 
        ? "\n\nIMPORTANT: Responda SEMPRE em Português do Brasil, a menos que o prompt peça especificamente outro idioma." 
        : "\n\nIMPORTANT: Respond ALWAYS in English, unless the prompt specifically asks for another language.";

    // For text models, the system instruction goes into config.
    // For image models, instructions are part of the prompt contents.
    
    // --- 2. CONSTRUCT CONTENT PARTS ---
    const parts: any[] = [];

    // If there is an image input, add it (Vision or Image Editing)
    if (base64Image) {
      // Remove data URL prefix if present for clean base64
      const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Standardizing on jpeg/png for API
          data: cleanBase64
        }
      });
    }

    // Add text prompt
    // For image generation tools, we combine the "System Instruction" with the user input directly in the prompt
    // because gemini-2.5-flash-image works best this way for editing/generation instructions.
    if (isImageOutput) {
       parts.push({ text: `${systemPromptText}\n\nUser Request: ${userInput}` });
    } else {
       // For text tools, we just pass the user input as the content
       parts.push({ text: userInput });
    }

    // --- 3. EXECUTE REQUEST ---
    const config: any = {};
    
    if (!isImageOutput) {
      // Text Generation Config
      config.systemInstruction = systemPromptText + langInstruction;
      config.temperature = 0.7;
    } else {
      // Image Generation/Editing Config
      config.imageConfig = {
          aspectRatio: "1:1"
      }
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: config
    });

    // --- 4. PARSE RESPONSE ---
    
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        const content = candidates[0].content;
        
        // 1. Check for Image Output (Inline Data)
        for (const part of content.parts) {
            if (part.inlineData) {
                const base64Data = part.inlineData.data;
                return `data:image/png;base64,${base64Data}`;
            }
        }
        
        // 2. Check for Text Output
        if (content.parts[0].text) {
            return content.parts[0].text;
        }
    }

    return language === 'en' ? "No response generated." : "Nenhuma resposta gerada.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'en' 
      ? "Error processing your request. Please check your inputs and try again." 
      : "Erro ao processar sua solicitação. Verifique seus dados e tente novamente.";
  }
}