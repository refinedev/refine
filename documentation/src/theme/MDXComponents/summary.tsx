import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogSummary from "@site/src/refine-theme/blog-summary";
import CommonSummary from "@site/src/refine-theme/common-summary";

const BLOG_PATH_REGEX = /(^|\/)blog(\/|$)/;

export default function Summary(props: any) {
  const { pathname = "" } = useLocation();
  const isBlogRoute = BLOG_PATH_REGEX.test(pathname);

  if (isBlogRoute) {
    return <BlogSummary {...props} />;
  }

  return <CommonSummary {...props} />;
}
