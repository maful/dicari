import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Terminal } from "lucide-react";
import type { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-gray-600 font-semibold">Dashboard</h1>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/home")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
