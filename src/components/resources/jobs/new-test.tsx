"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { Job, JobTest } from "@prisma/client";
import type { HttpError } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import { type JSONContent } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import * as yup from "yup";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import Editor from "@components/ui/editor";
import { Form } from "@components/ui/form";

const formSchema = yup.object({
  question: yup.mixed<JSONContent>().required().label("Question"),
});

type FormValues = yup.InferType<typeof formSchema>;

interface JobNewTestResourceProps {
  jobId: string;
  job: Job | undefined;
}

export default function JobNewTestResource(props: JobNewTestResourceProps) {
  const { refineCore, modal, ...form } = useModalForm<
    JobTest,
    HttpError,
    FormValues
  >({
    refineCoreProps: {
      action: "create",
      resource: `jobs/${props.jobId}/tests`,
      successNotification: () => {
        return {
          message: "Test successfully created",
          type: "success",
        };
      },
    },
    resolver: yupResolver(formSchema),
    defaultValues: {
      question: {},
    },
  });

  function onModalChange(open: boolean) {
    if (open) {
      modal.show();
    } else {
      modal.close();
    }
  }

  function onQuestionUpdate(value: JSONContent) {
    form.setValue("question", value);
  }

  return (
    <Dialog open={modal.visible} onOpenChange={onModalChange}>
      <DialogTrigger asChild>
        <Button>Add question</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-lg"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add question</DialogTitle>
          <DialogDescription>
            Enter a question for candidate or use AI to help you out.
          </DialogDescription>
        </DialogHeader>
        <Editor
          onUpdate={onQuestionUpdate}
          aiInitialPrompt={props.job?.title}
        />
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(modal.submit)}>
              <Button type="submit" disabled={refineCore.formLoading}>
                {refineCore.formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
