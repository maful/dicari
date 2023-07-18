import React from "react";
import { type JobTest } from "@prisma/client";
import { generateHTML, type JSONContent } from "@tiptap/react";
import DOMPurify from "dompurify";

import { Card, CardHeader } from "@components/ui/card";
import { EditorExtensions } from "@components/ui/editor/extensions";

interface JobTestProps {
  test: JobTest;
}

export default function JobTestView({ test }: JobTestProps) {
  const { question } = test;
  const htmlOutput = React.useMemo<string>(() => {
    return DOMPurify.sanitize(
      generateHTML(question as JSONContent, EditorExtensions)
    );
  }, [question]);

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
