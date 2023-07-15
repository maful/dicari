"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Authenticated, useLogout } from "@refinedev/core";
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

function MainNav() {
  const { mutate: logout } = useLogout();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        DICARI
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <button
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          onClick={() => logout()}
        >
          Logout
        </button>
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
      <div className="space-y-1">
        {items.map((item, index) => (
          <Button
            key={index}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.title}
            </Link>
          </Button>
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
          <div className="container grid lg:grid-cols-5">
            <aside className="block">
              <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                <SidebarNav />
              </ScrollArea>
            </aside>
            <main className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
