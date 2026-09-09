# Shuvo Pay UI

Create a modern, premium and responsive Payment Gateway Checkout UI based on the attached reference screenshots.



IMPORTANT:

This task is ONLY for frontend UI/UX design.

Do not implement real payment processing, payment API, OTP, PIN or transaction verification.



================================================

DESIGN STYLE

================================================



Create a clean Bangladesh-style mobile payment checkout interface.



Overall style:

- Mobile-first

- Modern fintech UI

- Minimal and professional

- Light blue/white background

- Soft blue gradient elements

- Rounded cards

- Subtle shadows

- Glassmorphism-inspired cards

- Smooth animations

- Excellent spacing

- Premium typography

- Fully responsive



The UI should look very close in structure and visual feel to the reference screenshots, but use original branding and assets.



================================================

SCREEN 1 — PAYMENT METHOD

================================================



Top area:



[ Home Icon ]                         [ Close Icon ]



Create a large rounded white navigation card.



Below:



        [ Merchant Logo ]



        Merchant Name

        Small subtitle / SMM PANEL



Under the merchant information add two small action buttons:



[ 🎧 Support ]     [ ⓘ Information ]



================================================

PAYMENT METHOD TABS

================================================



Create a large segmented tab component:



┌────────────────────┬────────────────────┐

│   Mobile Banking   │    Bank Transfer   │

└────────────────────┴────────────────────┘



Selected tab:

- Blue background

- White text



Unselected tab:

- Light blue background

- Dark text



================================================

MOBILE BANKING CARDS

================================================



Create responsive payment method cards in a 2-column grid on mobile.



Example:



┌──────────────────────┐

│              PERSONAL│

│                      │

│       bKash LOGO     │

│                      │

└──────────────────────┘



┌──────────────────────┐

│              PERSONAL│

│                      │

│       Nagad LOGO     │

│                      │

└──────────────────────┘



┌──────────────────────┐

│              PERSONAL│

│                      │

│      CellFin LOGO    │

│                      │

└──────────────────────┘



Card design:

- White background

- Thin light-blue border

- 14–18px rounded corners

- Soft shadow

- Provider logo centered

- Small "PERSONAL" badge at top-right

- Hover/tap animation

- Selected state with blue border

- Touch-friendly size



================================================

BANK TRANSFER TAB

================================================



When Bank Transfer is selected, show cards for:



- Bank name

- Account name

- Account number

- Branch

- Copy button



Use clean banking-style cards.



================================================

BOTTOM PAYMENT BAR

================================================



Create a fixed bottom payment bar on mobile.



Example:



┌────────────────────────────────────────────┐

│                                            │

│              Pay ৳130.00                   │

│                                            │

└────────────────────────────────────────────┘



Design:

- Full width

- Rounded top corners

- Light blue background

- Large blue text

- Sticky/fixed bottom

- Safe-area padding for Android/iPhone

- Button should have subtle press animation



================================================

SCREEN 2 — PAYMENT INSTRUCTION

================================================



Create a second checkout screen after selecting a payment method.



Top navigation:



[ Home ]                              [ Back ]



Merchant card:



┌──────────────────────────────────────┐

│                                      │

│       Merchant Logo                  │

│       SMM PANEL                      │

│                                      │

│       Invoice ID: RU60DT288176       │

│                                      │

└──────────────────────────────────────┘



Then create a large provider logo section.



Example:



              [ bKash LOGO ]



================================================

INSTRUCTION CARD

================================================



Create a large colorful instruction card.



Use a payment-provider-inspired accent color, but keep the design original.



Title:



        পেমেন্টশন আইডি দিন



Then:



┌──────────────────────────────────────┐

│       ট্রানজেকশন আইডি দিন            │

└──────────────────────────────────────┘



Below create numbered/bullet instructions:



• আপনার Mobile Banking App খুলুন



• Send Money নির্বাচন করুন



• Merchant-এর প্রদত্ত account number ব্যবহার করুন



• নির্ধারিত amount payment করুন



• Payment সম্পন্ন হওয়ার পর Transaction ID দিন



Highlight important information with bold typography.



Example:



প্রাপক:

01929014479



Amount:

৳405.00



Add COPY button beside account number.



================================================

VERIFY BUTTON

================================================



At the bottom create a large full-width button:



              VERIFY



Button:

- Rounded

- Provider accent color

- White bold text

- 54–60px height

- Press animation

- Loading state



================================================

VISUAL DETAILS

================================================



Use:



- Soft background pattern

- Rounded containers

- Subtle gradients

- 8px spacing system

- 16–24px card radius

- Professional font

- Bengali font support

- Consistent icon style

- Smooth page transitions

- Fade/slide animations

- Skeleton loading states



Avoid:

- Excessive gradients

- Too many colors

- Clutter

- Tiny buttons

- Poor contrast

- Overly complicated UI



================================================

RESPONSIVE DESIGN

================================================



Mobile:

- 2-column payment cards

- Sticky bottom Pay button

- Large touch targets

- Optimized for 360px–430px screens



Tablet:

- 2–3 column cards



Desktop:

- Centered checkout container

- Maximum width around 700–850px

- More whitespace

- Payment summary positioned neatly



================================================

COMPONENTS

================================================



Create reusable components:



PaymentHeader

MerchantCard

SupportButton

InfoButton

PaymentTabs

PaymentMethodCard

BankTransferCard

PaymentInstructionCard

AccountNumberRow

AmountSummary

TransactionInput

VerifyButton

BottomPayBar

SuccessState

ErrorState

LoadingState



================================================

COLOR SYSTEM

================================================



Primary:

Professional blue



Secondary:

Light blue



Background:

Very light blue/white



Cards:

White



Text:

Dark navy/gray



Success:

Green



Error:

Red



Use CSS variables so the entire theme can be changed easily.



================================================

FINAL RESULT

================================================



The final UI should feel like a real premium fintech/payment checkout interface:



Clean

Modern

Fast

Trustworthy

Mobile-first

Professional



Use the attached screenshots as layout and UX inspiration only.

Create original branding, icons, typography and visual assets.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a41fa54e-9076-4cc0-8093-eaf19027f5c5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
