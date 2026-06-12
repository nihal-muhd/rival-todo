import Image from "next/image";

export function HeroPreview() {
  return (
    <div className="relative min-h-0 lg:flex lg:h-full lg:items-center">
      <div className="absolute inset-x-6 bottom-[-185px] hidden h-[260px] rounded-[50%] bg-[color-mix(in_oklab,var(--color-primary)_10%,white)] blur-3xl lg:block" />
      <div className="relative w-full overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--color-primary)_24%,white)] bg-[linear-gradient(120deg,var(--color-card)_0%,var(--color-card)_42%,color-mix(in_oklab,var(--color-primary)_11%,white)_42%,var(--color-card)_100%)] p-2 shadow-[0_24px_70px_rgba(16,24,40,0.10)] sm:p-3 lg:max-h-full">
        <Image
          src="/today.png"
          alt="Tada igo task dashboard preview"
          width={1676}
          height={940}
          priority
          className="h-auto w-full rounded-xl border border-border bg-card shadow-[0_18px_45px_rgba(16,24,40,0.12)] lg:max-h-[calc(100vh-188px)] lg:w-auto lg:object-contain"
        />
      </div>
    </div>
  );
}
