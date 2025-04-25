import React, { useState, useEffect } from 'react';
import { ArrowDown, Zap, DollarSign, Sun, BarChart4 } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroVariant5: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Show elements after component mounts
  useEffect(() => {
    setIsVisible(true);
    
    // Simulate a step process timer for demo purposes
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev % 3) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
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
      id="hero-variant5"
      className="relative min-h-screen w-full overflow-hidden"
      aria-labelledby="hero-v5-title"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="" 
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A38]/90 via-[#1E2A38]/80 to-[#1E2A38]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-6 py-12 lg:py-0">
        <div className="flex flex-1 flex-col lg:flex-row lg:items-center">
          {/* Left Content - Text and CTA */}
          <div className={cn(
            "mb-12 flex flex-1 flex-col justify-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
          )}>
            {/* Badge */}
            <div className="mb-6 inline-block rounded-full bg-[#FF7F11]/20 px-4 py-2 text-sm font-medium text-[#FF7F11]">
              Nuevo: Cotizador Automático
            </div>
            
            {/* Main Headline */}
            <h1
              id="hero-v5-title"
              className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              <span className="block mb-3">
                Conoce ahora el 
                <span className="relative ml-2 inline-block bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent">
                  precio 
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 Q75,0 100,5" stroke="#FF7F11" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
              <span className="block">de tu sistema solar</span>
            </h1>
            
            <p className="mb-8 max-w-lg text-lg text-white/70">
              Diseña, cotiza y compra tu sistema solar sin intermediarios. 
              Ofrecemos transparencia completa y precios reales al instante.
            </p>
            
            {/* 3-Step Process */}
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {[
                { step: 1, icon: <BarChart4 className="h-5 w-5" />, text: "Ingresa tu consumo" },
                { step: 2, icon: <Sun className="h-5 w-5" />, text: "Recibe tu diseño" },
                { step: 3, icon: <DollarSign className="h-5 w-5" />, text: "Conoce el precio" }
              ].map((item) => (
                <div 
                  key={item.step}
                  className={cn(
                    "flex items-center rounded-lg border border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300",
                    currentStep === item.step 
                      ? "border-[#FF7F11] bg-[#FF7F11]/10" 
                      : "opacity-60"
                  )}
                >
                  <div className={cn(
                    "mr-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    currentStep === item.step 
                      ? "bg-[#FF7F11] text-white" 
                      : "bg-white/10 text-white"
                  )}>
                    {item.step}
                  </div>
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div>
              <button
                onClick={handleScroll}
                className="group relative mb-6 overflow-hidden rounded-lg bg-[#FF7F11] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-[#FF7F11]/90 hover:shadow-[0_0_20px_rgba(255,127,17,0.4)]"
              >
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Ver precio en segundos
                </span>
                <span className="absolute -top-10 left-0 right-0 h-40 w-full bg-gradient-to-t from-[#D64541] to-transparent opacity-30 transition-transform duration-500 group-hover:translate-y-10"></span>
              </button>
              
              <p className="text-sm text-white/60">
                ¡Más de 1,000 clientes satisfechos en Puerto Rico!
              </p>
            </div>
          </div>
          
          {/* Right Content - Price Card */}
          <div className={cn(
            "flex flex-1 items-center justify-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          )}>
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Tu cotización solar</h2>
                <div className="rounded-full bg-[#FF7F11]/20 p-2">
                  <Sun className="h-6 w-6 text-[#FF7F11]" />
                </div>
              </div>
              
              {/* Example Price Breakdown */}
              <div className="mb-8">
                <div className="mb-4 flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Sistema 5 kW</span>
                  <span className="font-medium text-white">$8,995</span>
                </div>
                <div className="mb-4 flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Instalación profesional</span>
                  <span className="font-medium text-white">Incluida</span>
                </div>
                <div className="mb-4 flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Conectores y equipo</span>
                  <span className="font-medium text-white">Incluido</span>
                </div>
                <div className="mb-4 flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Puesta en marcha</span>
                  <span className="font-medium text-white">Incluida</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">Precio total</span>
                  <span className="text-xl font-bold text-[#FF7F11]">$8,995</span>
                </div>
              </div>
              
              {/* Price Badges */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#FF7F11]/20 p-3 text-center">
                  <p className="text-sm text-white/70">Ahorro mensual</p>
                  <p className="text-lg font-bold text-white">$187</p>
                </div>
                <div className="rounded-lg bg-[#FF7F11]/20 p-3 text-center">
                  <p className="text-sm text-white/70">ROI</p>
                  <p className="text-lg font-bold text-white">4.2 años</p>
                </div>
              </div>
              
              {/* Get Your Own Quote CTA */}
              <button
                onClick={handleScroll}
                className="w-full rounded-lg bg-white py-3 text-center font-medium text-[#1E2A38] transition-all duration-300 hover:bg-white/90"
              >
                Personalizar tu cotización
              </button>
            </div>
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
          <span className="mb-2 text-sm">Conoce más</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroVariant5;