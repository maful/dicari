"use client";

import type { Job, JobTest } from "@prisma/client";
import { useInfiniteList, useOne } from "@refinedev/core";

import { PageHeaderHeading } from "@components/page-header";
import JobTestView from "@components/resources/jobs/job-test";
import JobNewTestResource from "@components/resources/jobs/new-test";

export default function Page({ params }: { params: { id: string } }) {
  const { data: jobData } = useOne<Job>({
    resource: "jobs",
    id: params.id,
    queryOptions: {
      retry: 1,
    },
  });
  const job = jobData?.data;

  const { data, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteList<JobTest>({
      resource: `jobs/${params.id}/tests`,
      pagination: {
        pageSize: 20,
      },
    });

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4 items-start">
        <div className="space-y-0.5 flex-1">
          <PageHeaderHeading className="text-xl">
            Tests Library
          </PageHeaderHeading>
        </div>
        <div>
          <JobNewTestResource job={job} jobId={params.id} />
        </div>
      </div>
      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.data.map((test) => (
            <JobTestView key={test.id} test={test} jobId={params.id} />
          ))
        )}
      </div>
    </div>
  );
}
