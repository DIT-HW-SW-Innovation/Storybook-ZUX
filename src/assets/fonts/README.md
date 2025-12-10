# Font Files Required

This directory should contain the Rookery New font files.

## Required Files

Place the following font files in this directory:

- **RookeryNew-Regular.woff2** (recommended) or RookeryNew-Regular.woff, RookeryNew-Regular.ttf, or RookeryNew-Regular.otf
- **RookeryNew-Bold.woff2** (recommended) or RookeryNew-Bold.woff, RookeryNew-Bold.ttf, or RookeryNew-Bold.otf

## Format Priority

The `fonts.css` file will try to load fonts in this order:
1. WOFF2 (best compression, modern browsers)
2. WOFF (good compression, wider browser support)
3. TTF (TrueType, universal support)
4. OTF (OpenType, universal support)

## Where to Get the Fonts

If you have the Rookery New font files, copy them to this directory. If you need to convert between formats, you can use online tools like:
- CloudConvert
- FontSquirrel Webfont Generator

## Notes

- The font files are loaded via `@font-face` declarations in `fonts.css`
- The fonts are automatically imported in Storybook via `.storybook/preview.ts`
- Font family name used in code: `'Rookery New'` (with space)
