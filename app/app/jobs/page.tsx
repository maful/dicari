"use client";

import Link from "next/link";
import type { Job } from "@prisma/client";
import { useTable } from "@refinedev/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarDays, Users } from "lucide-react";

import { Badge, type BadgeProps } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header";

dayjs.extend(relativeTime);

export default function Page() {
  const { tableQueryResult, current, setCurrent, pageCount } = useTable<Job>({
    resource: "jobs",
  });
  const jobs = tableQueryResult?.data?.data ?? [];
  // Checks if there is a next page available
  const hasNext = current < pageCount;
  // Checks if there is a previous page available
  const hasPrev = current > 1;

  function renderJobBadge(job: Job): JSX.Element {
    let variant: BadgeProps["variant"] = "default";
    let title = "Active";

    if (job.closed) {
      variant = "destructive";
      title = "Closed";
    }

    if (job.paused) {
      variant = "outline";
      title = "Paused";
    }

    return <Badge variant={variant}>{title}</Badge>;
  }

  function renderJobTime(job: Job): JSX.Element {
    let time: JSX.Element = (
      <>
        {dayjs(job.createdAt).isSame(dayjs(job.updatedAt))
          ? "created"
          : "updated"}{" "}
        {dayjs(job.updatedAt).fromNow()}
      </>
    );

    if (job.paused) {
      time = <>paused at {dayjs(job.pausedAt).format("MMMM D, YYYY h:mm A	")}</>;
    }

    if (job.closed) {
      time = <>closed at {dayjs(job.closedAt).format("MMMM D, YYYY h:mm A	")}</>;
    }

    return (
      <div className="flex items-center">
        <CalendarDays className="mr-1 h-3 w-3" />
        {time}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-0.5">
        <PageHeaderHeading>Jobs</PageHeaderHeading>
        <PageHeaderDescription>View and manage all jobs</PageHeaderDescription>
      </div>
      <div className="pb-12 pt-8">
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <Link key={job.id} href={`/app/jobs/${job.publicId}`}>
              <Card>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="space-y-1 flex-1">
                    <CardTitle>{job.title}</CardTitle>
                  </div>
                  <div>{renderJobBadge(job)}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />0 candidates
                    </div>
                    {renderJobTime(job)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-2 mt-6">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {current} of {pageCount}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPrev}
              onClick={() => setCurrent((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((prev) => prev + 1)}
              disabled={!hasNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
