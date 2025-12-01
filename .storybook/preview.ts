import type { Decorator, Preview } from '@storybook/vue3-vite';
import { h } from 'vue';

const ROOT_PADDING = '6rem';

const withRootLayout: Decorator = (story, context) => {
  const StoryComponent = story();
  return {
    render() {
      const backgroundColor = context.globals?.backgrounds?.value ?? '#ffffff';
      return h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
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