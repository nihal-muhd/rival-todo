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
