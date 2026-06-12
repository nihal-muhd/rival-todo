import Link from "next/link";

type HomeHeaderProps = {
  ctaHref: string;
};

export function HomeHeader({ ctaHref }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-2 text-2xl font-bold tracking-[-0.02em] text-foreground sm:gap-3 sm:text-[30px]"
        aria-label="Tada igo home"
      >
        <BrandMark />
        <span className="truncate">Tada igo</span>
      </Link>

      <nav className="flex shrink-0 items-center gap-4 text-sm font-medium sm:gap-7 sm:text-base">
        <Link
          href="/login"
          className="hidden text-foreground hover:text-primary sm:inline"
        >
          Log in
        </Link>
        <Link
          href={ctaHref}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(85,202,141,0.28)] transition hover:brightness-95 sm:px-5 sm:py-3 sm:text-base"
        >
          Start for free
        </Link>
      </nav>
    </header>
  );
}

function BrandMark() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(85,202,141,0.32)] sm:size-10">
      <svg
        aria-hidden="true"
        className="size-6 sm:size-7"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.91 4.69C14.17 5.52 7.8 10.82 6.53 19.31C10.97 17.25 15.07 14.09 18.78 9.83C16.49 15.06 12.89 19.12 7.98 22.03C11.32 24.66 16.12 23.67 19.42 20.37C22.94 16.85 24.12 10.56 22.91 4.69Z"
          fill="currentColor"
        />
        <path
          d="M5.86 21.49C4.41 17.06 5.52 12.65 8.93 9.24C12.08 6.09 16.69 4.7 22.13 4.08C16.14 2.41 10.34 3.53 6.75 7.12C2.97 10.9 2.66 17.15 5.86 21.49Z"
          fill="currentColor"
          opacity="0.68"
        />
      </svg>
    </span>
  );
}
