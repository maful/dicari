import { cn } from "@/utils";
import Balancer from "react-wrap-balancer";

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold leading-tight tracking-tighter",
        className
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balancer
      className={cn("max-w-[750px] text-base text-muted-foreground", className)}
      {...props}
    />
  );
}

export { PageHeaderHeading, PageHeaderDescription };
