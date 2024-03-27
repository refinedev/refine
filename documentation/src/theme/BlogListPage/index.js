import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import BlogListPaginator from "@theme/BlogListPaginator";

import { FeaturedBlogPostItems } from "../../components/blog";

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, tags, items } = props;

  const isFirstPage = metadata.page === 1;

  const featuredPosts = items.filter(
    (post) => post.content.metadata.frontMatter.is_featured === true,
  );

  const paginatedPosts = items.filter(
    (post) => post.content.metadata.frontMatter.is_featured !== true,
  );

  return (
    <BlogLayout showSidebarBanner={false} showHero>
      {isFirstPage && <FeaturedBlogPostItems items={featuredPosts} />}
      <BlogPostItems items={paginatedPosts} tags={tags} metadata={metadata} />
      <div
        className={clsx(
          "w-full",
          "mx-auto",
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[656px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "blog-max:border-t border-t-refine-react-3 dark:border-t-refine-react-7",
          "mb-12",
        )}
      >
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
