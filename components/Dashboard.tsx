import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, LogOut, History, X, Trash2 } from 'lucide-react';
import { TOOLS_LIST, TRANSLATIONS } from '../constants';
import { Language, Category, Tool, HistoryItem } from '../types';

interface DashboardProps {
  lang: Language;
  onSelectTool: (tool: Tool) => void;
  onLogout: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ lang, onSelectTool, onLogout, history, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showHistory, setShowHistory] = useState(false);
  
  const t = TRANSLATIONS[lang].dashboard;

  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesSearch = (lang === 'en' ? tool.name : tool.namePt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Category[] = ['All', 'Productivity', 'Creativity', 'Utilities', 'Viral'];

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">{t.welcome}</h2>
          <p className="text-xs text-neon-blue flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Premium Active
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative"
            >
              <History className="w-5 h-5 text-gray-300" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-pink rounded-full border border-black"></span>
              )}
            </button>
            <button 
              onClick={onLogout}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-colors group"
              title={t.logout}
            >
              <LogOut className="w-5 h-5 text-gray-300 group-hover:text-red-500" />
            </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder={t.search_placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-glass-100 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-all backdrop-blur-md"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                : 'bg-glass-100 text-gray-400 border border-white/5 hover:bg-white/10'
            }`}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-3 sm:grid-cols-4 gap-4"
      >
        {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-glass-100 border border-white/5 hover:bg-white/10 hover:border-neon-blue/30 transition-all group aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-black/50 border border-white/5">
                    <Icon className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors" />
                </div>
                <span className="text-[10px] text-center text-gray-300 font-medium leading-tight">
                  {lang === 'en' ? tool.name : tool.namePt}
                </span>
              </motion.button>
            )
        })}
      </motion.div>
      
      {filteredTools.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No tools found.
        </div>
      )}

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 50 }}
               className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-h-[80vh] md:w-full md:max-w-md z-50 bg-[#0f0f11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
               <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                 <h3 className="font-display font-bold text-lg">{t.history_title}</h3>
                 <div className="flex gap-2">
                    {history.length > 0 && (
                        <button 
                            onClick={onClearHistory}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                            title={t.clear_history}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                    <button 
                        onClick={() => setShowHistory(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                 </div>
               </div>
               
               <div className="overflow-y-auto p-4 space-y-3 scrollbar-hide flex-1">
                 {history.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>{t.history_empty}</p>
                    </div>
                 ) : (
                    history.map((item) => (
                        <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-sm text-neon-blue">{item.toolName}</span>
                                <span className="text-[10px] text-gray-500">
                                    {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <div className="bg-black/30 p-2 rounded-lg text-xs text-gray-400 truncate">
                                {item.input}
                            </div>
                            <div className="pl-2 border-l-2 border-neon-green/50 text-xs text-gray-300 line-clamp-3">
                                {item.output}
                            </div>
                        </div>
                    ))
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;