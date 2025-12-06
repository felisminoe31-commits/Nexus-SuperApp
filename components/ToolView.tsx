import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Send, Copy, Check, Upload, X, Download, ImageIcon } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const t = TRANSLATIONS[lang];
  const Icon = tool.icon;
  const isImageOutput = tool.outputType === 'image';
  const acceptsImage = tool.inputType === 'image' || tool.inputType === 'both';
  const acceptsText = tool.inputType === 'text' || tool.inputType === 'both';

  const handleGenerate = async () => {
    if (!input.trim() && !selectedImage) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      // Pass the entire tool object for precise prompt selection
      const response = await callGeminiAPI(
          tool, 
          input, 
          lang, 
          selectedImage || undefined,
          tool.outputType
      );
      setResult(response);
      
      onAddToHistory(input || (lang === 'en' ? '[Image Input]' : '[Imagem de Entrada]'), response);
    } catch (e) {
      setResult(lang === 'en' ? "Error generating content." : "Erro ao gerar conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result && !isImageOutput) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadImage = () => {
    if (result && isImageOutput) {
        const link = document.createElement('a');
        link.href = result;
        link.download = `nexus-${tool.type}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

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
          <div className="bg-glass-100 border border-white/10 rounded-2xl p-4 md:p-6 space-y-4 shadow-xl">
            <label className="text-xs font-semibold text-neon-blue uppercase tracking-wider flex items-center gap-2">
               {t.common.input_label}
            </label>

            {/* Image Upload Input */}
            {acceptsImage && (
                <div className="space-y-3">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    
                    {!selectedImage ? (
                        <button 
                            onClick={triggerFileInput}
                            className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-neon-blue/50 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Upload className="w-5 h-5 text-gray-400 group-hover:text-neon-blue" />
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-white font-medium">
                                {t.common.upload_image}
                            </span>
                        </button>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black/50">
                            <img src={selectedImage} alt="Input" className="w-full h-48 object-contain" />
                            <button 
                                onClick={clearImage}
                                className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full hover:bg-red-500/80 transition-colors text-white"
                                title={t.common.remove_image}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Text Input */}
            {acceptsText && (
                <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/50 resize-none transition-colors"
                placeholder={t.common.placeholder}
                ></textarea>
            )}
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
                 <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-semibold text-neon-green uppercase tracking-wider">
                      {t.common.result_label}
                    </label>
                    
                    {isImageOutput ? (
                         <button 
                         onClick={downloadImage}
                         className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20"
                       >
                         <Download className="w-3 h-3" />
                         {t.common.download_image}
                       </button>
                    ) : (
                        <button 
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                        >
                        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy'}
                        </button>
                    )}
                 </div>

                 <div className="min-h-[100px] flex items-center justify-center">
                    {isImageOutput ? (
                        <div className="relative group w-full">
                            {result.startsWith('data:image') ? (
                                <img 
                                    src={result} 
                                    alt="Generated Result" 
                                    className="w-full rounded-lg shadow-lg border border-white/10" 
                                />
                            ) : (
                                // Fallback if API returns text error for image request
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                                    {result}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="prose prose-invert max-w-none text-sm md:text-base text-gray-200 whitespace-pre-wrap leading-relaxed w-full">
                        {result}
                        </div>
                    )}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 bg-glass-200 border-t border-white/10 backdrop-blur-xl relative z-10 shrink-0">
        <button
          disabled={loading || (!input.trim() && !selectedImage)}
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