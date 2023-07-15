import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Job Not Found</h2>
      <Link href={"/app/jobs"}>View All jobs</Link>
    </div>
  );
}
