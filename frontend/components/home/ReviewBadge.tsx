const reviewAvatars = [
  {
    initials: "AM",
    className: "bg-[color-mix(in_oklab,var(--color-primary)_18%,white)]",
  },
  { initials: "JR", className: "bg-muted" },
  {
    initials: "SK",
    className: "bg-[color-mix(in_oklab,var(--color-primary)_28%,white)]",
  },
];

export function ReviewBadge() {
  return (
    <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-card px-4 py-2 shadow-card sm:rounded-full lg:justify-start">
      <div className="flex -space-x-2">
        {reviewAvatars.map((avatar) => (
          <span
            key={avatar.initials}
            className={`grid size-9 place-items-center rounded-full border-2 border-card text-[11px] font-semibold text-foreground ${avatar.className}`}
          >
            {avatar.initials}
          </span>
        ))}
      </div>
      <div
        className="flex items-center gap-1 text-lg font-bold text-primary"
        aria-label="5 stars"
      >
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
      </div>
      <p className="text-sm text-muted-foreground sm:text-base">
        4.9/5 from 18,000+ reviews
      </p>
    </div>
  );
}
