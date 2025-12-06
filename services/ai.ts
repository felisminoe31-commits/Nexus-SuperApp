import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPTS } from '../constants';
import { ToolType, Language } from '../types';

// Initialize the Gemini AI client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey:  AIzaSyB_zAm2D6Oi_IVNecAC4VkMXGlmMneOxOI});

/**
 * Calls the Google Gemini API with the appropriate system prompt based on the tool type.
 */
export async function callGeminiAPI(
  toolType: ToolType, 
  userInput: string, 
  language: Language
): Promise<string> {
  
  // Handle Image Tools (Simulation for now as per requirements)
  if (toolType === 'image_gen') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const msg = language === 'en' 
          ? "⚠️ Simulation: Image processed successfully.\n(In the full version, this connects to the Image Generation API)."
          : "⚠️ Simulação: Imagem processada com sucesso.\n(Na versão completa, isso conecta à API de Geração de Imagem).";
        resolve(msg);
      }, 2000);
    });
  }

  try {
    const modelId = 'gemini-2.5-flash';
    
    // Select the correct system prompt
    const baseSystemPrompt = SYSTEM_PROMPTS[toolType] || SYSTEM_PROMPTS['general_text'];
    
    // Enforce output language
    const langInstruction = language === 'pt' 
      ? " IMPORTANT: Responda SEMPRE em Português do Brasil." 
      : " IMPORTANT: Respond ALWAYS in English.";

    const systemInstruction = baseSystemPrompt + langInstruction;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: userInput,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creative balance
      },
    });

    return response.text || (language === 'en' ? "No response generated." : "Nenhuma resposta gerada.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'en' 
      ? "Error processing your request. Please try again later." 
      : "Erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
}