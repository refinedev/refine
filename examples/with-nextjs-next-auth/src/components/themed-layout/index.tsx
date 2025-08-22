"use client";

import { Header } from "@components/header";
import { ThemedLayout } from "@refinedev/antd";
import React from "react";

export const ThemedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayout Header={() => <Header sticky />}>{children}</ThemedLayout>
  );
};
