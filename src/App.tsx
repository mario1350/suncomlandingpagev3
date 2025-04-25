import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HeroAlternative from './components/HeroAlternative';
import HeroModern from './components/HeroModern';
import HeroVariant4 from './components/HeroVariant4';
import HeroVariant5 from './components/HeroVariant5';
import HeroVariant6 from './components/HeroVariant6';
import HeroVariant7 from './components/HeroVariant7';
import HeroVariant8 from './components/HeroVariant8';
import HowItWorks from './components/HowItWorks';
import './App.css';

// Hero variant types
type HeroVariant = 'original' | 'alternative' | 'modern' | 'variant4' | 'variant5' | 'variant6' | 'variant7' | 'variant8';

function App() {
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('original');
  
  // For demo purposes, this shows how to toggle between hero variants
  // In a production app, you'd likely choose one variant and stick with it
  
  const handleToggleHero = () => {
    setHeroVariant((current) => {
      switch (current) {
        case 'original': return 'alternative';
        case 'alternative': return 'modern';
        case 'modern': return 'variant4';
        case 'variant4': return 'variant5';
        case 'variant5': return 'variant6';
        case 'variant6': return 'variant7';
        case 'variant7': return 'variant8';
        case 'variant8': return 'original';
        default: return 'original';
      }
    });
  };
  
  // Render the appropriate hero component based on the selected variant
  const renderHero = () => {
    switch (heroVariant) {
      case 'alternative':
        return <HeroAlternative />;
      case 'modern':
        return <HeroModern />;
      case 'variant4':
        return <HeroVariant4 />;
      case 'variant5':
        return <HeroVariant5 />;
      case 'variant6':
        return <HeroVariant6 />;
      case 'variant7':
        return <HeroVariant7 />;
      case 'variant8':
        return <HeroVariant8 />;
      case 'original':
      default:
        return <Hero />;
    }
  };
  
  return (
    <>
      {/* Hero Switcher - For demo purposes only */}
      <button 
        onClick={handleToggleHero}
        className="fixed top-4 right-4 z-50 rounded-md bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md hover:bg-white/20"
      >
        Switch Hero ({heroVariant})
      </button>
      
      {/* Render the selected hero variant */}
      {renderHero()}
      
      {/* Rest of the application */}
      <HowItWorks />
    </>
  );
}

export default App;