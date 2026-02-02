import React from "react";
import BlogLayout from "@theme/BlogLayout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PageMetadata } from "@docusaurus/theme-common";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

import { AuthorCardWithProps } from "@site/src/components/blog";
import { Breadcrumbs } from "@site/src/components/breadcrumbs";
import clsx from "clsx";

const BlogListPageMetadata = () => {
  const {
    siteConfig: { title, tagline },
  } = useDocusaurusContext();
  return (
    <>
      <PageMetadata title={title} description={tagline} />
      <SearchMetadata tag="author_blog_posts_list" />
    </>
  );
};

const AuthorPage = (props) => {
  const { items } = props;

  const author = items[0].content.metadata.authors[0];
  const authorHref = author?.key ? `/blog/author/${author.key}` : undefined;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: author?.name ?? "Author", href: authorHref },
  ];

  return (
    <>
      <BlogListPageMetadata />
      <BlogLayout showSidebarBanner={false}>
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
        <div className="h-8" />
        <AuthorCardWithProps author={author} />
        <div
          className={clsx(
            "px-4",
            "max-w-[512px]",
            "blog-md:px-7",
            "blog-md:max-w-screen-blog-md",
            "blog-2xl:px-0",
            "blog-2xl:max-w-screen-blog-md",
            "w-full",
            "mx-auto",
          )}
        >
          <h1 className="text-4xl !mb-0 px-0 lg:px-4">Posts</h1>
        </div>
        <div className={clsx("px-4", "blog-md:px-7", "blog-2xl:px-0")}>
          <BlogPostItems items={items} showTitle={false} isAuthorPage={true} />
        </div>
      </BlogLayout>
    </>
  );
};

export default AuthorPage;
