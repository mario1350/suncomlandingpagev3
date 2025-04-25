import React, { useEffect, useState, useRef } from 'react';

interface AnimatedHeadlineProps {
  primaryText: {
    line1: string;
    line2: string;
    line3: string;
    highlight?: string;
  };
  secondaryText?: string;
  className?: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ 
  primaryText,
  secondaryText = 'Precios Sin Competencia',
  className = ''
}) => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [typedText, setTypedText] = useState('');
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  
  // Line 3 has a highlighted word
  const line3Parts = primaryText.line3.split(primaryText.highlight || 'INMEDIATO');
  
  useEffect(() => {
    // Trigger secondary text after 2 seconds
    const timer = setTimeout(() => {
      setShowSecondary(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Typing effect for secondary message
    if (!showSecondary) return;
    
    let currentCharIndex = 0;
    typingRef.current = setInterval(() => {
      if (currentCharIndex <= secondaryText.length) {
        setTypedText(secondaryText.substring(0, currentCharIndex));
        currentCharIndex++;
      } else {
        if (typingRef.current) {
          clearInterval(typingRef.current);
          typingRef.current = null;
        }
      }
    }, 100);
    
    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current);
        typingRef.current = null;
      }
    };
  }, [showSecondary, secondaryText]);
  
  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      <h1 
        id="hero-title"
        className="animate-in slide-in-from-left duration-700 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      >
        <span className="block">{primaryText.line1}</span>
        <span className="block bg-gradient-to-r from-[#FF7F11] to-[#D64541] bg-clip-text text-transparent animate-in fade-in duration-1000 delay-300">
          {primaryText.line2}
        </span>
        <span className="block">
          {line3Parts[0]}
          <span className="relative inline-block animate-in fade-in zoom-in duration-1000 delay-500 underline decoration-[#FF7F11] decoration-4 underline-offset-4">
            {primaryText.highlight || 'INMEDIATO'}
          </span>
          {line3Parts[1] || ''}
        </span>
      </h1>
      
      {showSecondary && (
        <h2 className="overflow-hidden text-2xl md:text-3xl font-semibold text-[#FF7F11]">
          {typedText}
          <span className="animate-pulse ml-1 inline-block h-6 w-1 bg-[#FF7F11]"></span>
        </h2>
      )}
      
      <p className="animate-pulse text-lg font-medium text-opacity-90 md:text-xl uppercase tracking-wider">
        Sin vendedores. Sin comisiones. Sin Leasing/PPA
      </p>
    </div>
  );
};

export default AnimatedHeadline;