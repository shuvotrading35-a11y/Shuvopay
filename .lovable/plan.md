# Premium payment checkout UI

## Build
- Replace the blank page with a responsive, two-step checkout experience using original Bangladeshi fintech branding.
- Add reusable checkout pieces for navigation, merchant details, tabs, payment methods, bank transfer details, instructions, copy actions, amount summary, transaction entry, verification feedback, and loading placeholders.
- Keep every interaction demonstrational only: selection, copy feedback, loading, success, and error states will run locally with no payment or verification service.

## Visual direction
- Use a restrained ice-blue canvas, white glass-like surfaces, deep navy typography, and provider-specific accents.
- Optimize the 360–430px experience with a two-column provider grid and safe-area payment bar; expand into a centered, spacious desktop layout.
- Use crisp iconography, gentle shadows, subtle background texture, and restrained slide/fade transitions.

## Technical details
- Define the complete semantic color, typography, shadow, and animation system in the global stylesheet using Tailwind v4 tokens.
- Implement the page in the index route with accessible controls and unique route metadata.
- Load a Bengali-capable font in the document head and verify the finished flow at mobile and desktop sizes.
