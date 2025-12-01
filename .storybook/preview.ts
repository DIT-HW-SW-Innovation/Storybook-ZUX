import type { Decorator, Preview } from '@storybook/vue3-vite';
import { h } from 'vue';

const ROOT_PADDING = '2.5rem';

const withRootLayout: Decorator = (story, context) => {
  const StoryComponent = story();
  return {
    render() {
      // Get background color from globals, default to white for light mode
      // When dark mode is selected, always use black background
      const backgroundName = context.globals?.backgrounds?.name;
      const backgroundValue = context.globals?.backgrounds?.value;
      const isDarkMode = backgroundName === 'dark' || backgroundValue === '#000000';
      const backgroundColor = isDarkMode ? '#000000' : (backgroundValue ?? '#ffffff');
      
      return h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            minHeight: 'auto',
            height: 'auto',
            padding: `${ROOT_PADDING} 0`,
            boxSizing: 'border-box',
            backgroundColor,
          },
        },
        [h(StoryComponent)]
      );
    },
  };
};

const preview: Preview = {
  decorators: [withRootLayout],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
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
      test: 'todo',
    },
  },
};

export default preview;