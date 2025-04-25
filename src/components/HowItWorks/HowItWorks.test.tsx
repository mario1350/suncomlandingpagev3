import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowItWorks from '../HowItWorks';

describe('HowItWorks Component', () => {
  it('renders correctly', () => {
    render(<HowItWorks />);
    
    // Check that the section title is present
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    
    // Check that all 4 feature cards are rendered
    expect(screen.getByText('1. Cotización Instantánea')).toBeInTheDocument();
    expect(screen.getByText('2. Diseño Personalizado')).toBeInTheDocument();
    expect(screen.getByText('3. Ahorro Transparente')).toBeInTheDocument();
    expect(screen.getByText('4. Instalación Profesional')).toBeInTheDocument();
    
    // Check that the CTA button is present
    expect(screen.getByTestId('compare-cta-button')).toBeInTheDocument();
    expect(screen.getByText('¡Cotiza y COMPÁRANOS!')).toBeInTheDocument();
  });
  
  it('has proper accessibility attributes', () => {
    render(<HowItWorks />);
    
    // Check aria attributes
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'how-it-works-title');
  });
});