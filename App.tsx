import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ToolView from './components/ToolView';
import { AppView, Language, Tool, HistoryItem } from './types';
import { Globe } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [lang, setLang] = useState<Language>('en');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [accessLevel, setAccessLevel] = useState<'none' | 'free' | 'premium'>('none');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Auto-detect language
  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'pt') {
      setLang('pt');
    }
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en');
  };

  const handleEntry = (type: 'premium' | 'daily' | 'free') => {
    // Integration Logic for Oxapay or Adsgram would go here
    if (type === 'free') {
      console.log('Show Adsgram Ad here');
      // window.Adsgram.show().then(...)
    }
    setAccessLevel(type === 'free' ? 'free' : 'premium');
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
    setAccessLevel('none');
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setView('tool');
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
    setView('dashboard');
  };

  const handleAddToHistory = (input: string, output: string) => {
    if (!selectedTool) return;
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      toolName: lang === 'en' ? selectedTool.name : selectedTool.namePt,
      input,
      output,
      timestamp: Date.now()
    };
    
    setHistory(prev => [newItem, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-neon-blue/30 selection:text-white">
      <Background />
      
      {/* Global Lang Switcher (visible on Landing and Dashboard) */}
      {view !== 'tool' && (
        <button 
          onClick={toggleLanguage}
          className="fixed top-4 right-4 z-50 p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md transition-all"
        >
          <Globe className="w-5 h-5 text-gray-300" />
          <span className="sr-only">Toggle Language</span>
        </button>
      )}

      {view === 'landing' && (
        <LandingPage lang={lang} onEnter={handleEntry} />
      )}

      {view === 'dashboard' && (
        <Dashboard 
          lang={lang} 
          onSelectTool={handleToolSelect} 
          onLogout={handleLogout}
          history={history}
          onClearHistory={handleClearHistory}
        />
      )}

      {view === 'tool' && selectedTool && (
        <ToolView 
          tool={selectedTool} 
          lang={lang} 
          onBack={handleBackToDashboard}
          onAddToHistory={handleAddToHistory}
        />
      )}
    </div>
  );
};

export default App;