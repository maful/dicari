import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { EditorEvents, JSONContent } from "@tiptap/react";
import { useCompletion } from "ai/react";
import { Bot, Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { useToast } from "@components/ui//use-toast";
import { Button } from "@components/ui/button";

import { EditorBubbleMenu } from "./components";
import { EditorExtensions } from "./extensions";
import { EditorProps } from "./props";

interface EditorProps {
  onUpdate?: (value: JSONContent) => void;
  aiInitialPrompt?: string | undefined;
}

export default function Editor(props: EditorProps) {
  const { toast } = useToast();
  const debounceUpdates = useDebouncedCallback(
    async ({ editor }: EditorEvents["update"]) => {
      if (props.onUpdate) {
        const json = editor.getJSON();
        props.onUpdate(json);
      }
    },
    500
  );

  const editor = useEditor({
    extensions: EditorExtensions,
    editorProps: EditorProps,
    onUpdate: (props) => {
      debounceUpdates(props);
    },
    autofocus: "end",
  });

  const { completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    initialInput: props.aiInitialPrompt,
    onResponse: (res) => {
      if (res.status === 429) {
        toast({
          description: "You are being rate limited. Please try again later.",
          variant: "destructive",
        });
      }
    },
    onError: (err) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const prevCompletion = React.useRef("");
  React.useEffect(() => {
    const diffCompletion = completion.slice(prevCompletion.current.length);
    prevCompletion.current = completion;
    editor?.commands.insertContent(diffCompletion);
  }, [isLoading, editor, completion]);

  function handleOnSubmitAI(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <form onSubmit={handleOnSubmitAI}>
          <Button
            variant="outline"
            type="submit"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="relative w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2">
        {editor ? <EditorBubbleMenu editor={editor} /> : null}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
