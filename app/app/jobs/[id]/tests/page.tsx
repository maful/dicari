"use client";

import { PageHeaderHeading } from "@components/page-header";
import JobNewTestResource from "@components/resources/jobs/new-test";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4 items-start">
        <div className="space-y-0.5 flex-1">
          <PageHeaderHeading className="text-xl">
            Tests Library
          </PageHeaderHeading>
        </div>
        <div>
          <JobNewTestResource jobId={params.id} />
        </div>
      </div>
    </div>
  );
}
