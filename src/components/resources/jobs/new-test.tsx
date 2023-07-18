import { yupResolver } from "@hookform/resolvers/yup";
import { type JobTest } from "@prisma/client";
import type { HttpError } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import { type JSONContent } from "@tiptap/react";
import { Bot, Loader2 } from "lucide-react";
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
  jobId: yup.string().required(),
});

type FormValues = yup.InferType<typeof formSchema>;

interface JobNewTestResourceProps {
  jobId: string;
}

export default function JobNewTestResource(props: JobNewTestResourceProps) {
  const { refineCore, modal, ...form } = useModalForm<
    JobTest,
    HttpError,
    FormValues
  >({
    refineCoreProps: { action: "create", resource: "tests" },
    resolver: yupResolver(formSchema),
    defaultValues: {
      question: {},
      jobId: props.jobId,
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
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" type="button" size="sm">
              <Bot className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
          </div>
          <Form {...form}>
            <form id="new_test" onSubmit={form.handleSubmit(modal.submit)}>
              <div className="grid gap-4">
                <Editor onUpdate={onQuestionUpdate} />
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            form="new_test"
            disabled={refineCore.formLoading}
          >
            {refineCore.formLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
