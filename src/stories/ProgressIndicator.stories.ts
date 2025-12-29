import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ProgressIndicator from '../components/ui/ProgressIndicator.vue';
import StoryWrapper from './StoryWrapper.vue';
import TextButton from '../components/ui/TextButton.vue';

const meta = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  render: (args: any) => ({
    components: { ProgressIndicator, StoryWrapper, TextButton },
    setup() {
      const progressIndicatorRef = ref<InstanceType<typeof ProgressIndicator> | null>(null);
      
      const handleClick = () => {
        if (progressIndicatorRef.value) {
          progressIndicatorRef.value.startAnimation();
        }
      };
      
      return {
        args,
        progressIndicatorRef,
        handleClick,
      };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem; padding: 2rem;">
          <progress-indicator
            ref="progressIndicatorRef"
            :theme="args.theme"
            :width="args.width"
            :height="args.height"
          />
          <text-button
            variant="primary"
            :theme="args.theme"
            @click="handleClick"
          >
            Click me
          </text-button>
        </div>
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the progress bar in rem',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the progress bar in rem',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Light Mode
export const Default: Story = {
  args: {
    theme: 'light',
    width: '6.25rem',
    height: '0.1875rem',
  },
};

// Dark Mode
export const DarkMode: Story = {
  args: {
    theme: 'dark',
    width: '6.25rem',
    height: '0.1875rem',
  },
  parameters: {
    darkMode: true,
  },
};


