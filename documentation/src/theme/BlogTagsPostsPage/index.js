import React from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    usePluralForm,
} from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

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

function BlogTagsPostsPageContent({ tag, items, sidebar, listMetadata }) {
    const title = useBlogTagsPostsPageTitle(tag);

    return (
        <BlogLayout sidebar={sidebar}>
            <header className="margin-bottom--lg">
                <h1 className="font-montserrat">{title}</h1>

                <Link
                    href={tag.allTagsPath}
                    className="uppercase all-tags-button text-white font-extrabold p-2 rounded-[10px] inline-flex items-center"
                >
                    <Translate
                        id="theme.tags.tagsPageLink"
                        description="The label of the link targeting the tag list page"
                    >
                        View All Tags
                    </Translate>
                </Link>
            </header>
            <BlogPostItems items={items} />
            <br />
            <BlogListPaginator
                metadata={listMetadata}
                basePath={`/blog/tags/${tag.label}`}
            />
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
