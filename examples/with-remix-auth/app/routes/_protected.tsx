import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ThemedLayout } from "@refinedev/antd";
import { authenticator } from "~/utils/auth.server";

export default function AuthenticatedLayout() {
  // `<ThemedLayout>` is only applied if the user is authenticated
  return (
    <ThemedLayout>
      <Outlet />
    </ThemedLayout>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authenticator.isAuthenticated(request);
  const pathname = new URL(request.url).pathname;

  let to = "";
  // ignore only `/` routes
  if (pathname !== "/") {
    to = `?to=${pathname}`;
  }

  if (!session) {
    return redirect(`/login${to}`);
  }

  return {};
};
