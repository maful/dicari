import { EditorContent, useEditor } from "@tiptap/react";
import type { EditorEvents, JSONContent } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";

import { EditorBubbleMenu } from "./components";
import { EditorExtensions } from "./extensions";
import { EditorProps } from "./props";

interface EditorProps {
  onUpdate?: (value: JSONContent) => void;
}

export default function Editor(props: EditorProps) {
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

  return (
    <div className="relative w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2">
      {editor ? <EditorBubbleMenu editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
}
