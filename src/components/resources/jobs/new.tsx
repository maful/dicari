"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGo, type BaseRecord, type HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Plus } from "lucide-react";
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
  title: yup.string().required().label("Job title"),
  email: yup.string().email().required().label("Contact email"),
});

type FormValues = yup.InferType<typeof formSchema>;

export default function JobNewResource() {
  const go = useGo();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { refineCore, ...form } = useForm<BaseRecord, HttpError, FormValues>({
    refineCoreProps: {
      action: "create",
      resource: "jobs",
      redirect: false,
    },
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
    },
  });

  React.useEffect(() => {
    if (!dialogOpen) {
      form.reset({ title: "", email: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, form.reset]);

  async function onSubmitHandler(values: FormValues) {
    await refineCore.onFinish(values);
    setDialogOpen(false);
    go({ type: "replace" });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new job</DialogTitle>
          <DialogDescription>
            Open new opportunities with great hiring
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="new_job" onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="grid gap-4">
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
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            form="new_job"
            disabled={refineCore.formLoading}
          >
            Add job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
