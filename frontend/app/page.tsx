import { cookies } from "next/headers";

import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { HeroContent } from "@/components/home/HeroContent";
import { HeroPreview } from "@/components/home/HeroPreview";
import { HomeHeader } from "@/components/home/HomeHeader";

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = Boolean(cookieStore.get("accessToken")?.value);
  const ctaHref = isAuthenticated ? "/inbox" : "/login";

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <section className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-5 sm:px-8 lg:h-screen lg:min-h-0 lg:px-16 lg:py-5 xl:px-20">
        <HomeHeader ctaHref={ctaHref} />
        <AnnouncementBar ctaHref={ctaHref} />

        <div className="grid flex-1 items-center gap-10 py-10 lg:min-h-0 lg:grid-cols-[0.82fr_1.18fr] lg:gap-9 lg:py-5">
          <HeroContent ctaHref={ctaHref} />
          <HeroPreview />
        </div>
      </section>
    </main>
  );
}
