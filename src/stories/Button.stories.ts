import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MyButton from '../components/ui/Button.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/Button',
  component: MyButton,
  render: (args: any) => ({
    components: { MyButton, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <my-button v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'primary-small', 'secondary-small-1', 'secondary-small-2', 'secondary-small-3'],
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
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Stories
export const PrimaryEnabledLight: Story = {
  args: {
    variant: 'primary',
    status: 'enabled',
    theme: 'light',
    label: 'Button',
  },
};

export const PrimaryHoveredLight: Story = {
  args: {
    variant: 'primary',
    status: 'hovered',
    theme: 'light',
    label: 'Button',
  },
};

export const PrimaryFocusedLight: Story = {
  args: {
    variant: 'primary',
    status: 'focused',
    theme: 'light',
    label: 'Button',
  },
};

export const PrimaryPressedLight: Story = {
  args: {
    variant: 'primary',
    status: 'pressed',
    theme: 'light',
    label: 'Button',
  },
};

export const PrimaryDisabledLight: Story = {
  args: {
    variant: 'primary',
    status: 'disabled',
    theme: 'light',
    label: 'Button',
  },
};

export const PrimaryEnabledDark: Story = {
  args: {
    variant: 'primary',
    status: 'enabled',
    theme: 'dark',
    label: 'Button',
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
    label: 'Button',
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
    label: 'Button',
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
    label: 'Button',
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
    label: 'Button',
  },
  parameters: {
    darkMode: true,
  },
};

// Secondary Stories (Light Mode - Outlined Button)
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

// Secondary Stories (Dark Mode - Outlined Button)
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

// Primary-small Stories (Light Mode - Solid Blue Button with Small Text)
export const PrimarySmallEnabledLight: Story = {
  args: {
    variant: 'primary-small',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimarySmallHoveredLight: Story = {
  args: {
    variant: 'primary-small',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimarySmallFocusedLight: Story = {
  args: {
    variant: 'primary-small',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimarySmallPressedLight: Story = {
  args: {
    variant: 'primary-small',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const PrimarySmallDisabledLight: Story = {
  args: {
    variant: 'primary-small',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// Primary-small Stories (Dark Mode)
export const PrimarySmallEnabledDark: Story = {
  args: {
    variant: 'primary-small',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimarySmallHoveredDark: Story = {
  args: {
    variant: 'primary-small',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimarySmallFocusedDark: Story = {
  args: {
    variant: 'primary-small',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimarySmallPressedDark: Story = {
  args: {
    variant: 'primary-small',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const PrimarySmallDisabledDark: Story = {
  args: {
    variant: 'primary-small',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// Secondary-small-1 Stories (Light Mode)
export const SecondarySmall1EnabledLight: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall1HoveredLight: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall1FocusedLight: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall1PressedLight: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall1DisabledLight: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// Secondary-small-1 Stories (Dark Mode)
export const SecondarySmall1EnabledDark: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall1HoveredDark: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall1FocusedDark: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall1PressedDark: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall1DisabledDark: Story = {
  args: {
    variant: 'secondary-small-1',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// Secondary-small-2 Stories (Light Mode)
export const SecondarySmall2EnabledLight: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall2HoveredLight: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall2FocusedLight: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall2PressedLight: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall2DisabledLight: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// Secondary-small-2 Stories (Dark Mode)
export const SecondarySmall2EnabledDark: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall2HoveredDark: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall2FocusedDark: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall2PressedDark: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall2DisabledDark: Story = {
  args: {
    variant: 'secondary-small-2',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

// Secondary-small-3 Stories (Light Mode)
export const SecondarySmall3EnabledLight: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'enabled',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall3HoveredLight: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'hovered',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall3FocusedLight: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'focused',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall3PressedLight: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'pressed',
    theme: 'light',
    label: 'Label',
  },
};

export const SecondarySmall3DisabledLight: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'disabled',
    theme: 'light',
    label: 'Label',
  },
};

// Secondary-small-3 Stories (Dark Mode)
export const SecondarySmall3EnabledDark: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'enabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall3HoveredDark: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'hovered',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall3FocusedDark: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'focused',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall3PressedDark: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'pressed',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};

export const SecondarySmall3DisabledDark: Story = {
  args: {
    variant: 'secondary-small-3',
    status: 'disabled',
    theme: 'dark',
    label: 'Label',
  },
  parameters: {
    darkMode: true,
  },
};


