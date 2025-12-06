import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Zap, Lock, Star, ChevronRight, CheckCircle2, 
  Layers, Palette, Share2, TrendingUp 
} from 'lucide-react';
import { TRANSLATIONS, TOOLS_LIST } from '../constants';
import { Language } from '../types';

interface LandingPageProps {
  lang: Language;
  onEnter: (type: 'premium' | 'daily' | 'free') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ lang, onEnter }) => {
  const t = TRANSLATIONS[lang].landing;
  const tDash = TRANSLATIONS[lang].dashboard;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax for Hero Text
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Mouse Tilt Logic for Cards
  const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width - 0.5);
      y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-all duration-200 ease-out ${className}`}
      >
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen bg-[#09090b] overflow-hidden selection:bg-neon-blue/30 text-white">
      
      {/* 1. ORBITAL HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center perspective-1000 overflow-hidden">
        
        {/* The 3D Orbital Ring Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
           <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-[spin_60s_linear_infinite]">
              {TOOLS_LIST.map((tool, i) => {
                const angle = (i / TOOLS_LIST.length) * 2 * Math.PI;
                const Icon = tool.icon;
                return (
                  <div 
                    key={i}
                    className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 flex items-center justify-center rounded-xl bg-glass-100 border border-white/10 shadow-[0_0_15px_rgba(0,243,255,0.2)] backdrop-blur-sm transform hover:scale-150 transition-transform"
                    style={{ 
                      transform: `rotate(${angle}rad) translate(350px) rotate(-${angle}rad)` // Orbit logic
                    }}
                  >
                    <Icon className="w-5 h-5 text-neon-blue" />
                  </div>
                )
              })}
              {/* Inner Rings */}
              <div className="absolute inset-20 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="absolute inset-40 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
           </div>
        </div>

        {/* Central Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Nexus OS v2.0 Live</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            NEXUS
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {lang === 'en' 
              ? "The singular interface for your digital existence." 
              : "A interface singular para sua existência digital."}
            <br/>
            <span className="text-neon-blue font-semibold">
              {lang === 'en' ? "19 Premium Tools. 1 Super App." : "19 Ferramentas Premium. 1 Super App."}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onEnter('premium')}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              <span className="relative flex items-center gap-2">
                {t.cta_lifetime} <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <button 
              onClick={() => onEnter('free')}
              className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-medium backdrop-blur-sm"
            >
              {t.cta_free}
            </button>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* 2. BENTO GRID FEATURES */}
      <section className="py-32 px-4 relative z-20 bg-[#09090b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              {lang === 'en' ? "Everything you need." : "Tudo o que você precisa."}
            </h2>
            <p className="text-gray-400">
              {lang === 'en' ? "Stop switching apps. Start creating." : "Pare de trocar de apps. Comece a criar."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Productivity (Large) */}
            <Card className="md:col-span-2 bg-glass-100 rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-neon-blue/30">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-4 text-neon-blue border border-neon-blue/20">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tDash.categories['Productivity']}</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    {lang === 'en' ? "Resume builder, Cover letters, Homework solver." : "Criador de currículos, Cartas, Dever de casa."}
                  </p>
                </div>
                {/* Visual Representation */}
                <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feature 2: Creativity */}
            <Card className="bg-glass-100 rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-neon-purple/30">
               <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center mb-4 text-neon-purple border border-neon-purple/20">
                    <Palette className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-2">{tDash.categories['Creativity']}</h3>
                    <p className="text-gray-400 text-sm">
                      QR Art, Sticker Maker, Bg Remover.
                    </p>
                 </div>
               </div>
            </Card>

            {/* Feature 3: Viral Tools */}
            <Card className="bg-glass-100 rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-neon-pink/30">
               <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center mb-4 text-neon-pink border border-neon-pink/20">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-2">{tDash.categories['Viral']}</h3>
                    <p className="text-gray-400 text-sm">
                      Roast Profile, Viral Hashtags.
                    </p>
                 </div>
               </div>
            </Card>

            {/* Feature 4: Utilities (Wide) */}
            <Card className="md:col-span-2 bg-glass-100 rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-neon-green/30">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center mb-4 text-neon-green border border-neon-green/20">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tDash.categories['Utilities']}</h3>
                  <p className="text-gray-400 text-sm">
                    {lang === 'en' ? "PDF Tools, Converters, Invoices." : "Ferramentas PDF, Conversores, Faturas."}
                  </p>
                </div>
                 <div className="flex gap-4 overflow-hidden mask-linear-fade">
                    {[1,2,3].map(i => (
                        <div key={i} className="flex-1 h-16 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white/10"></div>
                        </div>
                    ))}
                 </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. PRICING PASSES */}
      <section className="py-20 pb-32 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             
             {/* Daily Pass */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-glass-100 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
             >
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-300">Daily Access</h3>
                        <p className="text-sm text-gray-500">24 Hours Access</p>
                    </div>
                    <span className="text-2xl font-display font-bold">3 USDT</span>
                </div>
                <button 
                    onClick={() => onEnter('daily')}
                    className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm"
                >
                    {lang === 'en' ? "Purchase Daily" : "Comprar Diário"}
                </button>
             </motion.div>

             {/* Lifetime Pass (Hero) */}
             <motion.div 
               whileHover={{ y: -10 }}
               className="bg-[#0f0f11] border border-neon-blue/30 rounded-3xl p-1 relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]"
             >
                <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 to-transparent pointer-events-none"></div>
                <div className="bg-[#0f0f11] rounded-[22px] p-8 relative z-10 h-full flex flex-col">
                    <div className="absolute top-0 right-0 p-4">
                        <Star className="w-6 h-6 text-neon-blue fill-neon-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Lifetime Pass</h3>
                    <p className="text-neon-blue text-sm font-medium uppercase tracking-wider mb-6">
                        {lang === 'en' ? "Best Value" : "Melhor Valor"}
                    </p>

                    <ul className="space-y-4 mb-8 flex-1">
                        {[1,2,3,4].map((_, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                                <span>{t.benefits[i]}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-4xl font-display font-bold text-white">7 USDT</span>
                        <span className="text-gray-500 text-sm mb-2 line-through">15 USDT</span>
                    </div>

                    <button 
                        onClick={() => onEnter('premium')}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                    >
                        {t.cta_lifetime}
                    </button>
                </div>
             </motion.div>

           </div>

           <div className="mt-12 text-center">
             <button 
                onClick={() => onEnter('free')}
                className="text-gray-500 hover:text-white text-sm underline transition-colors"
             >
                {lang === 'en' ? "Continue with Free Version (Ads enabled)" : "Continuar Versão Grátis (Com anúncios)"}
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;