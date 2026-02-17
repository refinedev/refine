import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogDetails from "@site/src/refine-theme/blog-details";
import CommonDetails from "@site/src/refine-theme/common-details";

const BLOG_PATH_REGEX = /(^|\/)blog(\/|$)/;

export default function Details(props: any) {
  const { pathname = "" } = useLocation();
  const isBlogRoute = BLOG_PATH_REGEX.test(pathname);

  if (isBlogRoute) {
    return <BlogDetails {...props} />;
  }

  return <CommonDetails {...props} />;
}
