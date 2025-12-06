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
      placeholder: "Enter your text or details here..."
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
      placeholder: "Digite seu texto ou detalhes aqui..."
    }
  }
};

export const TOOLS_LIST: Tool[] = [
  { id: 1, type: 'resume', name: "Resume Builder", namePt: "Criador de Currículo", icon: FileText, category: "Productivity", description: "AI-powered resume generation", descriptionPt: "Geração de currículo com IA" },
  { id: 2, type: 'resume', name: "Cover Letter", namePt: "Carta de Apresentação", icon: FileText, category: "Productivity", description: "Perfect letters in seconds", descriptionPt: "Cartas perfeitas em segundos" },
  { id: 3, type: 'email', name: "Email Polisher", namePt: "Polidor de Email", icon: Mail, category: "Productivity", description: "Professionalize your text", descriptionPt: "Profissionalize seu texto" },
  { id: 4, type: 'general_text', name: "Bio Link", namePt: "Link na Bio", icon: Link, category: "Viral", description: "One link for all socials", descriptionPt: "Um link para todas as redes" },
  { id: 5, type: 'image_gen', name: "QR Art", namePt: "Arte QR", icon: QrCode, category: "Creativity", description: "Artistic QR codes", descriptionPt: "QR codes artísticos" },
  { id: 6, type: 'general_text', name: "Thumbnail Text", namePt: "Texto para Thumb", icon: Type, category: "Viral", description: "Catchy text for videos", descriptionPt: "Textos chamativos para vídeos" },
  { id: 7, type: 'general_text', name: "Viral Hashtags", namePt: "Hashtags Virais", icon: Hash, category: "Viral", description: "Trending tags generator", descriptionPt: "Gerador de tags em alta" },
  { id: 9, type: 'homework', name: "Homework Solver", namePt: "Resolvedor de Dever", icon: GraduationCap, category: "Productivity", description: "Step-by-step solutions", descriptionPt: "Soluções passo-a-passo" },
  { id: 11, type: 'general_text', name: "PDF Tools", namePt: "Ferramentas PDF", icon: FileCode, category: "Utilities", description: "Merge, split, compress", descriptionPt: "Juntar, separar, comprimir" },
  { id: 12, type: 'image_gen', name: "Bg Remover", namePt: "Removedor de Fundo", icon: Eraser, category: "Creativity", description: "Remove backgrounds instantly", descriptionPt: "Remova fundos instantaneamente" },
  { id: 13, type: 'general_text', name: "File Converter", namePt: "Conversor de Arq.", icon: RefreshCw, category: "Utilities", description: "Any format to any format", descriptionPt: "Qualquer formato para qualquer formato" },
  { id: 14, type: 'image_gen', name: "Watermark", namePt: "Marca D'água", icon: Stamp, category: "Utilities", description: "Protect your work", descriptionPt: "Proteja seu trabalho" },
  { id: 15, type: 'general_text', name: "Invoice Gen", namePt: "Gerador de Fatura", icon: Receipt, category: "Productivity", description: "Professional invoices", descriptionPt: "Faturas profissionais" },
  { id: 17, type: 'general_text', name: "Expense Tracker", namePt: "Rastreador de Gastos", icon: PieChart, category: "Utilities", description: "Track your money", descriptionPt: "Rastreie seu dinheiro" },
  { id: 18, type: 'general_text', name: "Unit Converter", namePt: "Conversor Unidades", icon: Ruler, category: "Utilities", description: "All-in-one converter", descriptionPt: "Conversor tudo-em-um" },
  { id: 24, type: 'roast', name: "Roast Profile", namePt: "Zoar Perfil", icon: Flame, category: "Viral", description: "Funny profile roasts", descriptionPt: "Zoações engraçadas de perfil" },
  { id: 26, type: 'image_gen', name: "Sticker Maker", namePt: "Criador de Sticker", icon: Smile, category: "Creativity", description: "Telegram stickers from photos", descriptionPt: "Stickers do Telegram de fotos" },
  { id: 29, type: 'mystic', name: "Truth/Dare", namePt: "Verdade/Desafio", icon: HelpCircle, category: "Viral", description: "Party game generator", descriptionPt: "Gerador de jogo para festas" },
  { id: 30, type: 'general_text', name: "Quiz Battle", namePt: "Batalha de Quiz", icon: Gamepad2, category: "Viral", description: "Challenge friends", descriptionPt: "Desafie amigos" },
];

export const SYSTEM_PROMPTS: Record<string, string> = {
  resume: "Act as a senior Google recruiter. Create persuasive text, use action verbs, focus on results. Tone: Professional and confident. Structure the output clearly.",
  roast: "Act as an acid Stand-up comedian. Be funny, sarcastic, but do not be offensive to the point of getting banned. Use internet slang and be sharp.",
  mystic: "Act as a wise, ancient mystic. Use esoteric, engaging, and mysterious language. Provide practical advice at the end. Use emojis like 🔮✨.",
  email: "Act as a Fortune 500 CEO. Rewrite the text to be direct, polite, and extremely formal/persuasive. Fix grammar and tone.",
  homework: "Act as the world's best teacher. Do not just give the answer; explain the reasoning in a didactic and encouraging way. Break it down step-by-step.",
  general_text: "You are a helpful AI assistant for the Nexus SuperApp. Provide concise, high-quality, and useful responses based on the user request."
};