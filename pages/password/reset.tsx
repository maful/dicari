import { useState } from "react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  BaseRecord,
  ForgotPasswordFormTypes,
  HttpError,
} from "@refinedev/core";
import { useForgotPassword } from "@refinedev/core";
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
});

function ForgotPasswordForm() {
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const form = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormTypes) {
    forgotPassword(data, {
      onSuccess: (data) => {
        if (data.success) {
          setRequestSuccess(true);
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {requestSuccess ? (
          <p className="mb-6 text-sm font-medium text-primary">
            Check your email to reset your password.
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
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Reset your password
        </Button>
      </form>
    </Form>
  );
}

export default function ForgotPassword() {
  return (
    <>
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <h1 className="sr-only">Log in to your Dicari account</h1>
        <div className="max-w-sm">
          <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="mb-10 text-center text-sm text-gray-600">
            Enter your email and we will send you a link to reset your password.
          </p>
          <ForgotPasswordForm />
        </div>
      </div>
      <footer className="relative shrink-0">
        <div className="text-sm text-gray-900 flex items-center justify-center space-x-4">
          <p className="text-center">Don&apos;t have an account?</p>
          <Button asChild variant={"outline"}>
            <Link href={"/register"}>Create account</Link>
          </Button>
        </div>
      </footer>
    </>
  );
}

ForgotPassword.noLayout = true;

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
