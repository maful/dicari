"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Authenticated } from "@refinedev/core";
import {
  Airplay,
  BookOpen,
  Github,
  Luggage,
  Twitter,
  Users,
} from "lucide-react";

import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn } from "src/utils";

function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        DICARI
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/docs"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Documentation
        </Link>
        <Link
          href="https://github.com/maful/dicari"
          className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button asChild variant="ghost">
              <Link
                href={"https://github.com/maful/dicari"}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link
                href={"https://twitter.com/mafulprayoga"}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <Twitter className="h-4 w-4 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  const items = [
    {
      title: "Overview",
      href: "/app",
      icon: <Airplay className="h-4 w-4 mr-2" />,
    },
    {
      title: "All jobs",
      href: "/app/jobs",
      icon: <Luggage className="h-4 w-4 mr-2" />,
    },
    {
      title: "All candidates",
      href: "/app/candidates",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      title: "Test library",
      href: "/app/libraries",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={cn(
              "flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticated redirectOnFail="/login">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
              <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                <SidebarNav />
              </ScrollArea>
            </aside>
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid">
              <div className="mx-auto w-full min-w-0">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
