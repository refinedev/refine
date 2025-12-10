import React from "react";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { ScrollToTopButton } from "@site/src/components/scroll-to-top";

export default function Layout(props) {
  return (
    <>
      <CommonLayout {...props} />
      <ScrollToTopButton />
    </>
  );
}
