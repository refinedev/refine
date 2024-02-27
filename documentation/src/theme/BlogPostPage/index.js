import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import { BlogTOC } from "../../refine-theme/blog-toc";

import { BlogPostPageView, PostPaginator } from "../../components/blog";

function BlogPostPageContent({ children }) {
  const { metadata, toc } = useBlogPost();
  const { relatedPosts } = metadata;

  return (
    <BlogLayout toc={<BlogTOC toc={toc} />}>
      <BlogPostPageView>{children}</BlogPostPageView>
      <PostPaginator title="Related Articles" posts={relatedPosts} />
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
