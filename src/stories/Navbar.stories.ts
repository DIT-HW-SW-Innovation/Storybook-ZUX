import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Navbar from '../components/ui/Navbar.vue';
import NavItemHorizontal from '../components/ui/NavItemHorizontal.vue';
import NavItemVertical from '../components/ui/NavItemVertical.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Example/Navbar',
  component: Navbar,
  render: (args: any) => ({
    components: { Navbar, NavItemHorizontal, NavItemVertical, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <navbar v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'horizontal-small', 'vertical'],
      description: 'Navbar layout variant',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Horizontal variant - Light theme
export const HorizontalLight: Story = {
  args: {
    variant: 'horizontal',
    theme: 'light',
  },
};

// Horizontal variant - Dark theme
export const HorizontalDark: Story = {
  args: {
    variant: 'horizontal',
    theme: 'dark',
  },
  parameters: {
    darkMode: true,
  },
};

// Horizontal-small variant - Light theme
export const HorizontalSmallLight: Story = {
  args: {
    variant: 'horizontal-small',
    theme: 'light',
  },
};

// Horizontal-small variant - Dark theme
export const HorizontalSmallDark: Story = {
  args: {
    variant: 'horizontal-small',
    theme: 'dark',
  },
  parameters: {
    darkMode: true,
  },
};

// Vertical variant - Light theme
export const VerticalLight: Story = {
  args: {
    variant: 'vertical',
    theme: 'light',
  },
};

// Vertical variant - Dark theme
export const VerticalDark: Story = {
  args: {
    variant: 'vertical',
    theme: 'dark',
  },
  parameters: {
    darkMode: true,
  },
};

