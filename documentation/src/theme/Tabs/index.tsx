import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogTabs from "@site/src/refine-theme/blog-tabs";
import CommonTabs from "@site/src/refine-theme/common-tabs";

const BLOG_PATH_REGEX = /(^|\/)blog(\/|$)/;

export default function Tabs(props) {
  const { pathname = "" } = useLocation();
  const isBlogRoute = BLOG_PATH_REGEX.test(pathname);

  if (isBlogRoute) {
    return <BlogTabs {...props} />;
  }

  return <CommonTabs {...props} />;
}
