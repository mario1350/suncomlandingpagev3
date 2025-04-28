import React, { useState, useEffect } from 'react';
import { ChevronDown, Sun, BatteryCharging, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroModern: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animation for benefits
    const benefits = document.querySelectorAll('.benefit-item');
    benefits.forEach((benefit, index) => {
      setTimeout(() => {
        benefit.classList.add('opacity-100', 'translate-y-0');
      }, 300 + (index * 150));
    });
  }, []);
  
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section
      id="hero-modern"
      className="relative flex min-h-[110vh] w-full items-center justify-center bg-[#1E2A38] text-white overflow-hidden"
      aria-labelledby="hero-modern-title"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A38] via-[#1E2A38]/90 to-[#1E2A38]"></div>
      </div>
      
      {/* Content Container */}
      <div className={cn(
        "container relative z-10 px-6 transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="mx-auto max-w-5xl flex flex-col items-center">
          {/* Path Indicator */}
          <div className="mb-12 flex items-center justify-center">
            <div className="h-0.5 w-16 bg-[#FF7F11]"></div>
            <span className="mx-4 text-sm font-medium uppercase tracking-widest text-[#FF7F11]">
              SunCom Global
            </span>
            <div className="h-0.5 w-16 bg-[#FF7F11]"></div>
          </div>
          
          {/* Main Headline */}
          <h1 
            id="hero-modern-title"
            className="mb-6 text-center text-4xl font-bold md:text-5xl lg:text-7xl"
          >
            <span className="block mb-4">Energía Solar</span>
            <span className="block bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent">
              AL PRECIO JUSTO
            </span>
          </h1>
          
          <p className="mb-10 text-center text-xl text-white/70 md:text-2xl">
            Instalamos sistemas solares <span className="font-bold text-white">sin intermediarios</span>
          </p>
          
          {/* CTA Button */}
          <div className="mb-24 flex justify-center">
            <button
              className="relative overflow-hidden rounded-xl bg-[#FF7F11] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-[#FF7F11]/90 hover:shadow-[0_0_30px_rgba(255,127,17,0.6)]"
              onClick={handleScroll}
            >
              <span className="relative z-10">Comenzar Cotización</span>
              <span className="absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FF7F11] to-[#D64541] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </button>
          </div>
          
          {/* Benefits */}
          <div className="grid gap-6 md:grid-cols-3 w-full">
            <div className="benefit-item opacity-0 translate-y-4 transition-all duration-500 ease-out bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="mb-4 rounded-full bg-[#FF7F11]/20 p-4">
                <Sun className="h-8 w-8 text-[#FF7F11]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Energia Limpia</h3>
              <p className="text-white/70">Reduce tu huella de carbono mientras ahorras dinero.</p>
            </div>
            
            <div className="benefit-item opacity-0 translate-y-4 transition-all duration-500 ease-out bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="mb-4 rounded-full bg-[#FF7F11]/20 p-4">
                <BatteryCharging className="h-8 w-8 text-[#FF7F11]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Cotización Automática</h3>
              <p className="text-white/70">Recibe un precio justo al instante, sin esperas ni negociaciones.</p>
            </div>
            
            <div className="benefit-item opacity-0 translate-y-4 transition-all duration-500 ease-out bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="mb-4 rounded-full bg-[#FF7F11]/20 p-4">
                <PiggyBank className="h-8 w-8 text-[#FF7F11]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Ahorro Garantizado</h3>
              <p className="text-white/70">Reduce tu factura eléctrica hasta un 70% desde el primer mes.</p>
            </div>
          </div>
          {/* Scroll Cue */}
          <div className="mt-12 flex justify-center w-full">
            <button
              onClick={handleScroll}
              className="group flex flex-col items-center text-white opacity-70 transition-opacity hover:opacity-100"
              aria-label="Scroll to next section"
            >
              <span className="mb-2 text-sm">Vamos a empezar</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white/40">
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroModern;
