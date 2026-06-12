import Link from "next/link";

type AuthCardProps = {
  children: React.ReactNode;
  density?: "default" | "compact";
  footerHref: string;
  footerLinkLabel: string;
  footerText: string;
  subtitle: string;
  title: string;
};

export function AuthCard({
  children,
  density = "default",
  footerHref,
  footerLinkLabel,
  footerText,
  subtitle,
  title,
}: AuthCardProps) {
  const isCompact = density === "compact";
  const brandSpacing = isCompact
    ? "mb-6 lg:mb-4"
    : "mb-10 xl:mb-5";
  const titleSize = isCompact
    ? "text-[36px] sm:text-[40px] lg:text-[34px] xl:text-[38px]"
    : "text-[40px] sm:text-[44px]";
  const subtitleSpacing = isCompact
    ? "mt-3 lg:mt-2 lg:text-base lg:leading-6"
    : "mt-4 sm:text-lg";
  const formSpacing = isCompact ? "mt-6 lg:mt-5" : "mt-8";
  const footerSpacing = isCompact ? "mt-6 lg:mt-5" : "mt-8 xl:mt-10";

  return (
    <section className="w-full max-w-[560px]">
      <Link
        href="/"
        className={`${brandSpacing} inline-flex items-center gap-3 text-[30px] font-bold tracking-[-0.02em] text-foreground`}
        aria-label="Tada igo home"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(85,202,141,0.32)]">
          <svg
            aria-hidden="true"
            className="size-7"
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
        <span>Tada igo</span>
      </Link>

      <div>
        <h1
          className={`${titleSize} font-bold leading-[1.15] tracking-[-0.02em] text-foreground`}
        >
          {title}
        </h1>
        <p
          className={`${subtitleSpacing} text-base font-medium leading-7 text-muted-foreground`}
        >
          {subtitle}
        </p>
      </div>

      <div className={formSpacing}>{children}</div>

      <p className={`${footerSpacing} text-center text-base text-foreground`}>
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-semibold text-primary hover:brightness-95"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </section>
  );
}
