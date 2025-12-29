import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ProgressIndicatorCircular from '../components/ui/ProgressIndicatorCircular.vue';
import StoryWrapper from './StoryWrapper.vue';
import TextButton from '../components/ui/TextButton.vue';

const meta = {
  title: 'Components/ProgressIndicatorCircular',
  component: ProgressIndicatorCircular,
  render: (args: any) => ({
    components: { ProgressIndicatorCircular, StoryWrapper, TextButton },
    setup() {
      const progressIndicatorRef = ref<InstanceType<typeof ProgressIndicatorCircular> | null>(null);
      
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
          <progress-indicator-circular
            ref="progressIndicatorRef"
            :theme="args.theme"
            :size="args.size"
            :stroke-width="args.strokeWidth"
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
    size: {
      control: { type: 'text' },
      description: 'Size of the circular indicator in rem',
    },
    strokeWidth: {
      control: { type: 'text' },
      description: 'Stroke width of the ring in rem',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof ProgressIndicatorCircular>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Light Mode
export const Default: Story = {
  args: {
    theme: 'light',
    size: '1.125rem',
    strokeWidth: '0.125rem',
  },
};

// Dark Mode
export const DarkMode: Story = {
  args: {
    theme: 'dark',
    size: '1.125rem',
    strokeWidth: '0.125rem',
  },
  parameters: {
    darkMode: true,
  },
};


