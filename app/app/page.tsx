import { cn } from "@/utils";
import Balancer from "react-wrap-balancer";

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
          Overview
        </h1>
        <p className="text-lg text-muted-foreground">
          <Balancer>View and manage your applications.</Balancer>
        </p>
      </div>
      <div className="pb-12 pt-8">Overview</div>
    </>
  );
}
