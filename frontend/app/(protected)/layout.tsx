import { Sidebar } from "@/components/layout/Sidebar";
import { TaskWorkspace } from "@/components/tasks/TaskWorkspace";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TaskWorkspace>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-5 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </TaskWorkspace>
  );
}
