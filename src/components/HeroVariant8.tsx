import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Calculator, Sparkles, Clock, DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const PriceFeature: React.FC<PriceFeatureProps> = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return (
    <div 
      className={cn(
        "flex transform items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mr-4 rounded-full bg-[#FF7F11]/20 p-2 text-[#FF7F11]">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

const HeroVariant8: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-play video with fallback
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.warn("Video autoplay failed:", error);
      });
    }
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
      id="hero-variant8"
      className="relative min-h-screen w-full overflow-hidden"
      aria-labelledby="hero-v8-title"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg?auto=compress&cs=tinysrgb&w=1600"
          aria-hidden="true"
        >
          <source src="https://player.vimeo.com/external/314181352.sd.mp4?s=d239d709243f78676e5bee17544ea777cf8eb174&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A38]/90 via-[#1E2A38]/80 to-[#1E2A38]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-6 py-12 lg:py-0">
        <div className="flex flex-1 flex-col-reverse items-center lg:flex-row lg:items-center">
          {/* Left Content - Price Features */}
          <div className={cn(
            "w-full max-w-xl transform transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="space-y-4">
              <PriceFeature
                icon={<Calculator className="h-5 w-5" />}
                title="Cotización Inmediata"
                description="Conoce el precio exacto en segundos, sin esperas ni negociaciones."
                delay={300}
              />
              
              <PriceFeature
                icon={<Sparkles className="h-5 w-5" />}
                title="Transparencia Total"
                description="Sin comisiones ocultas ni inflación artificial en los precios."
                delay={500}
              />
              
              <PriceFeature
                icon={<Clock className="h-5 w-5" />}
                title="Ahorro desde el Primer Día"
                description="Comienza a ahorrar en tu factura eléctrica inmediatamente."
                delay={700}
              />
            </div>
            
            {/* Price Comparison */}
            <div className={cn(
              "mt-8 transform rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-1000 delay-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <h3 className="mb-4 text-lg font-semibold text-white">Comparativa de Precios</h3>
              
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div></div>
                <div className="text-center text-sm font-medium text-white/80">SunCom</div>
                <div className="text-center text-sm font-medium text-white/80">Competencia</div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
                  <div className="text-sm text-white/70">Sistema 5 kW</div>
                  <div className="text-center font-medium text-white">$8,995</div>
                  <div className="text-center font-medium text-white/70">$12,500</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
                  <div className="text-sm text-white/70">Comisiones</div>
                  <div className="text-center font-medium text-green-500">$0</div>
                  <div className="text-center font-medium text-white/70">$1,500+</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-white">TOTAL</div>
                  <div className="text-center font-bold text-[#FF7F11]">$8,995</div>
                  <div className="text-center font-medium text-white/70">$14,000+</div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-white/60">
                * Precios aproximados. Obtén tu cotización personalizada al instante.
              </div>
            </div>
          </div>
          
          {/* Right Content - Main Headline and CTA */}
          <div className={cn(
            "mb-12 flex flex-col items-center text-center lg:mb-0 lg:ml-12 lg:items-start lg:text-left transform transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            {/* Top Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-[#FF7F11]/20 px-4 py-2 text-sm font-medium text-[#FF7F11]">
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF7F11] text-xs text-white">
                $
              </span>
              Precio Justo Garantizado
            </div>
            
            {/* Main Headline */}
            <h1
              id="hero-v8-title"
              className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              <span className="block">Conoce el precio</span>
              <span className="block mt-2 bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent">
                EXACTO y REAL
              </span>
              <span className="block mt-2">de tu sistema solar</span>
            </h1>
            
            <p className="mb-8 max-w-md text-lg text-white/80">
              Olvídate de vendedores y comisiones. Obtén precios directos de fábrica y ahorra hasta un 30% en tu sistema solar.
            </p>
            
            {/* CTA Button with Gradient Border */}
            <button
              onClick={handleScroll}
              className="group relative mb-8 overflow-hidden rounded-lg text-xl font-medium text-white"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FF7F11] to-[#D64541]"></span>
              <span className="relative z-10 block rounded-lg bg-[#1E2A38] m-[2px] px-8 py-4 transition-all duration-300 group-hover:bg-opacity-0">
                Ver precio ahora
              </span>
            </button>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Precio sin sorpresas
              </div>
              
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Sin presión de venta
              </div>
              
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Mismos equipos, menor precio
              </div>
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
          <span className="mb-2 text-sm">Descubre más</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroVariant8;