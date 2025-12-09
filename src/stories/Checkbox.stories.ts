import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Checkbox from '../components/ui/Checkbox.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  render: (args: any) => ({
    components: { Checkbox, StoryWrapper },
    setup() {
      // For Playground story, use reactive state for interactivity
      const isChecked = ref(args.checked ?? false);
      const isInteractive = args.interactive ?? false;
      
      const handleUpdate = (value: boolean) => {
        if (isInteractive) {
          isChecked.value = value;
        }
      };
      
      return {
        args,
        isChecked,
        handleUpdate,
      };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <checkbox
          :checked="args.interactive ? isChecked : args.checked"
          :status="args.status"
          :theme="args.theme"
          @update:checked="handleUpdate"
        />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked (selected)',
    },
    status: {
      control: { type: 'select' },
      options: ['enabled', 'hovered', 'focused', 'pressed', 'disabled'],
      description: 'Interaction state of the checkbox',
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - Interactive story (default)
export const Playground: Story = {
  args: {
    checked: false,
    status: 'enabled',
    theme: 'light',
    interactive: true,
  },
};

// Unselected States
export const UnselectedEnabled: Story = {
  args: {
    checked: false,
    status: 'enabled',
    theme: 'light',
    interactive: false,
  },
};

export const UnselectedHovered: Story = {
  args: {
    checked: false,
    status: 'hovered',
    theme: 'light',
    interactive: false,
  },
};

export const UnselectedFocused: Story = {
  args: {
    checked: false,
    status: 'focused',
    theme: 'light',
    interactive: false,
  },
};

export const UnselectedPressed: Story = {
  args: {
    checked: false,
    status: 'pressed',
    theme: 'light',
    interactive: false,
  },
};

export const UnselectedDisabled: Story = {
  args: {
    checked: false,
    status: 'disabled',
    theme: 'light',
    interactive: false,
  },
};

// Selected States
export const SelectedEnabled: Story = {
  args: {
    checked: true,
    status: 'enabled',
    theme: 'light',
    interactive: false,
  },
};

export const SelectedHovered: Story = {
  args: {
    checked: true,
    status: 'hovered',
    theme: 'light',
    interactive: false,
  },
};

export const SelectedFocused: Story = {
  args: {
    checked: true,
    status: 'focused',
    theme: 'light',
    interactive: false,
  },
};

export const SelectedPressed: Story = {
  args: {
    checked: true,
    status: 'pressed',
    theme: 'light',
    interactive: false,
  },
};

export const SelectedDisabled: Story = {
  args: {
    checked: true,
    status: 'disabled',
    theme: 'light',
    interactive: false,
  },
};

// Dark Theme Examples
export const UnselectedEnabledDark: Story = {
  args: {
    checked: false,
    status: 'enabled',
    theme: 'dark',
    interactive: false,
  },
  parameters: {
    darkMode: true,
  },
};

export const SelectedEnabledDark: Story = {
  args: {
    checked: true,
    status: 'enabled',
    theme: 'dark',
    interactive: false,
  },
  parameters: {
    darkMode: true,
  },
};

