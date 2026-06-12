import Image from "next/image";

import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <section className="grid min-h-screen w-full grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-14 lg:py-5 xl:px-24">
          <AuthCard
            title="Welcome back!"
            subtitle="Sign in to access your tasks and stay productive."
            footerText="Don't have an account?"
            footerHref="/signup"
            footerLinkLabel="Create account"
          >
            <LoginForm />
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
