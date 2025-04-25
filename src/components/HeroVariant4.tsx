import React, { useState, useEffect } from 'react';
import { ArrowDown, Calculator, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroVariant4: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Ver precio en segundos';

  useEffect(() => {
    setIsVisible(true);

    // Typing animation for secondary text
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
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
      id="hero-variant4"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tl from-[#1E2A38] via-[#243447] to-[#1a2130]"
      aria-labelledby="hero-v4-title"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#FF7F11]/30 blur-[100px] animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 -right-20 h-60 w-60 rounded-full bg-[#D64541]/20 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_1s]"></div>
        <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-[#1E2A38]/40 blur-[80px] animate-[pulse_8s_ease-in-out_infinite_2s]"></div>
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Price Tag Badge */}
        <div className={cn(
          "mb-12 transform transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
        )}>
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF7F11] to-[#D64541] px-6 py-3 text-white shadow-lg">
            <Calculator className="mr-2 h-5 w-5" />
            <span className="text-lg font-semibold">
              {typedText}
              <span className="ml-1 inline-block h-5 w-1 animate-pulse bg-white"></span>
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className={cn(
          "max-w-4xl transform transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <h1
            id="hero-v4-title"
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            <span className="block mb-3">Descubre el precio</span>
            <span className="block">
              <span className="bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent">exacto y real</span>
            </span>
            <span className="block mt-3">de tu sistema solar</span>
          </h1>

          <p className="mb-10 mx-auto max-w-2xl text-xl text-white/80">
            Con nuestra calculadora transparente, conocerás al instante el costo y beneficio de tu inversión solar, sin intermediarios ni comisiones ocultas.
          </p>
        </div>

        {/* Main CTA and Benefits */}
        <div className={cn(
          "flex flex-col items-center transform transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {/* Primary CTA Button */}
          <button
            onClick={handleScroll}
            className="group relative mb-8 overflow-hidden rounded-xl bg-white px-10 py-5 text-xl font-semibold text-[#1E2A38] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <span className="relative z-10 flex items-center">
              Obtener precio al instante
              <ExternalLink className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#FF7F11] to-[#D64541] transition-all duration-300 group-hover:h-full"></span>
          </button>

          {/* Price Promise */}
          <div className="mb-12 rounded-lg border border-white/20 bg-white/5 px-6 py-4 backdrop-blur-sm">
            <p className="text-white">
              <span className="font-bold text-[#FF7F11]">Promesa de precio:</span> Sin costos ocultos, sin sorpresas
            </p>
          </div>

          {/* Benefits Highlights */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { highlight: "0%", text: "comisiones" },
              { highlight: "100%", text: "transparencia" },
              { highlight: "24h", text: "instalación rápida" },
              { highlight: "70%", text: "ahorro en factura" },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center rounded-lg bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="mb-1 text-2xl font-bold text-[#FF7F11]">{item.highlight}</span>
                <span className="text-sm text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex justify-center">
        <a
          href="#section2"
          className="flex flex-col items-center text-white opacity-60 transition-opacity hover:opacity-100"
          onClick={handleScroll}
          aria-label="Scroll to next section"
        >
          <span className="mb-2 text-sm">Más detalles</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroVariant4;