import type { Meta, StoryObj } from '@storybook/react';
import ShaderBackground from './ShaderBackground';

const meta = {
  title: 'Components/Hero/ShaderBackground',
  component: ShaderBackground,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    particleCount: { 
      control: { type: 'range', min: 10, max: 200, step: 5 },
      description: 'Number of particles to generate',
    },
    lodLevel: { 
      control: 'select', 
      options: ['low', 'medium', 'high'],
      description: 'Level of detail - affects performance',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShaderBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    particleCount: 50,
    lodLevel: 'medium',
  },
};

export const HighDetail: Story = {
  args: {
    particleCount: 100,
    lodLevel: 'high',
  },
};

export const LowDetail: Story = {
  args: {
    particleCount: 20,
    lodLevel: 'low',
  },
};