"use client";

import dynamic from "next/dynamic";

const BaseExample = dynamic(
  () =>
    import("../../../examples/base-example/app").then((mod) => mod.BaseExample),
  {
    ssr: false,
  },
);

export default function BaseExamplePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <BaseExample />
    </div>
  );
}
