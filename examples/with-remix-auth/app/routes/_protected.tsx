import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { authenticator } from "~/utils/auth.server";

export default function AuthenticatedLayout() {
  // `<ThemedLayoutV2>` is only applied if the user is authenticated
  return (
    <ThemedLayoutV2>
      <Outlet />
    </ThemedLayoutV2>
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
