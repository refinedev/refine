import React from "react";
import clsx from "clsx";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import TagsList from "@theme/TagsList";
import SearchMetadata from "@theme/SearchMetadata";
import { Breadcrumbs } from "@site/src/components/breadcrumbs";

export default function BlogTagsListPage({ tags, sidebar }) {
  const title = translateTagsPageTitle();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tags", href: "/blog/tags" },
  ];
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout showSidebarBanner={false} sidebar={sidebar}>
        <Breadcrumbs
          items={breadcrumbItems}
          className={clsx(
            "w-full",
            "mx-auto",
            "blog-sm:max-w-[592px]",
            "blog-md:max-w-[656px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
            "px-6 blog-sm:px-0",
            "pt-6",
          )}
        />
        <h1 className="">{title}</h1>
        <TagsList tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
