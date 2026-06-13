"use client";

import { useTaskWorkspace } from "@/components/tasks/TaskWorkspace";

export function InboxView() {
  const { tasks, openCreateTask, openEditTask, completeTask } =
    useTaskWorkspace();

  return (
    <div className="mx-auto w-full max-w-280">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-foreground">Inbox</h1>
        <button
          type="button"
          onClick={openCreateTask}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_10px_22px_rgba(85,202,141,0.22)] hover:brightness-95 sm:hidden"
        >
          Add task
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="mt-8">
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="group flex min-h-14 items-center gap-3 border-b border-border px-1"
              >
                <button
                  type="button"
                  onClick={() => completeTask(task.id)}
                  className="size-6 shrink-0 rounded-full border border-muted-foreground bg-background hover:border-primary hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,white)]"
                  aria-label={`Complete ${task.title}`}
                />
                <button
                  type="button"
                  onClick={() => openEditTask(task)}
                  className="min-w-0 flex-1 py-4 text-left text-base font-medium text-foreground"
                >
                  <span className="block truncate">{task.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openEditTask(task)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground opacity-100 hover:bg-muted sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openCreateTask}
            className="mt-4 flex items-center gap-3 px-1 py-2 text-sm font-semibold text-primary hover:brightness-90"
          >
            <span className="text-2xl font-light leading-none">+</span>
            <span>Add task</span>
          </button>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h2 className="text-base font-semibold text-foreground">
            No active tasks yet.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first task to get started.
          </p>
          <button
            type="button"
            onClick={openCreateTask}
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-95"
          >
            Add task
          </button>
        </div>
      )}
    </div>
  );
}
