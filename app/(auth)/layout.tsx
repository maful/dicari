import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/app");
  } else {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden px-6 py-8">
        {children}
      </main>
    );
  }
}
