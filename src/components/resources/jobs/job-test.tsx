import React from "react";
import { type JobTest } from "@prisma/client";
import { useDelete, useModal } from "@refinedev/core";
import { generateHTML, type JSONContent } from "@tiptap/react";
import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { Card, CardHeader } from "@components/ui/card";
import { EditorExtensions } from "@components/ui/editor/extensions";

interface JobTestProps {
  test: JobTest;
  jobId: string;
}

export default function JobTestView({ test, jobId }: JobTestProps) {
  const { question } = test;
  const htmlOutput = React.useMemo<string>(() => {
    return DOMPurify.sanitize(
      generateHTML(question as JSONContent, EditorExtensions)
    );
  }, [question]);

  const { mutate, isLoading } = useDelete();
  const { show, close, visible } = useModal();

  function alertDialogHandler(open: boolean) {
    if (open) {
      show();
    } else {
      close();
    }
  }

  function onDeleteHandler() {
    mutate(
      {
        resource: `jobs/${jobId}/tests`,
        id: test.id,
        successNotification: () => {
          return {
            message: "Successfully delete test question",
            type: "success",
          };
        },
        errorNotification: () => {
          return {
            message: "Something went wrong when deleting test question",
            type: "error",
          };
        },
      },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 items-start">
          <div className="text-sm text-muted-foreground flex-1">
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </div>
          <div className="flex gap-2">
            <AlertDialog open={visible} onOpenChange={alertDialogHandler}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the test question.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={onDeleteHandler}
                    variant="destructive"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
