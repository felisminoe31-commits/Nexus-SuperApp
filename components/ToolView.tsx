import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Send, Copy, Check } from 'lucide-react';
import { Tool, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { callGeminiAPI } from '../services/ai';

interface ToolViewProps {
  tool: Tool;
  lang: Language;
  onBack: () => void;
  onAddToHistory: (input: string, output: string) => void;
}

const ToolView: React.FC<ToolViewProps> = ({ tool, lang, onBack, onAddToHistory }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const t = TRANSLATIONS[lang];
  const Icon = tool.icon;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const response = await callGeminiAPI(tool.type, input, lang);
      setResult(response);
      onAddToHistory(input, response);
    } catch (e) {
      setResult(lang === 'en' ? "Error generating content." : "Erro ao gerar conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-20 bg-[#09090b] flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center p-4 border-b border-white/10 bg-glass-200 backdrop-blur-xl shrink-0">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Icon className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-white leading-none">
                {lang === 'en' ? tool.name : tool.namePt}
                </h2>
                <p className="text-[10px] text-gray-400">
                    {lang === 'en' ? tool.description : tool.descriptionPt}
                </p>
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 relative z-10 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Input Section */}
          <div className="bg-glass-100 border border-white/10 rounded-2xl p-4 md:p-6 space-y-2 shadow-xl">
            <label className="text-xs font-semibold text-neon-blue uppercase tracking-wider flex items-center gap-2">
               {t.common.input_label}
            </label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/50 resize-none transition-colors"
              placeholder={t.common.placeholder}
            ></textarea>
          </div>

          {/* Result Section */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-glass-200 border border-white/10 rounded-2xl p-4 md:p-6 space-y-2 shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"></div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-neon-green uppercase tracking-wider">
                      {t.common.result_label}
                    </label>
                    <button 
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                 </div>
                 <div className="prose prose-invert max-w-none text-sm md:text-base text-gray-200 whitespace-pre-wrap leading-relaxed">
                   {result}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 bg-glass-200 border-t border-white/10 backdrop-blur-xl relative z-10 shrink-0">
        <button
          disabled={loading || !input.trim()}
          onClick={handleGenerate}
          className="w-full max-w-3xl mx-auto py-4 bg-gradient-to-r from-neon-blue to-blue-600 rounded-xl font-bold text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.common.processing}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {lang === 'en' ? 'Generate' : 'Gerar'}
            </>
          )}
        </button>
      </div>

    </motion.div>
  );
};

export default ToolView;