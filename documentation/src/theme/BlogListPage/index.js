import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import BlogListPaginator from "@theme/BlogListPaginator";
import { Breadcrumbs } from "@site/src/components/breadcrumbs";

import { FeaturedBlogPostItems } from "../../components/blog";

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, page, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const baseTitle = isBlogOnlyMode ? siteTitle : blogTitle;
  const isPaginated = typeof page === "number" && page > 1;
  const title = isPaginated ? `${baseTitle} - Page ${page}` : baseTitle;
  const description = isPaginated
    ? `${blogDescription} - Page ${page}`
    : blogDescription;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </Head>
      <PageMetadata description={description} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, tags, items } = props;

  const isFirstPage = metadata.page === 1;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const featuredPosts = items.filter(
    (post) => post.content.metadata.frontMatter.is_featured === true,
  );

  const paginatedPosts = items.filter(
    (post) => post.content.metadata.frontMatter.is_featured !== true,
  );

  return (
    <BlogLayout showSidebarBanner={false} showHero>
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
