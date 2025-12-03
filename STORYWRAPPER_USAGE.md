# How to Use StoryWrapper in Storybook Stories

## Overview
`StoryWrapper` is a Vue component that provides a styled container for Storybook stories. It adds consistent padding and background colors (light/dark mode) to ensure components are displayed with proper visual context.

## When to Use StoryWrapper
Use `StoryWrapper` when:
- Your component needs a background color context (especially for dark mode variants)
- You want consistent padding around your component in Storybook
- You're creating stories that test both light and dark mode appearances

## Import Statement
At the top of your `.stories.ts` file, import `StoryWrapper`:

```typescript
import StoryWrapper from './StoryWrapper.vue';
```

## Usage in Stories

### Basic Pattern
When using `StoryWrapper`, you need to use a custom `render` function instead of relying on Storybook's default rendering:

```typescript
export const MyStory: Story = {
  args: {
    // your component args
    darkMode: false,
  },
  render: (args) => ({
    components: { YourComponent, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.darkMode">
        <YourComponent 
          :prop1="args.prop1"
          :dark-mode="args.darkMode"
        />
      </StoryWrapper>
    `,
  }),
};
```

### Key Points

1. **Register Components**: In the `render` function, include both your component and `StoryWrapper` in the `components` object:
   ```typescript
   components: { YourComponent, StoryWrapper }
   ```

2. **Pass darkMode Prop**: Bind the `dark-mode` prop to your story's `args.darkMode`:
   ```vue
   <StoryWrapper :dark-mode="args.darkMode">
   ```

3. **Wrap Your Component**: Place your component inside the `StoryWrapper` tags:
   ```vue
   <StoryWrapper :dark-mode="args.darkMode">
     <YourComponent ... />
   </StoryWrapper>
   ```

4. **Access Args in Template**: Use `args.propertyName` to access story arguments in the template.

## Props

- `darkMode` (boolean, optional, default: `false`): Controls the background color
  - `false`: Light background (`#f5f6fb`)
  - `true`: Dark background (`#0f1116`)

## Complete Example

```typescript
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import YourComponent from './YourComponent.vue';
import StoryWrapper from './StoryWrapper.vue';

const meta = {
  title: 'Example/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  argTypes: {
    darkMode: { control: 'boolean' },
    // other argTypes
  },
  args: {
    darkMode: false,
    // other default args
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    darkMode: false,
  },
  render: (args) => ({
    components: { YourComponent, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.darkMode">
        <YourComponent 
          :dark-mode="args.darkMode"
        />
      </StoryWrapper>
    `,
  }),
};

export const DarkMode: Story = {
  args: {
    darkMode: true,
  },
  render: (args) => ({
    components: { YourComponent, StoryWrapper },
    setup() {
      return { args };
    },
    template: `
      <StoryWrapper :dark-mode="args.darkMode">
        <YourComponent 
          :dark-mode="args.darkMode"
        />
      </StoryWrapper>
    `,
  }),
};
```

## Notes
- The wrapper adds 40px padding around your component
- The background color automatically switches based on the `darkMode` prop
- You can use this pattern for any component that needs visual context in Storybook
