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
    return (
        <BlogLayout showSidebarBanner={false} sidebar={sidebar}>
            <div
                className={clsx(
                    "py-8",
                    "blog-md:py-16",
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
                <TagsList tags={tags} />
                <div className={clsx("pt-0 blog-md:pt-16")}>
                    <div className="text-gray-500 dark:text-gray-400">
                        Posts tagged with
                    </div>
                    <h1 className="!mb-0">{tag.label}</h1>
                </div>
                <BlogPostItems
                    items={items}
                    showTitle={false}
                    isTagsPage={true}
                />
                <div className="blog-md:border-t border-t-gray-200 dark:border-t-gray-700">
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
