"use client";

import React from "react";
import Link from "next/link";
import { notFound, useSelectedLayoutSegment } from "next/navigation";
import type { Job } from "@prisma/client";
import { useOne } from "@refinedev/core";
import { Archive, MonitorX, MoreVertical } from "lucide-react";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header";

interface JobLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function JobLayout({ children, params }: JobLayoutProps) {
  const [tabValue, setTabValue] = React.useState<string>("");
  const segment = useSelectedLayoutSegment();
  const { data, isError } = useOne<Job>({
    resource: "jobs",
    id: params.id,
    queryOptions: {
      retry: 1,
    },
  });

  if (isError) {
    notFound();
  }

  React.useEffect(() => {
    if (segment === null) {
      setTabValue("overview");
    } else {
      setTabValue(segment);
    }
  }, [segment]);

  const job = data?.data;

  return (
    <>
      {/* page headaer */}
      <div className="flex flex-row items-start gap-4">
        <div className="space-y-0.5 flex-1">
          <PageHeaderHeading>{job?.title}</PageHeaderHeading>
          <PageHeaderDescription>View and manage job</PageHeaderDescription>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <MoreVertical className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" /> Pause job
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MonitorX className="mr-2 h-4 w-4" /> Close job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs className="w-full mt-4" activationMode="manual" value={tabValue}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview" asChild>
            <Link href={`/app/jobs/${params.id}`}>Overview</Link>
          </TabsTrigger>
          <TabsTrigger value="statistics" asChild>
            <Link href={`/app/jobs/${params.id}/statistics`}>Statistics</Link>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Link href={`/app/jobs/${params.id}/settings`}>Settings</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">{children}</div>
    </>
  );
}
