"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Airplay, BookOpen, Luggage, Users } from "lucide-react";

import { Button } from "@components/ui/button";

interface MenuItem {
  key: string | null;
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const items: MenuItem[] = [
  {
    title: "Overview",
    href: "/app",
    icon: <Airplay className="h-4 w-4 mr-2" />,
    key: null,
  },
  {
    title: "All jobs",
    href: "/app/jobs",
    icon: <Luggage className="h-4 w-4 mr-2" />,
    key: "jobs",
  },
  {
    title: "All candidates",
    href: "/app/candidates",
    icon: <Users className="h-4 w-4 mr-2" />,
    key: "candidates",
  },
  {
    title: "Test library",
    href: "/app/libraries",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    key: "libraries",
  },
];

export default function Menu() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="w-full">
      <div className="space-y-1">
        {items.map((item, index) => (
          <Button
            key={index}
            variant={segment === item.key ? "secondary" : "ghost"}
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
