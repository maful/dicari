import type { GetServerSideProps } from "next";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterType,
} from "@refinedev/core";
import type { BaseRecord, HttpError, LoginFormTypes } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { authProvider } from "src/authProvider";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginPage = () => {
  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const form = useForm<BaseRecord, HttpError, LoginFormTypes>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: LoginFormTypes) {
    login(data, {
      onSuccess: (data) => {
        if (!data.success) {
          if (data?.error?.name === "AuthApiError") {
            form.setError("root", {
              type: "custom",
              message: data?.error?.message,
            });
          }
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form className="w-full max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
        {form.formState.errors?.root?.message ? (
          <p className="mb-6 text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        ) : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign in to account
        </Button>
      </form>
      <div className="mt-8">
        <Button asChild variant={"link"}>
          <Link href={"/password/reset"}>Forgot password?</Link>
        </Button>
      </div>
    </Form>
  );
};

export default function Login() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <h1 className="sr-only">Log in to your Dicari account</h1>
      <LoginPage />
    </div>
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
