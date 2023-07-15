"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { BaseRecord, HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { z } from "zod";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  email: z.string().email(),
});

type GeneralFormValues = z.infer<typeof formSchema>;

export default function Page({ params }: { params: { id: string } }) {
  const { refineCore, ...form } = useForm<
    BaseRecord,
    HttpError,
    GeneralFormValues
  >({
    refineCoreProps: {
      action: "edit",
      resource: "jobs",
      id: params.id,
    },
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
    },
  });

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(refineCore.onFinish)}>
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2 max-w-md">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2 max-w-md">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={refineCore.formLoading}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
