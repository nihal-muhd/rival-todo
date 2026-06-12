# UI Registry

### Landing Page

File: frontend/app/page.tsx, frontend/components/home/HomeHeader.tsx, frontend/components/home/AnnouncementBar.tsx, frontend/components/home/HeroContent.tsx, frontend/components/home/ReviewBadge.tsx, frontend/components/home/HeroPreview.tsx  
Last updated: 2026-06-13

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-background` |
| Border           | `border border-border`; preview uses `border-[color-mix(in_oklab,var(--color-primary)_24%,white)]` |
| Border radius    | `rounded-lg` for nav CTA, `rounded-xl` for CTA/review pill, `rounded-2xl` for preview frame |
| Text - primary   | `text-foreground`, `font-bold`, `tracking-[-0.03em]` for hero headline |
| Text - secondary | `text-muted-foreground`, `font-medium`, `leading-8 sm:leading-9` |
| Spacing          | Page shell uses `px-5 py-5 sm:px-8 lg:px-16 lg:py-5 xl:px-20`; content uses `gap-10 lg:gap-9`, `mt-4`, `mt-6`, `mt-7` |
| Hover state      | `hover:text-primary`, `hover:brightness-95` |
| Shadow           | `shadow-card`; primary CTAs and preview use soft green or neutral custom shadows |
| Accent usage     | `bg-primary`, `text-primary`, `text-primary-foreground`, soft `color-mix` green tints |

**Pattern notes:**
The public landing page uses a calm white background with green as the only brand accent. Primary actions are rounded rectangles with `bg-primary`, `text-primary-foreground`, and a soft green shadow. Lightweight card-like elements use `border-border`, white/card backgrounds, and restrained shadows. Desktop landing layouts should constrain to `lg:h-screen` with shrinkable media so the first viewport does not scroll; mobile layouts should use normal vertical flow with centered copy and wrapped pills.

### Auth Login Page

File: frontend/app/(auth)/login/page.tsx, frontend/app/(auth)/signup/page.tsx, frontend/components/auth/AuthCard.tsx, frontend/components/auth/LoginForm.tsx, frontend/components/auth/SignupForm.tsx  
Last updated: 2026-06-13

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-background`; preview panel uses `bg-[color-mix(in_oklab,var(--color-primary)_10%,white)]` |
| Border           | `border border-border`; preview panel uses `border-[color-mix(in_oklab,var(--color-primary)_18%,white)]` |
| Border radius    | `rounded-lg` for inputs/buttons, `rounded-2xl` for preview panel |
| Text - primary   | `text-foreground`, `font-bold`, `tracking-[-0.02em]` for auth title |
| Text - secondary | `text-muted-foreground`, `font-medium`, `leading-7` |
| Spacing          | Auth shell uses `px-6 py-10 sm:px-10 lg:px-14 lg:py-5 xl:px-24`; form uses `space-y-6`, field groups use `space-y-3` |
| Hover state      | `hover:brightness-95`, `hover:bg-muted` |
| Shadow           | `shadow-[0_18px_36px_rgba(85,202,141,0.30)]` for primary submit; subtle neutral input shadow |
| Accent usage     | `bg-primary`, `text-primary`, `text-primary-foreground`, green focus ring and checkbox selected state |

**Pattern notes:**
Auth pages use a split layout on desktop: form content centered in the left column and a rounded image preview panel on the right. Desktop auth pages should use `lg:h-screen lg:min-h-0 lg:overflow-hidden` on the page shell to avoid scrolling; mobile should keep normal document flow. Inputs are large, token-based, and use icon-leading rows with `focus-within:border-primary focus-within:ring-1 focus-within:ring-primary`. Login and signup should reuse the same `AuthCard` shell. Signup uses the compact auth density plus `lg:min-h-14 xl:min-h-16` form controls so its extra field does not clip the logo or footer on desktop.
