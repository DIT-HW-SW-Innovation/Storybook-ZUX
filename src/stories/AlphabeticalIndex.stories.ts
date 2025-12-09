import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AlphabeticalIndex from '../components/ui/AlphabeticalIndex.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Components/AlphabeticalIndex',
  component: AlphabeticalIndex,
  render: (args: any) => ({
    components: { AlphabeticalIndex, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.theme === 'dark'">
        <alphabetical-index v-bind="args" />
      </StoryWrapper>
    `,
  }),
  tags: ['autodocs'],
  argTypes: {
    selectedItem: {
      control: { type: 'select' },
      options: [null, 'star', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      description: 'Currently selected item',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme (light or dark)',
    },
    showStar: {
      control: { type: 'boolean' },
      description: 'Show star icon at the top',
    },
    showHash: {
      control: { type: 'boolean' },
      description: 'Show hash symbol at the bottom',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      controls: { exclude: [] },
    },
  },
} satisfies Meta<typeof AlphabeticalIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    selectedItem: null,
    theme: 'light',
    showStar: true,
    showHash: true,
  },
};

// With selected item (A)
export const SelectedA: Story = {
  args: {
    selectedItem: 'A',
    theme: 'light',
    showStar: true,
    showHash: true,
  },
};

// With selected star
export const SelectedStar: Story = {
  args: {
    selectedItem: 'star',
    theme: 'light',
    showStar: true,
    showHash: true,
  },
};

// With selected hash
export const SelectedHash: Story = {
  args: {
    selectedItem: '#',
    theme: 'light',
    showStar: true,
    showHash: true,
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    selectedItem: 'M',
    theme: 'dark',
    showStar: true,
    showHash: true,
  },
};

// Without star
export const WithoutStar: Story = {
  args: {
    selectedItem: 'Z',
    theme: 'light',
    showStar: false,
    showHash: true,
  },
};

// Without hash
export const WithoutHash: Story = {
  args: {
    selectedItem: 'A',
    theme: 'light',
    showStar: true,
    showHash: false,
  },
};

// Minimal (no star, no hash)
export const Minimal: Story = {
  args: {
    selectedItem: 'K',
    theme: 'light',
    showStar: false,
    showHash: false,
  },
};

