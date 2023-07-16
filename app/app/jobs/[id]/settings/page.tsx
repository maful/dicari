"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { BaseRecord, HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as yup from "yup";

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

const formSchema = yup.object({
  title: yup.string().required().label("Job title"),
  email: yup.string().email().required().label("Contact email"),
});

type GeneralFormValues = yup.InferType<typeof formSchema>;

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
      redirect: false,
    },
    resolver: yupResolver(formSchema),
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
