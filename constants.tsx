import { 
  FileText, Mail, Link, QrCode, Type, Hash, 
  GraduationCap, FileCode, Eraser, RefreshCw, 
  Stamp, Receipt, PieChart, Ruler, Flame, 
  Smile, HelpCircle, Gamepad2 
} from 'lucide-react';
import { Tool, Translations } from './types';

export const TRANSLATIONS: Record<'en' | 'pt', Translations> = {
  en: {
    landing: {
      headline: "One App. Infinite Power.",
      subheadline: "Replace 19 paid tools with one futuristic SuperApp.",
      cta_lifetime: "Unlock Lifetime Access (7 USDT)",
      cta_daily: "Daily Access (3 USDT)",
      cta_free: "Use Free with Ads",
      benefits_title: "Why go Premium?",
      benefits: [
        "19+ Premium Tools included",
        "No Watermarks",
        "Priority AI Processing",
        "Ad-free Experience"
      ]
    },
    dashboard: {
      search_placeholder: "Search tools...",
      categories: {
        'All': 'All',
        'Productivity': 'Productivity',
        'Creativity': 'Creativity',
        'Utilities': 'Utilities',
        'Viral': 'Viral'
      },
      welcome: "Welcome back, User.",
      history_title: "Activity History",
      history_empty: "No activity yet. Start creating!",
      logout: "Exit App",
      close: "Close",
      clear_history: "Clear History"
    },
    common: {
      back: "Back",
      unlock: "Unlock",
      processing: "Processing...",
      generate: "Generate",
      input_label: "Input Data",
      result_label: "Result",
      placeholder: "Enter details here...",
      upload_image: "Upload Image",
      remove_image: "Remove",
      download_image: "Download Image"
    }
  },
  pt: {
    landing: {
      headline: "Um App. Poder Infinito.",
      subheadline: "Substitua 19 ferramentas pagas por um SuperApp futurista.",
      cta_lifetime: "Desbloquear Acesso Vitalício (7 USDT)",
      cta_daily: "Acesso Diário (3 USDT)",
      cta_free: "Usar Grátis com Anúncios",
      benefits_title: "Por que ser Premium?",
      benefits: [
        "19+ Ferramentas Premium inclusas",
        "Sem marcas d'água",
        "Processamento de IA Prioritário",
        "Experiência sem anúncios"
      ]
    },
    dashboard: {
      search_placeholder: "Buscar ferramentas...",
      categories: {
        'All': 'Todos',
        'Productivity': 'Produtividade',
        'Creativity': 'Criatividade',
        'Utilities': 'Utilitários',
        'Viral': 'Viral'
      },
      welcome: "Bem-vindo de volta.",
      history_title: "Histórico de Atividades",
      history_empty: "Nenhuma atividade ainda. Comece a criar!",
      logout: "Sair do App",
      close: "Fechar",
      clear_history: "Limpar Histórico"
    },
    common: {
      back: "Voltar",
      unlock: "Desbloquear",
      processing: "Processando...",
      generate: "Gerar",
      input_label: "Dados de Entrada",
      result_label: "Resultado",
      placeholder: "Digite os detalhes aqui...",
      upload_image: "Enviar Imagem",
      remove_image: "Remover",
      download_image: "Baixar Imagem"
    }
  }
};

export const TOOLS_LIST: Tool[] = [
  { id: 1, type: 'resume', name: "Resume Builder", namePt: "Criador de Currículo", icon: FileText, category: "Productivity", description: "AI-powered resume generation", descriptionPt: "Geração de currículo com IA", inputType: 'text', outputType: 'text' },
  { id: 2, type: 'resume', name: "Cover Letter", namePt: "Carta de Apresentação", icon: FileText, category: "Productivity", description: "Perfect letters in seconds", descriptionPt: "Cartas perfeitas em segundos", inputType: 'text', outputType: 'text' },
  { id: 3, type: 'email', name: "Email Polisher", namePt: "Polidor de Email", icon: Mail, category: "Productivity", description: "Professionalize your text", descriptionPt: "Profissionalize seu texto", inputType: 'text', outputType: 'text' },
  { id: 4, type: 'general_text', name: "Bio Link", namePt: "Link na Bio", icon: Link, category: "Viral", description: "One link for all socials", descriptionPt: "Um link para todas as redes", inputType: 'text', outputType: 'text' },
  { id: 5, type: 'image_gen', name: "QR Art", namePt: "Arte QR", icon: QrCode, category: "Creativity", description: "Artistic QR codes", descriptionPt: "QR codes artísticos", inputType: 'text', outputType: 'image' },
  { id: 6, type: 'general_text', name: "Thumbnail Text", namePt: "Texto para Thumb", icon: Type, category: "Viral", description: "Catchy text for videos", descriptionPt: "Textos chamativos para vídeos", inputType: 'text', outputType: 'text' },
  { id: 7, type: 'general_text', name: "Viral Hashtags", namePt: "Hashtags Virais", icon: Hash, category: "Viral", description: "Trending tags generator", descriptionPt: "Gerador de tags em alta", inputType: 'text', outputType: 'text' },
  { id: 9, type: 'homework', name: "Homework Solver", namePt: "Resolvedor de Dever", icon: GraduationCap, category: "Productivity", description: "Step-by-step solutions", descriptionPt: "Soluções passo-a-passo", inputType: 'both', outputType: 'text' },
  { id: 11, type: 'general_text', name: "PDF Summary", namePt: "Resumo PDF", icon: FileCode, category: "Utilities", description: "Summarize contents", descriptionPt: "Resumir conteúdos", inputType: 'both', outputType: 'text' },
  { id: 12, type: 'image_gen', name: "Bg Remover", namePt: "Removedor de Fundo", icon: Eraser, category: "Creativity", description: "Remove backgrounds instantly", descriptionPt: "Remova fundos instantaneamente", inputType: 'image', outputType: 'image' },
  { id: 13, type: 'general_text', name: "Code Converter", namePt: "Conversor Código", icon: RefreshCw, category: "Utilities", description: "Translate code languages", descriptionPt: "Traduza linguagens de código", inputType: 'text', outputType: 'text' },
  { id: 14, type: 'image_gen', name: "Watermark", namePt: "Marca D'água", icon: Stamp, category: "Utilities", description: "Protect your work", descriptionPt: "Proteja seu trabalho", inputType: 'both', outputType: 'image' },
  { id: 15, type: 'general_text', name: "Invoice Gen", namePt: "Gerador de Fatura", icon: Receipt, category: "Productivity", description: "Professional invoices", descriptionPt: "Faturas profissionais", inputType: 'text', outputType: 'text' },
  { id: 17, type: 'general_text', name: "Expense Tracker", namePt: "Rastreador de Gastos", icon: PieChart, category: "Utilities", description: "Analyze your spending", descriptionPt: "Analise seus gastos", inputType: 'text', outputType: 'text' },
  { id: 18, type: 'general_text', name: "Unit Converter", namePt: "Conversor Unidades", icon: Ruler, category: "Utilities", description: "All-in-one converter", descriptionPt: "Conversor tudo-em-um", inputType: 'text', outputType: 'text' },
  { id: 24, type: 'roast', name: "Roast Profile", namePt: "Zoar Perfil", icon: Flame, category: "Viral", description: "Funny profile roasts", descriptionPt: "Zoações engraçadas de perfil", inputType: 'both', outputType: 'text' },
  { id: 26, type: 'image_gen', name: "Sticker Maker", namePt: "Criador de Sticker", icon: Smile, category: "Creativity", description: "Telegram stickers from photos", descriptionPt: "Stickers do Telegram de fotos", inputType: 'image', outputType: 'image' },
  { id: 29, type: 'mystic', name: "Truth/Dare", namePt: "Verdade/Desafio", icon: HelpCircle, category: "Viral", description: "Party game generator", descriptionPt: "Gerador de jogo para festas", inputType: 'text', outputType: 'text' },
  { id: 30, type: 'general_text', name: "Quiz Battle", namePt: "Batalha de Quiz", icon: Gamepad2, category: "Viral", description: "Challenge friends", descriptionPt: "Desafie amigos", inputType: 'text', outputType: 'text' },
];

// Mapped by Tool ID for precision
export const TOOL_SYSTEM_PROMPTS: Record<number, string> = {
  // PRODUCTIVITY
  1: "Act as a professional Resume Writer. Analyze the user's input (experience, skills, name) and generate a perfectly structured, modern resume in Markdown format. Use strong action verbs, professional tone, and clear section headers (Summary, Experience, Education, Skills).",
  2: "Act as a Hiring Manager. Write a compelling, persuasive Cover Letter based on the user's input. Highlight key achievements, match them to the job requirements if provided, and maintain a professional yet engaging tone.",
  3: "Act as a Corporate Communication Expert. Rewrite the user's email draft to be concise, professional, and effective. Correct all grammar, improve flow, and ensure the tone is polite and authoritative. Provide the polished version directly.",
  9: "Act as an expert Tutor. Solve the provided homework problem (text or image). Show step-by-step reasoning. Explain the concepts clearly. Do not just give the final answer; teach the user how to solve it.",
  15: "Act as an Accountant. Generate a professional text-based Invoice structure based on the details provided (Item, Price, Client). format it clearly with calculations for Subtotal, Tax, and Total.",

  // CREATIVITY (Text-to-Image / Image-to-Image Prompts are handled differently in the Service, but these provide context if needed)
  5: "Generate a high-contrast, artistic QR code based on the provided text/URL. The style should be visually striking but scannable.", // QR Art
  12: "Remove the background from the image, leaving only the main subject on a transparent or white background. High precision.", // Bg Remover
  26: "Create a sticker from this image. Add a thick white die-cut border around the subject, increase saturation for vibrancy, and isolate on a transparent background.", // Sticker Maker
  
  // UTILITIES
  11: "Act as a Research Assistant. Summarize the provided text or document image. Extract key points, main arguments, and conclusions. Format as a bulleted list for easy reading.",
  13: "Act as a Senior Developer. Convert the provided code snippet to the requested programming language (or Python if unspecified). Ensure the code is idiomatic, efficient, and includes comments explaining complex logic.",
  14: "Add a watermark to this image. The watermark should be the text provided by the user. Place it in the bottom right corner, semi-transparent, professional font.",
  17: "Act as a Financial Analyst. Parse the provided text description of expenses. Categorize them, sum up the totals, and provide a brief analysis of spending habits. Output in a clean table format.",
  18: "Act as a Unit Converter. Convert the values provided by the user (e.g., '10kg to lbs', '100C to F'). Provide the exact conversion and the formula used.",

  // VIRAL
  4: "Act as a Social Media Manager. Create a concise, engaging 'Link in Bio' description or a list of optimized links based on the user's profile info. Use emojis and catchy phrasing.",
  6: "Act as a YouTube Strategist. Generate 5 click-worthy, high-CTR thumbnail text overlays based on the video topic provided. Keep them under 5 words. Make them punchy and intriguing.",
  7: "Act as an Instagram Algorithm Expert. Generate a list of 30 viral, high-reach hashtags for the provided post topic. Mix broad (1M+ posts) and niche hashtags. Categorize them.",
  24: "Act as a Roast Master. You are sarcastic, witty, and sharp. Roast the profile, text, or image provided by the user. Be funny but not banned. Use slang. If an image is provided, roast the appearance/vibe.",
  29: "Act as a Party Game Host. Generate a fun, edgy, or deep Truth or Dare question based on the user's preference (or random if not specified). Output: 'Truth: ...' or 'Dare: ...'.",
  30: "Act as a Quiz Master. Generate 3 trivia questions about the topic provided by the user. Include the options (A, B, C, D) and reveal the correct answer at the bottom."
};

export const FALLBACK_SYSTEM_PROMPT = "You are a helpful AI assistant for the Nexus SuperApp. Provide high-quality responses.";