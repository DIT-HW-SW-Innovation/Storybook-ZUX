import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MyButton from './Button.vue';

const meta = {
  title: 'Components/Button',
  component: MyButton,
  render: (args: any) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<my-button v-bind="args" />',
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7],
      description: 'Button variant (1-7)',
    },
    status: {
      control: { type: 'select' },
      options: ['enabled', 'hovered', 'focused', 'pressed', 'disabled'],
      description: 'Button status',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    label: {
      control: { type: 'text' },
      description: 'Button label text',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant 1 Stories
export const Variant1EnabledLight: Story = {
  args: {
    variant: 1,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant1HoveredLight: Story = {
  args: {
    variant: 1,
    status: 'hovered',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant1FocusedLight: Story = {
  args: {
    variant: 1,
    status: 'focused',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant1pressedLight: Story = {
  args: {
    variant: 1,
    status: 'pressed',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant1DisabledLight: Story = {
  args: {
    variant: 1,
    status: 'disabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant1EnabledDark: Story = {
  args: {
    variant: 1,
    status: 'enabled',
    theme: 'dark',
    label: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Variant1HoveredDark: Story = {
  args: {
    variant: 1,
    status: 'hovered',
    theme: 'dark',
    label: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Variant1FocusedDark: Story = {
  args: {
    variant: 1,
    status: 'focused',
    theme: 'dark',
    label: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Variant1pressedDark: Story = {
  args: {
    variant: 1,
    status: 'pressed',
    theme: 'dark',
    label: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Variant1DisabledDark: Story = {
  args: {
    variant: 1,
    status: 'disabled',
    theme: 'dark',
    label: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Placeholder stories for other variants (2-7)
// These will be populated as you provide the Figma designs

export const Variant2EnabledLight: Story = {
  args: {
    variant: 2,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant3EnabledLight: Story = {
  args: {
    variant: 3,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant4EnabledLight: Story = {
  args: {
    variant: 4,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant5EnabledLight: Story = {
  args: {
    variant: 5,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant6EnabledLight: Story = {
  args: {
    variant: 6,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const Variant7EnabledLight: Story = {
  args: {
    variant: 7,
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

