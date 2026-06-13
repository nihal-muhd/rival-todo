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

### Auth Pages

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
| Validation state | `text-sm text-red-600`; fields expose `aria-invalid` and link to alert text |

**Pattern notes:**
Auth pages use a split layout on desktop: form content centered in the left column and a rounded image preview panel on the right. Desktop auth pages should use `lg:h-screen lg:min-h-0 lg:overflow-hidden` on the page shell to avoid scrolling; mobile should keep normal document flow. Inputs are large, token-based, and use icon-leading rows with `focus-within:border-primary focus-within:ring-1 focus-within:ring-primary`. Login and signup should reuse the same `AuthCard` shell. Signup uses the compact auth density plus `lg:min-h-14 xl:min-h-16` form controls so its extra field does not clip the logo or footer on desktop.

Validation and backend errors appear directly beneath the relevant control or form in compact red alert text. Submit buttons keep the established primary styling while disabled and replace their label with a clear pending action.

Login and signup must share this same field-error, server-error, and pending-button treatment so authentication feedback remains visually consistent.

### Protected Sidebar

File: frontend/components/layout/Sidebar.tsx, frontend/app/(protected)/layout.tsx  
Last updated: 2026-06-13

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-[color-mix(in_oklab,var(--color-primary)_4%,white)]`; page content uses `bg-background` |
| Border           | `border-r border-border`; mobile trigger uses `border border-border` |
| Border radius    | `rounded-lg` for navigation rows and icon buttons; `rounded-full` for the avatar |
| Text - primary   | `text-foreground`, `text-sm font-medium`; user name uses `text-base font-semibold` |
| Text - secondary | `text-muted-foreground`; active and action text use `text-primary` |
| Spacing          | Sidebar uses `px-4 py-5`; rows use `h-11 gap-3 px-3`; sections use `mt-7` and `mt-8` |
| Hover state      | `hover:bg-muted hover:text-foreground`; green actions use a soft primary color mix |
| Shadow           | `shadow-card` on the avatar, mobile trigger, and mobile drawer |
| Accent usage     | Active rows use `bg-[color-mix(in_oklab,var(--color-primary)_12%,white)] text-primary`; logout uses `text-destructive` |

**Pattern notes:**
Protected navigation uses a warm, very light green panel with token-based foreground and border colors. Navigation rows share a compact 44px height, 8px radius, and HugeIcons at roughly 20-22px. Only functional routes use links and active-route treatment; planned controls remain buttons without invented behavior. Desktop uses a fixed-width 280px sidebar while mobile opens the same content in an overlay drawer. The account header uses the restored user's name and initial. Logout sits with the lower utility actions, uses destructive text without a filled destructive background, and exposes a disabled pending state.

### Inbox Task List

File: frontend/components/tasks/InboxView.tsx  
Last updated: 2026-06-13

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-background`; empty state uses `bg-card` |
| Border           | Task rows use `border-b border-border`; completion control uses `border border-muted-foreground` |
| Border radius    | `rounded-full` for completion controls; `rounded-lg` for actions; `rounded-2xl` for empty state |
| Text - primary   | Page title uses `text-3xl font-semibold text-foreground`; task rows use `text-base font-medium text-foreground` |
| Text - secondary | Empty-state copy uses `text-sm text-muted-foreground` |
| Spacing          | List begins at `mt-8`; rows use `min-h-14 gap-3 px-1`; row title uses `py-4` |
| Hover state      | Edit action reveals with `group-hover:opacity-100`; completion control uses a soft primary tint |
| Shadow           | `shadow-card` for the empty state; primary mobile action uses a soft green shadow |
| Accent usage     | Add-task actions use `text-primary` or `bg-primary text-primary-foreground` |

**Pattern notes:**
Inbox tasks are quiet single-line rows separated by token borders. Completion is the first action, the title is the main edit target, and a compact Edit button appears on hover or keyboard focus on larger screens while staying visible on mobile. Completed tasks leave the active Inbox immediately.

### Task Form Modal

File: frontend/components/modals/TaskFormModal.tsx  
Last updated: 2026-06-13

| Property         | Class |
| ---------------- | ----- |
| Background       | Overlay uses `bg-foreground/20`; modal uses `bg-card` |
| Border           | `border border-border`; footer uses `border-t border-border` |
| Border radius    | `rounded-t-2xl` on mobile and `sm:rounded-2xl` on larger screens; fields and buttons use `rounded-lg` |
| Text - primary   | Title input uses `text-xl font-semibold text-foreground`; labels/actions use `text-sm font-medium` or `font-semibold` |
| Text - secondary | Placeholders use `placeholder:text-muted-foreground` |
| Spacing          | Modal uses `p-5 sm:p-7`; fields use `mt-4`; actions use `mt-7 gap-3 pt-5` |
| Hover state      | Secondary action uses `hover:bg-muted`; primary action uses `hover:brightness-95` |
| Shadow           | Modal uses `shadow-[0_24px_60px_rgba(16,24,40,0.18)]`; submit uses a soft green shadow |
| Accent usage     | Fields use primary focus borders/rings; submit uses `bg-primary text-primary-foreground` |

**Pattern notes:**
Task forms use a focused bottom sheet on mobile and centered card on larger screens. The form includes only task title, description, date, priority, Cancel, and the primary submit action. Create and edit share the same form, with field values reset whenever the modal opens.
