

# **📘 Design System Rules (For Developers & AI Tools like Cursor)**

This document defines the rules that ALL generated or manually written code must follow in this repository.
It ensures consistency across components, tokens, Storybook, and our Figma → code pipeline.

---
# # 0. As we agreed, your name is Ato. Ato is unique, not the general 'Cursor'.

# # 1. Tokens First — Do Not Hard-Code Visual Values

All visual design values **must** come from the token files:

```
src/tokens/
  colors.ts
  text.ts
  spacing.ts
  radii.ts
  shadows.ts
  gradients.ts
```

### ✔ Always import tokens:

```ts
import { colors } from '@/tokens/colors';
import { textStyles } from '@/tokens/text';
import { gradients } from '@/tokens/gradients';
```

### ❌ Never hardcode:

* hex colors (`#111111`, `#fff`, etc.)
* spacing (`8px`, `12px`)
* font sizes (`14px`, `16px`)
* border radius (`4px`, `8px`)
* shadows
* gradients

### ✔ If a new value is needed:

Create or extend the appropriate file in `src/tokens/` **before** using it in a component.

This is a **strict rule**.

---

# # 2. Component Architecture Rules

Components must:

* Use tokens for ALL styling
* Have typed props (TypeScript)
* Support theme or state variants via props, not via inline conditions in the story
* Never contain raw values unless they map 1:1 to tokens
* Keep internal logic minimal and rely on tokens for visual consistency

### Example imports inside a component:

```ts
import { colors } from '@/tokens/colors';
import { textStyles } from '@/tokens/text';
```

### Components are responsible for styling

Stories should NOT contain any visual styling logic.

---

# # 3. Storybook Rules

All stories live in:

```
src/stories/
```

Stories must:

* Follow CSF 3 format:

  ```ts
  const meta = { ... } satisfies Meta<typeof Component>;
  export default meta;
  type Story = StoryObj<typeof meta>;
  ```
* Use controls via `args` and `argTypes`
* Avoid inline styling in stories
* Demonstrate important states/variants

Recommended structure:

* `Playground` story (with editable controls)
* A few curated examples (light/dark, primary/variant states)
* Dark mode support using either:

  * `args.darkMode`, or
  * StoryWrapper (see section #5)

---

# # 4. Golden Reference Files

Cursor and developers should follow patterns from these files:

```
src/components/ui/Button.vue
src/stories/Button.stories.ts
src/stories/StoryWrapper.vue
```

Use these files as templates for:

* component structure
* token usage
* story layout
* naming conventions
* argument controls

Any new component must match the style and structure of these examples.

---

# # 5. StoryWrapper Usage Rules (Global Storybook Wrapper)

`StoryWrapper` is our official way to wrap components in Storybook to provide:

* consistent padding
* light/dark background context
* layout consistency across all stories

### Always use StoryWrapper when:

* the component needs background contrast (most UI components do)
* testing light/dark variants
* showing interactive or stateful UI
* ensuring consistent spacing and alignment

---

## ## 5.1 Import StoryWrapper

```ts
import StoryWrapper from './StoryWrapper.vue';
```

---

## ## 5.2 Story Pattern (required template)

Your Story must use a `render` function like this:

```ts
export const Example: Story = {
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
```

---

## ## 5.3 Rules for StoryWrapper

### ✔ Components must be wrapped:

```vue
<StoryWrapper :dark-mode="args.darkMode">
  <YourComponent ... />
</StoryWrapper>
```

### ✔ Pass `args.darkMode` into both wrapper and component

### ✔ Use `args.propertyName` inside the wrapper template

### ✔ Padding of 40px is handled inside StoryWrapper

### ✔ Background switches automatically:

* Light → `#f5f6fb`
* Dark → `#0f1116`

---

# # 6. Storybook Global Rules (preview.ts)

Global decorators must:

* Apply layout centering to Canvas and Docs
* Respect Storybook's `backgrounds` toolbar
* Avoid DOM-hacking or polling
* Use `context.globals.backgrounds.name` to determine theme

AI should not reintroduce complex DOM operations
→ use ONLY StoryWrapper or the simplified global wrapper.

---

# # 7. Figma MCP Rules

### MCP is used for:

* Reading design tokens (`get_variable_defs`)
* Reading component structure (`get_design_context`)
* Mapping extracted data into token files
* Syncing token values between Figma and `/src/tokens`

### Important:

* Gradients **cannot** be extracted from MCP
  → gradient tokens must be defined manually in `gradients.ts`
* MCP ONLY returns solid colors & variable metadata
* MCP results must ALWAYS be mapped to token files, never directly used in components

---

# # 8. Cursor / AI Output Rules

Cursor must ALWAYS follow these rules:

### ✔ Use tokens, never inline values

### ✔ Follow the structure of our golden example files

### ✔ Use StoryWrapper when appropriate

### ✔ Use CSF 3 for stories

### ✔ Use TypeScript with strict types

### ✔ Follow naming conventions used across components

### ✔ For new components: replicate `Button.vue` structure

### ✔ For Figma-imported values: update token files first, then components

AI should NEVER:

* invent new raw colors
* output raw CSS values
* bypass StoryWrapper for light/dark context
* create stories without `render()` when StoryWrapper is needed
* add layout styling directly into stories

---

# # 9. Summary of Required Behavior

| Area       | Required Rule                                 |
| ---------- | --------------------------------------------- |
| Tokens     | All visual values come from `/src/tokens/`    |
| Components | Use tokens; no raw values                     |
| Stories    | No visual logic; use StoryWrapper when needed |
| Storybook  | Match global layout behavior                  |
| MCP        | Map to tokens, not components                 |
| AI         | Follow golden examples and rules strictly     |

---

