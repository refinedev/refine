import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogTabItem from "@site/src/refine-theme/blog-tab-item";
import CommonTabItem from "@site/src/refine-theme/common-tab-item";

const BLOG_PATH_REGEX = /(^|\/)blog(\/|$)/;

export default function TabItem(props) {
  const { pathname = "" } = useLocation();
  const isBlogRoute = BLOG_PATH_REGEX.test(pathname);

  if (isBlogRoute) {
    return <BlogTabItem {...props} />;
  }

  return <CommonTabItem {...props} />;
}
