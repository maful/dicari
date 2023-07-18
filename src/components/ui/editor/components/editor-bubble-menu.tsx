import { useState } from "react";
import { cn } from "@/utils";
import { BubbleMenu, type BubbleMenuProps } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  type LucideIcon,
} from "lucide-react";

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: LucideIcon;
}

export function EditorBubbleMenu(props: EditorBubbleMenuProps) {
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor.isActive("italic"),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor.isActive("underline"),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => props.editor.isActive("strike"),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => props.editor.isActive("code"),
      command: () => props.editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive("image")) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-slate-200 rounded border border-slate-200 bg-white shadow-xl"
    >
      <div className="flex">
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={item.command}
            className="p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200"
          >
            <item.icon
              className={cn("h-4 w-4", { "text-blue-500": item.isActive() })}
            />
          </button>
        ))}
      </div>
    </BubbleMenu>
  );
}
