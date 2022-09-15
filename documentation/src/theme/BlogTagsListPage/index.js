import React from "react";
import clsx from "clsx";
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    translateTagsPageTitle,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import TagsListByLetter from "@theme/TagsListByLetter";
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
            <BlogLayout sidebar={sidebar}>
                <h1 className="font-montserrat">{title}</h1>
                <TagsListByLetter tags={tags} />
            </BlogLayout>
        </HtmlClassNameProvider>
    );
}
