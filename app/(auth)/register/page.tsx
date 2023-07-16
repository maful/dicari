"use client";

import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActiveAuthProvider, useRegister } from "@refinedev/core";
import type { BaseRecord, HttpError, RegisterFormTypes } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Loader2 } from "lucide-react";
import * as yup from "yup";

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

const formSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().min(8).required(),
});

type FormValues = yup.InferType<typeof formSchema>;

export default function Page() {
  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<FormValues>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const form = useForm<BaseRecord, HttpError, FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: FormValues) {
    registerMutate(data);
  }

  return (
    <>
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">
          Create an account
        </h1>
        <Form {...form}>
          <form
            className="w-full max-w-sm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create an account
            </Button>
          </form>
        </Form>
      </div>
      <footer className="relative shrink-0">
        <div className="text-sm text-gray-900 flex items-center justify-center space-x-4">
          <p className="text-center">Already have an account?</p>
          <Button asChild variant={"outline"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </footer>
    </>
  );
}
