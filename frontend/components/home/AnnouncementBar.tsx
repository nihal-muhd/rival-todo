import Link from "next/link";

type AnnouncementBarProps = {
  ctaHref: string;
};

export function AnnouncementBar({ ctaHref }: AnnouncementBarProps) {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[1170px] items-center justify-between gap-3 rounded-xl border border-border bg-card/85 px-4 py-3 text-sm text-foreground shadow-[0_12px_42px_rgba(16,24,40,0.06)] backdrop-blur sm:px-8 sm:text-base lg:mt-5 lg:py-2.5">
      <p className="mx-auto flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span aria-hidden="true">&#128640;</span>
        <span className="text-muted-foreground">
          New: Calendar integration, recurring tasks, and more.
        </span>
        <Link href={ctaHref} className="hidden font-medium text-primary sm:inline">
          See what&apos;s new &rarr;
        </Link>
      </p>
      <span className="text-2xl leading-none text-muted-foreground" aria-hidden="true">
        &times;
      </span>
    </div>
  );
}
