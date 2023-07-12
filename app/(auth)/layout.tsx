import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authProvider, COOKIES_KEY } from "src/authProvider";

async function checkAuth(authCokkie: string | undefined) {
  return await authProvider.check(authCokkie);
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const auth = cookieStore.get("dicari_token");
  const { authenticated } = await checkAuth(auth?.value);

  if (authenticated) {
    return redirect("/dashboard");
  } else {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden px-6 py-8">
        {children}
      </main>
    );
  }
}
