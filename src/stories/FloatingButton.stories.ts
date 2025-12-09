import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FloatingButton from '../components/ui/FloatingButton.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  render: (args: any) => ({
    components: { FloatingButton, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <floating-button v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    enabled: {
      control: { type: 'boolean' },
      description: 'Is the button enabled',
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
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Enabled (Light Mode)
export const Enabled: Story = {
  args: {
    enabled: true,
    theme: 'light',
  },
};

// Disabled (Light Mode)
export const Disabled: Story = {
  args: {
    enabled: false,
    theme: 'light',
  },
};

// Enabled (Dark Mode)
export const DarkEnabled: Story = {
  args: {
    enabled: true,
    theme: 'dark',
  },
};

// Disabled (Dark Mode)
export const DarkDisabled: Story = {
  args: {
    enabled: false,
    theme: 'dark',
  },
};
