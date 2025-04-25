import React from 'react';
import { Calculator, Sun, DollarSign, Home, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  delay = 0
}) => {
  return (
    <div 
      className={`flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-8 animate-in fade-in duration-700`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 rounded-full bg-[#FF7F11]/20 p-4">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const handleCompareClick = () => {
    // Scroll to quote section
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Analytics tracking would go here
    // analytics.track('compare');
  };
  
  return (
    <section
      id="section2"
      className="relative min-h-screen w-full overflow-hidden bg-[#1E2A38] py-20 text-white"
      aria-labelledby="how-it-works-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A38] to-[#1E2A38]/90" />
      
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 
            id="how-it-works-title"
            className="mb-6 text-4xl font-bold md:text-5xl"
          >
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-white/80">
            Obtén tu precio de sistema solar en minutos, sin complicaciones ni vendedores agresivos
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Calculator className="h-8 w-8 text-[#FF7F11]" />}
            title="1. Cotización Instantánea"
            description="Responde algunas preguntas simples sobre tu consumo energético y recibe un precio inmediato."
            delay={100}
          />
          
          <FeatureCard
            icon={<Sun className="h-8 w-8 text-[#FF7F11]" />}
            title="2. Diseño Personalizado"
            description="Nuestro algoritmo crea un diseño solar optimizado para tu techo y necesidades energéticas."
            delay={200}
          />
          
          <FeatureCard
            icon={<DollarSign className="h-8 w-8 text-[#FF7F11]" />}
            title="3. Ahorro Transparente"
            description="Visualiza tus ahorros proyectados sin ocultar costos ni inflaciones artificiales."
            delay={300}
          />
          
          <FeatureCard
            icon={<Home className="h-8 w-8 text-[#FF7F11]" />}
            title="4. Instalación Profesional"
            description="Instaladores certificados completan tu proyecto con los mejores equipos del mercado."
            delay={400}
          />
        </div>
        
        <div className="mt-16 flex justify-center">
          <button
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#D64541] bg-[#D64541]/10 px-10 py-5 text-xl font-medium text-white transition-all duration-300 hover:bg-[#D64541]/20 hover:shadow-[0_0_20px_rgba(214,69,65,0.4)] focus:outline-none focus:ring-2 focus:ring-[#D64541]/50"
            onClick={handleCompareClick}
            data-testid="compare-cta-button"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#D64541] group-hover:translate-x-0 ease">
              <ExternalLink className="mr-2 h-5 w-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              ¡Cotiza y COMPÁRANOS!
            </span>
            <span className="relative invisible">¡Cotiza y COMPÁRANOS!</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;