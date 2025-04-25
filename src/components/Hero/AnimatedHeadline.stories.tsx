import type { Meta, StoryObj } from '@storybook/react';
import AnimatedHeadline from './AnimatedHeadline';

const meta = {
  title: 'Components/Hero/AnimatedHeadline',
  component: AnimatedHeadline,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    primaryText: { control: 'object' },
    secondaryText: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof AnimatedHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryText: {
      line1: 'Cotiza tu propio',
      line2: 'sistema solar',
      line3: 'y recibe precio INMEDIATO',
      highlight: 'INMEDIATO',
    },
    secondaryText: 'Precios Sin Competencia',
  },
};

export const Alternative: Story = {
  args: {
    primaryText: {
      line1: 'Energía solar',
      line2: 'para tu hogar',
      line3: 'sin INTERMEDIARIOS',
      highlight: 'INTERMEDIARIOS',
    },
    secondaryText: 'Ahorra Hasta 30%',
  },
};