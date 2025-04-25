import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// Mock components to simplify testing
vi.mock('./ShaderBackground', () => ({
  default: () => <div data-testid="shader-background" />
}));

vi.mock('./AnimatedHeadline', () => ({
  default: ({ primaryText }) => (
    <div data-testid="animated-headline">
      <div>{primaryText.line1}</div>
      <div>{primaryText.line2}</div>
      <div>{primaryText.line3}</div>
    </div>
  )
}));

describe('Hero Component', () => {
  it('renders correctly', () => {
    render(<Hero />);
    
    // Check that key elements are present
    expect(screen.getByTestId('shader-background')).toBeInTheDocument();
    expect(screen.getByTestId('animated-headline')).toBeInTheDocument();
    expect(screen.getByTestId('hero-cta-button')).toBeInTheDocument();
    expect(screen.getByText('Descubre más')).toBeInTheDocument();
  });
  
  it('has proper accessibility attributes', () => {
    render(<Hero />);
    
    // Check aria attributes
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title');
    
    const scrollCue = screen.getByLabelText('Scroll to next section');
    expect(scrollCue).toBeInTheDocument();
  });
});