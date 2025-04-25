import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Zap, CheckCircle2, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroVariant7: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  // Show elements with animation
  useEffect(() => {
    setIsVisible(true);
    
    // Animate benefits with staggered delay
    const benefits = document.querySelectorAll('.benefit-item');
    benefits.forEach((benefit, index) => {
      setTimeout(() => {
        benefit.classList.add('opacity-100', 'translate-y-0');
      }, 800 + (index * 150));
    });
  }, []);
  
  // Solar panel 3D visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Animation variables
    let time = 0;
    const panelWidth = canvas.width * 0.8;
    const panelHeight = canvas.height * 0.6;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw solar panel function
    const drawSolarPanel = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate rotation based on time
      time += 0.005;
      const rotationX = Math.sin(time) * 0.1;
      const rotationY = Math.cos(time) * 0.05;
      
      // Panel frame
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationY);
      ctx.scale(1, Math.cos(rotationX));
      
      // Draw panel background
      ctx.fillStyle = '#1a2130';
      ctx.fillRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
      
      // Draw grid of solar cells
      const cellsX = 8;
      const cellsY = 6;
      const cellWidth = panelWidth / cellsX;
      const cellHeight = panelHeight / cellsY;
      
      for (let x = 0; x < cellsX; x++) {
        for (let y = 0; y < cellsY; y++) {
          const cellX = -panelWidth / 2 + x * cellWidth;
          const cellY = -panelHeight / 2 + y * cellHeight;
          
          // Cell color with subtle animation
          const brightness = 0.3 + 0.1 * Math.sin(time + x * 0.2 + y * 0.3);
          ctx.fillStyle = `rgba(30, 100, 200, ${brightness})`;
          
          // Draw cell with margin
          ctx.fillRect(
            cellX + 2, 
            cellY + 2, 
            cellWidth - 4, 
            cellHeight - 4
          );
          
          // Add highlight to create 3D effect
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(cellX + 2, cellY + 2);
          ctx.lineTo(cellX + cellWidth - 4, cellY + 2);
          ctx.lineTo(cellX + cellWidth - 10, cellY + 8);
          ctx.lineTo(cellX + 8, cellY + 8);
          ctx.closePath();
          ctx.fill();
        }
      }
      
      // Draw reflections/glare
      const glarePosition = (Math.sin(time) + 1) / 2; // 0 to 1
      const gradient = ctx.createLinearGradient(
        -panelWidth / 2, 
        -panelHeight / 2 + panelHeight * glarePosition, 
        panelWidth / 2, 
        -panelHeight / 2 + panelHeight * glarePosition
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
      
      ctx.restore();
      
      // Frame
      ctx.strokeStyle = '#243447';
      ctx.lineWidth = 8;
      ctx.strokeRect(
        centerX - panelWidth / 2 - 4,
        centerY - panelHeight / 2 - 4,
        panelWidth + 8,
        panelHeight + 8
      );
      
      animationFrameRef.current = requestAnimationFrame(drawSolarPanel);
    };
    
    drawSolarPanel(0);
    
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
      id="hero-variant7"
      className="relative min-h-screen w-full overflow-hidden bg-[#1E2A38]"
      aria-labelledby="hero-v7-title"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#FF7F11]/10 blur-[100px]"></div>
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D64541]/10 blur-[100px]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        {/* Left Content - Interactive Solar Panel */}
        <div className={cn(
          "flex items-center justify-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          <div className="relative h-full max-h-[500px] w-full">
            {/* Canvas for 3D solar panel */}
            <canvas 
              ref={canvasRef}
              className="h-full w-full"
              aria-hidden="true"
            ></canvas>
            
            {/* Price Point Indicators */}
            <div className="absolute left-1/4 top-1/4 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-[#FF7F11]/30"></div>
              <div className="absolute h-5 w-5 rounded-full bg-[#FF7F11]"></div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
                Ahorro: 70%
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-[#FF7F11]/30 animation-delay-300"></div>
              <div className="absolute h-5 w-5 rounded-full bg-[#FF7F11]"></div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
                ROI: 5 años
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Content - Text and CTA */}
        <div className={cn(
          "flex flex-col justify-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        )}>
          {/* Header badge */}
          <div className="mb-6 inline-block rounded-full bg-[#FF7F11]/10 px-4 py-2 text-sm font-medium text-[#FF7F11]">
            <div className="flex items-center">
              <CircleDollarSign className="mr-2 h-4 w-4" />
              Precio transparente garantizado
            </div>
          </div>
          
          {/* Main headline */}
          <h1
            id="hero-v7-title"
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            <span className="block">¿Cuánto cuesta un</span>
            <span className="block mt-1">
              <span className="relative inline-block">
                sistema solar
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,4 Q40,0 100,4 Q160,8 200,4" stroke="#FF7F11" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </span>
            <span className="block mt-1">para tu hogar?</span>
          </h1>
          
          <p className="mb-8 max-w-lg text-lg text-white/70">
            Descubre en segundos el precio exacto de tu sistema solar personalizado.
            Sin vendedores, sin comisiones ocultas, sin sorpresas.
          </p>
          
          {/* Benefits List */}
          <div className="mb-8 space-y-4">
            {[
              { text: "Precios directos de fábrica sin intermediarios" },
              { text: "Ahorros mensuales garantizados desde el primer día" },
              { text: "Instalación profesional incluida en el precio" },
              { text: "Visualiza tu ahorro a largo plazo con transparencia" }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="benefit-item opacity-0 translate-y-4 transition-all duration-500 flex items-start"
              >
                <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-[#FF7F11]" />
                <span className="text-white/80">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          {/* Price Indicator */}
          <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-2 flex justify-between">
              <span className="text-white/70">Precio aproximado:</span>
              <span className="font-bold text-white">$8,000 - $12,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Ahorro mensual:</span>
              <span className="font-bold text-[#FF7F11]">$150 - $250</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              onClick={handleScroll}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#FF7F11] to-[#D64541] px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,127,17,0.4)]"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Zap className="mr-2 h-5 w-5" />
                Ver precio EXACTO ahora
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#D64541] to-[#FF7F11] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </button>
            
            <button
              onClick={handleScroll}
              className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              Ver opciones de financiamiento
            </button>
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
          <span className="mb-2 text-sm">Más detalles</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroVariant7;