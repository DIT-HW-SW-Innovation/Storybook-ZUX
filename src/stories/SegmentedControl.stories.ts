import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch, computed } from 'vue';
import SegmentedControl from '../components/ui/SegmentedControl.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  render: (args: any) => ({
    components: { SegmentedControl, StoryWrapper },
    setup() {
      const activeIndex = ref(args.activeIndex || 0);
      const defaultLabels = ['Label A', 'Label B', 'Label C', 'Label D', 'Label E', 'Label F', 'Label G'];
      
      // Watch tabCount and update tabs array accordingly
      watch(
        () => args.tabCount,
        (newCount) => {
          if (newCount !== undefined) {
            const clampedCount = Math.max(2, Math.min(7, newCount));
            const currentTabs = args.tabs || [];
            
            if (currentTabs.length !== clampedCount) {
              if (currentTabs.length < clampedCount) {
                // Add new tabs with default labels, preserving existing ones
                const newTabs = [...currentTabs];
                for (let i = currentTabs.length; i < clampedCount; i++) {
                  newTabs.push({
                    label: defaultLabels[i] || `Label ${String.fromCharCode(65 + i)}`,
                    disabled: false,
                  });
                }
                args.tabs = newTabs;
              } else {
                // Remove excess tabs (keep first N)
                args.tabs = currentTabs.slice(0, clampedCount);
              }
            }
          }
        },
        { immediate: true }
      );
      
      // Computed tabs that always reflects args.tabs
      const tabs = computed(() => args.tabs || []);
      
      const handleUpdate = (index: number) => {
        activeIndex.value = index;
      };
      
      return {
        args,
        tabs,
        activeIndex,
        handleUpdate,
      };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <segmented-control
          :tabs="tabs"
          :active-index="args.interactive ? activeIndex : args.activeIndex"
          :variant="args.variant"
          :theme="args.theme"
          @update:active-index="handleUpdate"
          @tab-click="handleUpdate"
        />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    tabCount: {
      control: { type: 'number', min: 2, max: 7, step: 1 },
      description: 'Number of tabs to display (2-7). Adjusting this will add/remove tabs while preserving existing tab properties.',
    },
    tabs: {
      control: { type: 'object' },
      description: 'Array of tab objects with label and disabled properties. Example: [{ label: "Tab 1", disabled: false }, { label: "Tab 2", disabled: true }]',
    },
    activeIndex: {
      control: false, // Hidden from controls - use interactive mode or click tabs to change
      description: 'Index of the currently active tab (hidden from controls panel)',
    },
    variant: {
      control: { type: 'select' },
      options: ['left-aligned', 'center-aligned'],
      description: 'Layout variant',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable interactive tab switching',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create tabs
const createTabs = (count: number, labels: string[] = [], disabledIndices: number[] = []) => {
  const defaultLabels = ['Label A', 'Label B', 'Label C', 'Label D', 'Label E', 'Label F', 'Label G'];
  return Array.from({ length: count }, (_, i) => ({
    label: labels[i] || defaultLabels[i],
    disabled: disabledIndices.includes(i),
  }));
};

// Left-aligned variant - Light Mode
export const LeftAlignedLight: Story = {
  args: {
    tabCount: 7,
    tabs: createTabs(7),
    activeIndex: 0,
    variant: 'left-aligned',
    theme: 'light',
    interactive: true,
  },
};

// Left-aligned variant - Dark Mode
export const LeftAlignedDark: Story = {
  args: {
    tabCount: 7,
    tabs: createTabs(7),
    activeIndex: 0,
    variant: 'left-aligned',
    theme: 'dark',
    interactive: true,
  },
  parameters: {
    darkMode: true,
  },
};


