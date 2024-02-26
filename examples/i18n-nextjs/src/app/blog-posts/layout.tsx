import { ThemedLayout } from "@components/themed-layout";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  return <ThemedLayout>{children}</ThemedLayout>;
}
