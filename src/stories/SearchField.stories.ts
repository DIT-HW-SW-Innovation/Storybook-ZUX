import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import SearchField from '../components/ui/SearchField.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  render: (args: any) => ({
    components: { SearchField, StoryWrapper },
    setup() {
      const stage = ref<'enabled' | 'typing'>(args.stage || 'enabled');
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
      
      const handleClear = () => {
        modelValue.value = '';
        stage.value = 'enabled';
      };
      
      const handleInput = (value: string) => {
        modelValue.value = value;
      };
      
      return { 
        args,
        stage,
        modelValue,
        handleFocus,
        handleBlur,
        handleClear,
        handleInput,
      };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <search-field 
          :stage="stage"
          :theme="args.theme"
          :placeholder="args.placeholder"
          :label="args.label"
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
      options: ['enabled', 'typing'],
      description: 'Search field stage',
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
    label: {
      control: { type: 'text' },
      description: 'External label text (shown in typing stage)',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'Input value',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Story - Light Mode
export const InteractiveLight: Story = {
  args: {
    stage: 'enabled',
    theme: 'light',
    placeholder: 'Search',
    label: 'Label',
    modelValue: '',
  },
};

// Interactive Story - Dark Mode
export const InteractiveDark: Story = {
  args: {
    stage: 'enabled',
    theme: 'dark',
    placeholder: 'Search',
    label: 'Label',
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
    placeholder: 'Search',
    label: 'Label',
    modelValue: '',
  },
};

export const TypingLight: Story = {
  args: {
    stage: 'typing',
    theme: 'light',
    placeholder: 'Search',
    label: 'Label',
    modelValue: 'Search',
  },
};

// Static Examples - Dark Mode
export const EnabledDark: Story = {
  args: {
    stage: 'enabled',
    theme: 'dark',
    placeholder: 'Search',
    label: 'Label',
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
    placeholder: 'Search',
    label: 'Label',
    modelValue: 'Search',
  },
  parameters: {
    darkMode: true,
  },
};

