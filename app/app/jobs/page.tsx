"use client";

import type { Job } from "@prisma/client";
import { useTable } from "@refinedev/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarDays, Users } from "lucide-react";

import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
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

  return (
    <>
      <div className="space-y-0.5">
        <PageHeaderHeading>Jobs</PageHeaderHeading>
        <PageHeaderDescription>View and manage all jobs</PageHeaderDescription>
      </div>
      <div className="pb-12 pt-8">
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="space-y-1 flex-1">
                  <CardTitle>{job.title}</CardTitle>
                </div>
                <div>
                  <Badge variant={job.paused ? "destructive" : "default"}>
                    {job.paused ? "Paused" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />0 candidates
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {dayjs(job.createdAt).isSame(dayjs(job.updatedAt))
                      ? "created "
                      : "updated "}
                    {dayjs(job.updatedAt).fromNow()}
                  </div>
                </div>
              </CardContent>
            </Card>
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
