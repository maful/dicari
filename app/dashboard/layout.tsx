"use client";

import { Authenticated } from "@refinedev/core";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticated redirectOnFail="/login">{children}</Authenticated>;
}
