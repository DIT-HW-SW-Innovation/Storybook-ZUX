import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import TextField from '../components/ui/TextField.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  render: (args: any) => ({
    components: { TextField, StoryWrapper },
    setup() {
      const stage = ref<'enabled' | 'typing' | 'error'>(args.stage || 'enabled');
      const modelValue = ref(args.modelValue || '');
      
      // Watch for args changes from controls
      watch(() => args.stage, (newStage) => {
        if (newStage !== undefined) {
          stage.value = newStage;
        }
      });
      
      watch(() => args.modelValue, (newValue) => {
        if (newValue !== undefined) {
          modelValue.value = newValue;
        }
      });
      
      const handleFocus = () => {
        stage.value = 'typing';
      };
      
      const handleBlur = () => {
        stage.value = 'enabled';
      };
      
      const handleInput = (value: string) => {
        modelValue.value = value;
      };
      
      const handleClear = () => {
        modelValue.value = '';
        stage.value = 'enabled';
      };
      
      return { 
        args,
        stage,
        modelValue,
        handleFocus,
        handleBlur,
        handleInput,
        handleClear,
      };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <text-field 
          :stage="stage"
          :theme="args.theme"
          :placeholder="args.placeholder"
          :error-message="args.errorMessage"
          :model-value="modelValue"
          @update:model-value="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @clear="handleClear"
        />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    stage: {
      control: { type: 'select' },
      options: ['enabled', 'typing', 'error'],
      description: 'Text field stage',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'Input value',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message (shown in error stage)',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Story - Light Mode
export const InteractiveLight: Story = {
  args: {
    stage: 'enabled',
    theme: 'light',
    placeholder: 'Input text',
    modelValue: '',
  },
};

// Interactive Story - Dark Mode
export const InteractiveDark: Story = {
  args: {
    stage: 'enabled',
    theme: 'dark',
    placeholder: 'Input text',
    modelValue: '',
  },
  parameters: {
    darkMode: true,
  },
};

// Static Examples - Light Mode
export const EnabledLight: Story = {
  args: {
    stage: 'enabled',
    theme: 'light',
    placeholder: 'Input text',
    modelValue: '',
  },
};

export const TypingLight: Story = {
  args: {
    stage: 'typing',
    theme: 'light',
    placeholder: 'Input text',
    modelValue: 'Input text',
  },
};

export const ErrorLight: Story = {
  args: {
    stage: 'error',
    theme: 'light',
    placeholder: 'Input text',
    modelValue: 'Input text',
    errorMessage: 'Supporting text',
  },
};

// Static Examples - Dark Mode
export const EnabledDark: Story = {
  args: {
    stage: 'enabled',
    theme: 'dark',
    placeholder: 'Input text',
    modelValue: '',
  },
  parameters: {
    darkMode: true,
  },
};

export const TypingDark: Story = {
  args: {
    stage: 'typing',
    theme: 'dark',
    placeholder: 'Input text',
    modelValue: 'Input text',
  },
  parameters: {
    darkMode: true,
  },
};

export const ErrorDark: Story = {
  args: {
    stage: 'error',
    theme: 'dark',
    placeholder: 'Input text',
    modelValue: 'Input text',
    errorMessage: 'Supporting text',
  },
  parameters: {
    darkMode: true,
  },
};
