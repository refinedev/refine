"use client";

import { Suspense } from "react";

import { NavigateToResource } from "@refinedev/nextjs-router/app";

export default function IndexPage() {
  return (
    <Suspense>
      <NavigateToResource />
    </Suspense>
  );
}
