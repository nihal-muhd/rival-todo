import Link from "next/link";

import { ReviewBadge } from "@/components/home/ReviewBadge";

type HeroContentProps = {
  ctaHref: string;
};

export function HeroContent({ ctaHref }: HeroContentProps) {
  return (
    <div className="max-w-[560px] text-center lg:text-left">
      <h1 className="mx-auto max-w-[560px] text-[43px] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[64px] lg:mx-0 lg:text-[66px] xl:text-[76px]">
        Clarity, finally.
      </h1>
      <p className="mx-auto mt-4 max-w-[520px] text-lg font-medium leading-8 text-muted-foreground sm:text-[23px] sm:leading-9 lg:mx-0 lg:mt-4 lg:text-[22px] xl:text-[25px]">
        Join 2M+ professionals who simplify work and life with a task management
        app that just makes sense.
      </p>

      <ReviewBadge />

      <div className="mt-7 lg:mt-6">
        <Link
          href={ctaHref}
          className="inline-flex min-h-14 min-w-[180px] items-center justify-center rounded-xl bg-primary px-8 text-xl font-semibold text-primary-foreground shadow-[0_18px_36px_rgba(85,202,141,0.32)] transition hover:brightness-95 sm:min-h-16 sm:min-w-[210px] sm:px-10 sm:text-2xl lg:min-h-14 lg:min-w-[190px] lg:text-xl xl:min-h-16 xl:min-w-[220px] xl:text-2xl"
        >
          Start for free
        </Link>
        <p className="mt-4 flex items-center justify-center gap-3 text-base text-muted-foreground lg:justify-start">
          <span className="grid size-5 place-items-center rounded-full border-2 border-primary text-xs font-bold text-primary">
            &#10003;
          </span>
          No credit card required
        </p>
      </div>
    </div>
  );
}
