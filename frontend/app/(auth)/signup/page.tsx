import Image from "next/image";

import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <section className="grid min-h-screen w-full grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-14 lg:py-5 xl:px-24">
          <AuthCard
            density="compact"
            title="Create account"
            subtitle="Start organizing your tasks with a clear, focused workspace."
            footerText="Already have an account?"
            footerHref="/login"
            footerLinkLabel="Sign in"
          >
            <SignupForm />
          </AuthCard>
        </div>

        <div className="hidden p-5 lg:block lg:h-full lg:min-h-0">
          <div className="relative h-full overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--color-primary)_18%,white)] bg-[color-mix(in_oklab,var(--color-primary)_10%,white)] shadow-[0_24px_70px_rgba(16,24,40,0.08)]">
            <Image
              src="/auth-page-image.png"
              alt="Task cards preview"
              fill
              priority
              sizes="55vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
