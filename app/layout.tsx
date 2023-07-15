"use client";

import { Inter } from "next/font/google";
import { authProvider } from "@/authProvider";
import { cn } from "@/utils";
import { Refine, type NotificationProvider } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import dataProvider from "@refinedev/simple-rest";

import { Toaster } from "@components/ui/toaster";
import { toast, toastDismiss } from "@components/ui/use-toast";

import "@styles/global.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const API_URL = "/api";

function notificationProvider(): NotificationProvider {
  return {
    open({ message, key, type }) {
      if (type === "error") {
        toast({
          id: key,
          description: message,
          duration: 3000,
          variant: "destructive",
        });
      } else {
        toast({ id: key, description: message, duration: 3000 });
      }
    },
    close(key) {
      toastDismiss({ id: key });
    },
  };
}

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
          notificationProvider={notificationProvider}
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
          <Toaster />
        </Refine>
      </body>
    </html>
  );
}
