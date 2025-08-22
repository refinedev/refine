import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Header } from "@components/header";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  return <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
