import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/fonts/fonts.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    docs: {
      // Note: Storybook Vue doesn't have a built-in way to hide Events and Slots sections
      // These sections are automatically generated from component's defineEmits and slots
    },
  },
};

export default preview;