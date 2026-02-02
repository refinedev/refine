import React from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import TagsList from "@theme/TagsList";
import { Breadcrumbs } from "@site/src/components/breadcrumbs";

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.blog.post.plurals",
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One post|{count} posts",
        },
        { count },
      ),
    );
}

function useBlogTagsPostsPageTitle(tag) {
  const blogPostsPlural = useBlogPostsPlural();
  return translate(
    {
      id: "theme.blog.tagTitle",
      description: "The title of the page for a blog tag",
      message: '{nPosts} tagged with "{tagName}"',
    },
    { nPosts: blogPostsPlural(tag.count), tagName: tag.label },
  );
}

function BlogTagsPostsPageMetadata({ tag }) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({ tags, tag, items, sidebar, listMetadata }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tags", href: "/blog/tags" },
    { label: tag.label, href: tag.permalink },
  ];

  return (
    <BlogLayout showSidebarBanner={false} sidebar={sidebar}>
      <div className={clsx("py-8", "blog-md:py-16", "w-full", "mx-auto")}>
        <Breadcrumbs
          items={breadcrumbItems}
          className={clsx(
            "px-4",
            "blog-sm:max-w-[592px]",
            "blog-md:max-w-[656px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
            "w-full",
            "mx-auto",
          )}
        />
        <div
          className={clsx(
            "flex",
            "px-4",
            "gap-6",
            "flex-row blog-lg:flex-col",
            "justify-between",
            "blog-sm:max-w-[592px]",
            "blog-md:max-w-[656px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
            "w-full",
          )}
        >
          <TagsList tags={tags} />
        </div>
        <div className={clsx("pt-8 blog-md:pt-16", "px-4")}>
          <div className="text-gray-500 dark:text-gray-400">
            Posts tagged with
          </div>
          <h1 className="!mb-0">{tag.label}</h1>
        </div>
        <BlogPostItems items={items} showTitle={false} isTagsPage={true} />
        <div
          className={clsx(
            listMetadata.totalPages > 1 &&
              "blog-md:border-t border-t-gray-200 dark:border-t-gray-700",
          )}
        >
          <BlogListPaginator
            metadata={listMetadata}
            basePath={`/blog/tags/${tag.label}`}
          />
        </div>
      </div>
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
