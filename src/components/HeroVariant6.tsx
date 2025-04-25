import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sun, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Typing effect component for the headline
const TypeWriter: React.FC<{ text: string, delay?: number, className?: string }> = ({ 
  text, 
  delay = 100,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  
  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block h-5 w-1 animate-pulse bg-white align-middle"></span>
      )}
    </span>
  );
};

const HeroVariant6: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  // Show component elements with animation
  useEffect(() => {
    setIsVisible(true);
    
    // Set animation complete after a delay
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Particle animation
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particleCount = 100;
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
    }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: `rgba(255, 127, 17, ${Math.random() * 0.5 + 0.2})`,
        speed: Math.random() * 0.7 + 0.2,
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particles) {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move particles upward
        particle.y -= particle.speed;
        
        // Reset particles when they reach the top
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameRef.current);
    };
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
      id="hero-variant6"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1a2130] via-[#1E2A38] to-[#243447]"
      aria-labelledby="hero-v6-title"
    >
      {/* Particle Background */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      {/* Large decorative sun */}
      <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF7F11] to-[#D64541] opacity-20 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Animated intro badge */}
        <div className={cn(
          "mb-8 transform transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        )}>
          <span className="inline-flex items-center rounded-full bg-[#FF7F11]/20 px-4 py-2 text-[#FF7F11]">
            <Sun className="mr-2 h-4 w-4" />
            SunCom Global - Energía solar directa al consumidor
          </span>
        </div>
        
        {/* Main headline with typing effect */}
        <div className={cn(
          "mb-12 max-w-4xl transform transition-all duration-1000 delay-200",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <h1
            id="hero-v6-title"
            className="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            <span className="block mb-4">Genera tu presupuesto solar</span>
            <span className="block">y obtén un </span>
            {animationComplete ? (
              <span className="mt-2 block text-[#FF7F11]">PRECIO EN TIEMPO REAL</span>
            ) : (
              <TypeWriter 
                text="PRECIO EN TIEMPO REAL" 
                className="mt-2 block text-[#FF7F11]" 
              />
            )}
          </h1>
          
          <p className="mx-auto mb-6 max-w-2xl text-xl text-white/70">
            Sin vendedores, sin intermediarios, sin comisiones. 
            Conoce el costo exacto de tu sistema solar en menos de 2 minutos.
          </p>
          
          {/* Animated features */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {[
              "Precios sin competencia",
              "Instalación inmediata",
              "Garantía completa",
              "Financiamiento disponible"
            ].map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transform transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  { "transition-delay-300": index === 0 },
                  { "transition-delay-400": index === 1 },
                  { "transition-delay-500": index === 2 },
                  { "transition-delay-600": index === 3 }
                )}
                style={{ transitionDelay: `${300 + (index * 100)}ms` }}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-[#FF7F11]"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={cn(
          "max-w-md transform transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Primary CTA */}
          <button
            onClick={handleScroll}
            className="group relative mb-4 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#FF7F11] to-[#D64541] px-8 py-4 text-xl font-medium text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,127,17,0.5)]"
          >
            <span className="relative z-10 flex items-center justify-center">
              Calcular precio ahora
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#D64541] to-[#FF7F11] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          </button>
          
          {/* Secondary action */}
          <div className="text-center">
            <button 
              onClick={handleScroll}
              className="text-white/70 underline underline-offset-4 hover:text-white"
            >
              Ver opciones de financiamiento
            </button>
          </div>
          
          {/* Trust badge */}
          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
            <p className="text-sm text-white/80">
              <span className="font-bold text-white">Garantía de precio:</span> Mostramos el precio real de tu sistema, sin trucos ni inflación artificial.
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex justify-center">
        <a
          href="#section2"
          className="flex flex-col items-center text-white opacity-60 transition-opacity hover:opacity-100"
          onClick={handleScroll}
          aria-label="Scroll to next section"
        >
          <span className="mb-2 text-sm">Más información</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroVariant6;