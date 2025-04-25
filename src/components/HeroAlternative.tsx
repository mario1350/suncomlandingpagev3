import React, { useState, useEffect } from 'react';
import { ArrowDown, Sun, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroAlternativeProps {
  onGetQuote?: () => void;
}

const HeroAlternative: React.FC<HeroAlternativeProps> = ({ onGetQuote }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Features that rotate through the highlight section
  const features = [
    { icon: <Sun className="h-6 w-6" />, text: "Energía Limpia" },
    { icon: <Zap className="h-6 w-6" />, text: "Ahorro Inmediato" },
    { icon: <DollarSign className="h-6 w-6" />, text: "Sin Inversión Inicial" },
  ];
  
  // Set visibility after component mounts (for animations)
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setIsAnimating(false);
      }, 300); // Half of the transition duration
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleGetQuote = () => {
    if (onGetQuote) {
      onGetQuote();
    } else {
      // Default behavior if no callback provided
      handleScroll({ preventDefault: () => {} } as React.MouseEvent);
    }
  };
  
  return (
    <section 
      id="hero-alt"
      className="relative min-h-[120vh] w-full overflow-hidden bg-gradient-to-br from-[#1E2A38] via-[#243447] to-[#1a2130]"
      aria-labelledby="hero-alt-title"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#FF7F11]/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#D64541]/10 blur-3xl"></div>
        
        {/* Solar Panel Pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="grid h-full w-full grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Company Name - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7F11]/80">
            <Sun className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">SunCom</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Image/Visualization */}
        <div className={cn(
          "flex flex-1 items-center justify-center p-8 transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          <div className="relative h-full max-h-[500px] w-full max-w-[500px]">
            {/* Stylized Sun Image - Even Smaller */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-28 md:h-32 md:w-32">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-[#FF7F11] to-[#D64541] blur-lg"></div>
                <div className="absolute inset-3 rounded-full bg-gradient-to-r from-[#FF7F11] to-[#D64541] opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sun className="h-10 w-10 md:h-12 md:w-12 text-white" />
                </div>
                
                {/* Orbiting Elements - Smaller */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  <div className="absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute top-1/2 -right-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Text Content */}
        <div className={cn(
          "flex flex-1 flex-col justify-center p-8 transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        )}>
          {/* Rotating Feature Highlight - Fixed to prevent wrapping issues */}
          <div className="mb-4 relative">
            <div className="flex items-center overflow-hidden rounded-full bg-gradient-to-r from-[#FF7F11] to-[#D64541] px-4 py-2 text-white w-[200px] sm:w-[240px]">
              <div className={cn(
                "flex items-center transition-all duration-600",
                isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              )}>
                {features[currentFeature].icon}
                <span className="ml-2 whitespace-nowrap">
                  {features[currentFeature].text}
                </span>
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 
            id="hero-alt-title"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            <span className="block mb-2">Transforma tu hogar</span>
            <span className="block">con <span className="bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent">energía solar</span></span>
            <span className="mt-2 block text-3xl font-light md:text-4xl">sin complicaciones</span>
          </h1>
          
          {/* Value Proposition */}
          <p className="mb-8 max-w-lg text-lg text-white/80">
            Descubre cuánto puedes ahorrar con un sistema solar personalizado. 
            Sin intermediarios, sin sorpresas, solo precios justos y transparentes.
          </p>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <button
              className="group relative mb-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF7F11] to-[#D64541] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,127,17,0.4)] focus:outline-none focus:ring-2 focus:ring-[#FF7F11]/50 sm:mb-0 sm:mr-4"
              onClick={handleGetQuote}
            >
              <span className="relative flex items-center justify-center">
                Cotiza gratis ahora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            
            <p className="text-white/60">
              <span className="font-bold text-white">Ahorra hasta 70%</span> en tu factura eléctrica
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center">
            <div className="mr-8 mb-4 flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-green-500"></div>
              <span className="text-sm text-white/70">100% Financiable</span>
            </div>
            <div className="mr-8 mb-4 flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-green-500"></div>
              <span className="text-sm text-white/70">Instalación Profesional</span>
            </div>
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-green-500"></div>
              <span className="text-sm text-white/70">Garantía 25 años</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Moved further down */}
      <div className="absolute bottom-12 left-0 right-0 z-20 mx-auto flex justify-center">
        <a
          href="#section2"
          className="flex flex-col items-center text-white opacity-60 transition-opacity hover:opacity-100"
          onClick={handleScroll}
          aria-label="Scroll to next section"
        >
          <span className="mb-3 text-sm">Descubre más</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroAlternative;