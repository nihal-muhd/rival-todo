"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleIcon,
  Analytics01Icon,
  ArrowDown01Icon,
  Calendar02Icon,
  FilterIcon,
  HelpCircleIcon,
  InboxIcon,
  Notification02Icon,
  PlusSignIcon,
  Search01Icon,
  SidebarLeftIcon,
  Tag01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

import { useTaskWorkspace } from "@/components/tasks/TaskWorkspace";

type NavigationItem = {
  label: string;
  href?: string;
  icon: typeof InboxIcon;
  count?: number;
  accent?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Add task", icon: AddCircleIcon, accent: true },
  { label: "Search", icon: Search01Icon },
  { label: "Inbox", href: "/inbox", icon: InboxIcon, count: 12 },
  { label: "Today", href: "/today", icon: Calendar02Icon },
  { label: "Calendar", href: "/calendar", icon: Calendar02Icon },
  { label: "Filters & Labels", icon: FilterIcon },
  { label: "Reporting", icon: Analytics01Icon },
];

const projects = [
  { label: "Getting Started", count: 13 },
  { label: "Rival", count: 1 },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { openCreateTask } = useTaskWorkspace();

  return (
    <div className="flex h-full flex-col bg-[color-mix(in_oklab,var(--color-primary)_4%,white)] px-4 py-5 text-foreground">
      <div className="flex items-center gap-3 px-2">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card">
          N
        </div>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-2 text-left hover:text-primary"
          aria-label="Open user menu"
        >
          <span className="truncate text-base font-semibold">Nihal</span>
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <HugeiconsIcon icon={Notification02Icon} size={22} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          className="hidden size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:grid"
          aria-label="Collapse sidebar"
        >
          <HugeiconsIcon icon={SidebarLeftIcon} size={22} strokeWidth={1.7} />
        </button>
      </div>

      <nav className="mt-7 space-y-1" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const isActive = item.href === pathname;
          const itemClassName = [
            "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
            isActive
              ? "bg-[color-mix(in_oklab,var(--color-primary)_12%,white)] text-primary"
              : item.accent
                ? "text-primary hover:bg-[color-mix(in_oklab,var(--color-primary)_8%,white)]"
                : "text-foreground hover:bg-muted",
          ].join(" ");

          const content = (
            <>
              <HugeiconsIcon
                icon={item.icon}
                size={22}
                strokeWidth={item.accent ? 2 : 1.7}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined ? (
                <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                  {item.count}
                </span>
              ) : null}
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={itemClassName}
                onClick={onNavigate}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              className={itemClassName}
              onClick={
                item.label === "Add task"
                  ? () => {
                      openCreateTask();
                      onNavigate?.();
                    }
                  : undefined
              }
            >
              {content}
            </button>
          );
        })}
      </nav>

      <section className="mt-8" aria-labelledby="projects-heading">
        <div className="flex items-center justify-between px-3">
          <h2 id="projects-heading" className="text-sm font-semibold text-muted-foreground">
            My Projects
          </h2>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Add project"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={19} strokeWidth={1.7} />
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {projects.map((project) => (
            <button
              key={project.label}
              type="button"
              className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium hover:bg-muted"
            >
              <HugeiconsIcon
                icon={Tag01Icon}
                size={20}
                strokeWidth={1.6}
                className="text-muted-foreground"
              />
              <span className="flex-1 truncate text-left">{project.label}</span>
              <span className="text-muted-foreground">{project.count}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto space-y-1 pt-8">
        <button
          type="button"
          className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium hover:bg-muted"
        >
          <HugeiconsIcon icon={UserGroupIcon} size={21} strokeWidth={1.7} />
          <span>Add a team</span>
        </button>
        <button
          type="button"
          className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium hover:bg-muted"
        >
          <HugeiconsIcon icon={HelpCircleIcon} size={21} strokeWidth={1.7} />
          <span>Help & resources</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className="hidden h-screen w-70 shrink-0 border-r border-border lg:block">
        <SidebarContent />
      </aside>

      <button
        type="button"
        className="fixed left-4 top-4 z-30 grid size-10 place-items-center rounded-lg border border-border bg-background text-foreground shadow-card lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        aria-expanded={isOpen}
      >
        <HugeiconsIcon icon={SidebarLeftIcon} size={22} strokeWidth={1.8} />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          />
          <aside className="relative h-full w-70 border-r border-border shadow-card">
            <SidebarContent onNavigate={() => setIsOpen(false)} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
