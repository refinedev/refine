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

export default function BlogTagsListPage({ tags, sidebar }) {
  const title = translateTagsPageTitle();
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
        <h1 className="">{title}</h1>
        <TagsList tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
