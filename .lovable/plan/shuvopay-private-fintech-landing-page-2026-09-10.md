# ShuvoPay Private Fintech Landing Page

## Goal
Replace the current payment checkout screen with a premium, responsive landing page for Shuvo Ahmed's private ShuvoPay payment automation ecosystem.

## Build
- Create a sticky blurred navigation bar with desktop links, mobile menu, and dashboard action.
- Build a two-column hero using the supplied copy and a custom payment-control visual with verified payment, invoice, and balance cards.
- Add reusable sections for payment overview metrics, automated workflow, recent transactions, invoice management, API preview, security, personal projects, system activity, final action, and footer.
- Keep all demo values and lists in separate data structures so they can be replaced by backend data later.
- Add only local UI interactions: mobile navigation, smooth anchor scrolling, and small visual feedback. No payment processing, authentication, API calls, or backend behavior.

## Visual Direction
- Light white/cool-gray foundation with indigo and cyan accents, restrained gradients, strong dark typography, compact radii, thin borders, and layered shadows.
- Private command-center tone rather than a public SaaS website: owner identity, system status, operational data, and controlled access language.
- Responsive from mobile upward, with full-width mobile actions, no horizontal overflow, and a wide two-column desktop hero.

## Technical Details
- Rebuild `src/components/payment-checkout.tsx` as the requested reusable landing-page components.
- Update semantic theme tokens and landing-page utilities in `src/styles.css`.
- Update page metadata in `src/routes/index.tsx` and root branding/font metadata where needed.
- Use existing shadcn Button components and Lucide icons; preserve TanStack Start routing.
- Verify the result in the browser at mobile and desktop widths, including menu behavior and console errors.
