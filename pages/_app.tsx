import { ReactElement, ReactNode } from "react";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Layout } from "@components/layout";
import dataProvider from "@refinedev/simple-rest";
import "@styles/global.css";
import { authProvider } from "src/authProvider";
import { Inter } from "next/font/google";
import { cn } from "src/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const API_URL = "/api";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    const getLayout = Component.getLayout ?? ((page) => page);
    if (Component.getLayout) {
      return getLayout(<Component {...pageProps} />);
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "home",
              list: "/home",
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
          <main
            className={cn(
              fontSans.variable,
              "relative flex flex-col flex-1 overflow-hidden px-4 py-8 font-sans antialiased"
            )}
          >
            {renderComponent()}
          </main>
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
