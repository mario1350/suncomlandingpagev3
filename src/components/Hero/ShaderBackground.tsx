import React, { useEffect, useRef, useState } from 'react';

interface ShaderBackgroundProps {
  particleCount?: number;
  lodLevel?: 'low' | 'medium' | 'high';
  className?: string;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ 
  particleCount = 50, 
  lodLevel = 'medium',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useCanvas, setUseCanvas] = useState(true);
  const [fps, setFps] = useState(60);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(0);
  
  // Adjust particle count based on lodLevel and device performance
  const getAdjustedParticleCount = () => {
    const isMobile = window.innerWidth < 768;
    const baseCount = isMobile ? particleCount * 0.5 : particleCount;
    
    switch (lodLevel) {
      case 'low':
        return Math.floor(baseCount * 0.5);
      case 'high':
        return Math.floor(baseCount * 1.5);
      case 'medium':
      default:
        return Math.floor(baseCount);
    }
  };
  
  // Check if WebGL is supported
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      
      // If WebGL is not supported or on a mobile device, fallback to video
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      setUseCanvas(hasWebGL && !isMobile);
    } catch (e) {
      console.warn('WebGL detection failed, falling back to video background', e);
      setUseCanvas(false);
    }
  }, []);
  
  // Canvas animation
  useEffect(() => {
    if (!useCanvas || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse position tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create fluids effect simulation
    const adjustedParticleCount = getAdjustedParticleCount();
    const particles: {x: number; y: number; vx: number; vy: number; radius: number; color: string}[] = [];
    
    for (let i = 0; i < adjustedParticleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 50 + 10,
        color: [
          `rgba(255, 127, 17, ${Math.random() * 0.3})`, // Chinita with opacity
          `rgba(30, 42, 56, ${Math.random() * 0.3})`,   // Navy with opacity
          `rgba(214, 69, 65, ${Math.random() * 0.3})`,  // Rojito with opacity
        ][Math.floor(Math.random() * 3)]
      });
    }
    
    // FPS tracking
    const updateFps = (timestamp: number) => {
      if (!previousTimeRef.current) {
        previousTimeRef.current = timestamp;
        lastFpsUpdateRef.current = timestamp;
        return;
      }
      
      frameCountRef.current++;
      const elapsed = timestamp - lastFpsUpdateRef.current;
      
      if (elapsed >= 1000) { // Update FPS once per second
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = timestamp;
        
        // If FPS is too low, reduce particle count
        if (fps < 30 && particles.length > 10) {
          particles.length = Math.floor(particles.length * 0.8);
        }
      }
      
      previousTimeRef.current = timestamp;
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      updateFps(timestamp);
      
      ctx.clearRect(0, 0, width, height);
      
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1E2A38'); // Navy
      gradient.addColorStop(1, '#1E2A38AA'); // Navy with transparency
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p) => {
        // Mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(100 / (distance || 1), 0.5);
        
        p.vx += dx * force * 0.01;
        p.vy += dy * force * 0.01;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary checking
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;
        
        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [useCanvas, lodLevel, particleCount, fps]);
  
  // If canvas not supported, preload and show video background
  useEffect(() => {
    if (useCanvas || !videoRef.current) return;
    
    // Set video properties
    const video = videoRef.current;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    // Add fallback video source - would need an actual video file in production
    video.src = 'https://assets.mixkit.co/videos/preview/mixkit-white-lines-on-a-navy-blue-background-55324-large.mp4';
    
    // Start playing when available
    const playVideo = () => {
      video.play().catch(err => {
        console.warn('Auto-play prevented:', err);
      });
    };
    
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo);
    }
    
    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, [useCanvas]);
  
  return (
    <>
      {useCanvas ? (
        <canvas 
          id="hero-canvas"
          ref={canvasRef} 
          className={`absolute inset-0 z-0 h-full w-full object-cover pointer-events-none ${className}`}
          aria-hidden="true"
        />
      ) : (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-0 h-full w-full object-cover pointer-events-none ${className}`}
          aria-hidden="true"
        />
      )}
      
      {/* FPS counter - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 text-xs text-white">
          {fps} FPS | {useCanvas ? 'Canvas' : 'Video'}
        </div>
      )}
    </>
  );
};

export default ShaderBackground;