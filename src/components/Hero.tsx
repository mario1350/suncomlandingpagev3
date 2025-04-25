import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import ShaderBackground from './Hero/ShaderBackground';
import AnimatedHeadline from './Hero/AnimatedHeadline';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Use IntersectionObserver to add bounce animation to arrow
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            arrowRef.current?.classList.add('animate-bounce');
          } else {
            arrowRef.current?.classList.remove('animate-bounce');
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (arrowRef.current) {
      observer.observe(arrowRef.current);
    }
    
    return () => {
      if (arrowRef.current) {
        observer.unobserve(arrowRef.current);
      }
    };
  }, []);

  // Setup video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('loadeddata', handleVideoLoaded);
    
    // Try to play the video (may be blocked by browser autoplay policies)
    video.play().catch(error => {
      console.warn('Autoplay was prevented:', error);
      // Keep shader background visible if video fails to play
      setVideoLoaded(false);
    });

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoaded);
    };
  }, []);
  
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if section doesn't exist yet
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
    
    // Analytics tracking would go here
    // analytics.track('start_quote');
  };
  
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1E2A38] text-white"
      aria-labelledby="hero-title"
    >
      {/* ShaderBackground as fallback or enhancement */}
      <ShaderBackground 
        particleCount={50} 
        lodLevel="medium"
        className={videoLoaded ? "opacity-40" : ""}
      />
      
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-5 h-full w-full object-cover opacity-70 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-white-lines-on-a-navy-blue-background-55324-large.mp4" type="video/mp4" />
      </video>
      
      {/* Content Container */}
      <div className="container relative z-10 mx-auto grid min-h-screen w-full items-center px-6 md:grid-cols-2 lg:px-8">
        {/* Text Content - Extracted to AnimatedHeadline component */}
        <div className="flex flex-col justify-center space-y-8 py-12 md:py-0">
          <AnimatedHeadline 
            primaryText={{
              line1: "Cotiza tu propio",
              line2: "sistema solar",
              line3: "y recibe precio INMEDIATO",
              highlight: "INMEDIATO"
            }}
          />
          
          <div className="pt-4">
            <button
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#FF7F11] bg-[#FF7F11]/10 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-[#FF7F11]/20 hover:shadow-[0_0_20px_rgba(255,127,17,0.4)] focus:outline-none focus:ring-2 focus:ring-[#FF7F11]/50 md:px-10 md:py-5 md:text-xl"
              onClick={handleScroll}
              data-testid="hero-cta-button"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF7F11] group-hover:translate-x-0 ease">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Cotiza tu sistema solar</span>
              <span className="relative invisible">Cotiza tu sistema solar</span>
            </button>
          </div>
        </div>
        
        {/* Empty space for the canvas on desktop, filled by the background */}
        <div className="hidden md:block"></div>
      </div>
      
      {/* Scroll Cue - Fixed positioning for perfect centering */}
      <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex justify-center">
        <a
          href="#section2"
          ref={arrowRef}
          className="flex flex-col items-center text-white opacity-80 transition-opacity hover:opacity-100"
          onClick={handleScroll}
          aria-label="Scroll to next section"
        >
          <span className="mb-2 text-sm">Descubre más</span>
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;