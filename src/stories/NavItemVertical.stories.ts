import type { Meta, StoryObj } from '@storybook/vue3-vite';
import NavItemVertical from '../components/ui/NavItemVertical.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/NavItemVertical',
  component: NavItemVertical,
  render: (args: any) => ({
    components: { NavItemVertical, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <nav-item-vertical v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['unselected', 'unselected-hovered', 'unselected-pressed', 'selected', 'selected-hovered', 'selected-pressed'],
      description: 'Vertical navigation item variant',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    label: {
      control: { type: 'text' },
      description: 'Item label text',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof NavItemVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

// Unselected variant
export const Unselected: Story = {
  args: {
    variant: 'unselected',
    theme: 'light',
    label: 'Label',
  },
};

export const UnselectedHovered: Story = {
  args: {
    variant: 'unselected-hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const UnselectedPressed: Story = {
  args: {
    variant: 'unselected-pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const UnselectedDark: Story = {
  args: {
    variant: 'unselected',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// Selected variant
export const Selected: Story = {
  args: {
    variant: 'selected',
    theme: 'light',
    label: 'Label',
  },
};

export const SelectedHovered: Story = {
  args: {
    variant: 'selected-hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SelectedPressed: Story = {
  args: {
    variant: 'selected-pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SelectedDark: Story = {
  args: {
    variant: 'selected',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

