"use client";

import { Inter } from "next/font/google";
import { authProvider } from "@/authProvider";
import { cn } from "@/utils";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import dataProvider from "@refinedev/simple-rest";

import "@styles/global.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const API_URL = "/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          fontSans.variable,
          "min-h-full flex flex-col font-sans antialiased"
        )}
      >
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: {
                label: "Dashboard",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: false,
          }}
        >
          <div id="app" className="flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </Refine>
      </body>
    </html>
  );
}
