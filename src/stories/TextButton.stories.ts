import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextButton from '../components/ui/TextButton.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/TextButton',
  component: TextButton,
  render: (args: any) => ({
    components: { TextButton, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <text-button v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'secondary-small'],
      description: 'Button variant',
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
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// PRIMARY VARIANT - Light Mode
export const PrimaryEnabledLight: Story = {
  args: {
    variant: 'primary',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimaryHoveredLight: Story = {
  args: {
    variant: 'primary',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimaryFocusedLight: Story = {
  args: {
    variant: 'primary',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimaryPressedLight: Story = {
  args: {
    variant: 'primary',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimaryDisabledLight: Story = {
  args: {
    variant: 'primary',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// PRIMARY VARIANT - Dark Mode
export const PrimaryEnabledDark: Story = {
  args: {
    variant: 'primary',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimaryHoveredDark: Story = {
  args: {
    variant: 'primary',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimaryFocusedDark: Story = {
  args: {
    variant: 'primary',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimaryPressedDark: Story = {
  args: {
    variant: 'primary',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimaryDisabledDark: Story = {
  args: {
    variant: 'primary',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// SECONDARY VARIANT - Light Mode
export const SecondaryEnabledLight: Story = {
  args: {
    variant: 'secondary',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondaryHoveredLight: Story = {
  args: {
    variant: 'secondary',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondaryFocusedLight: Story = {
  args: {
    variant: 'secondary',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondaryPressedLight: Story = {
  args: {
    variant: 'secondary',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondaryDisabledLight: Story = {
  args: {
    variant: 'secondary',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// SECONDARY VARIANT - Dark Mode
export const SecondaryEnabledDark: Story = {
  args: {
    variant: 'secondary',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondaryHoveredDark: Story = {
  args: {
    variant: 'secondary',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondaryFocusedDark: Story = {
  args: {
    variant: 'secondary',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondaryPressedDark: Story = {
  args: {
    variant: 'secondary',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondaryDisabledDark: Story = {
  args: {
    variant: 'secondary',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// SECONDARY-SMALL VARIANT - Light Mode
export const SecondarySmallEnabledLight: Story = {
  args: {
    variant: 'secondary-small',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmallHoveredLight: Story = {
  args: {
    variant: 'secondary-small',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmallFocusedLight: Story = {
  args: {
    variant: 'secondary-small',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmallPressedLight: Story = {
  args: {
    variant: 'secondary-small',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmallDisabledLight: Story = {
  args: {
    variant: 'secondary-small',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// SECONDARY-SMALL VARIANT - Dark Mode
export const SecondarySmallEnabledDark: Story = {
  args: {
    variant: 'secondary-small',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmallHoveredDark: Story = {
  args: {
    variant: 'secondary-small',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmallFocusedDark: Story = {
  args: {
    variant: 'secondary-small',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmallPressedDark: Story = {
  args: {
    variant: 'secondary-small',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmallDisabledDark: Story = {
  args: {
    variant: 'secondary-small',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};
