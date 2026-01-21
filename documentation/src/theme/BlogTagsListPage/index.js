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
        <div
          className={clsx(
            "w-full",
            "mx-auto",
            "blog-sm:max-w-[592px]",
            "blog-md:max-w-[656px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
            "px-6 blog-sm:px-0",
            "pt-6 pb-12",
            "not-prose",
          )}
        >
          <Breadcrumbs items={breadcrumbItems} />
          <div className={clsx("mt-6", "flex", "flex-col", "gap-3")}>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Blog Tags
            </span>
            <h1 className="text-3xl blog-sm:text-4xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[640px]">
              Browse posts by topic and jump straight into the areas that matter
              most.
            </p>
          </div>
          <TagsList tags={tags} variant="page" className="mt-8" />
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
