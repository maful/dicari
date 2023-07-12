import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActiveAuthProvider,
  useParsed,
  useUpdatePassword,
} from "@refinedev/core";
import type {
  BaseRecord,
  HttpError,
  UpdatePasswordFormTypes,
} from "@refinedev/core";
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

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function UpdatePassword() {
  const authProvider = useActiveAuthProvider();
  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
  const parsed = useParsed();
  console.log(parsed);

  const form = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: UpdatePasswordFormTypes) {
    console.log("onSubmit", data);
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">
        Update your password
      </h1>

      <Form {...form}>
        <form
          className="w-full max-w-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Confirm Password</FormLabel>
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
  );
}

UpdatePassword.noLayout = true;
