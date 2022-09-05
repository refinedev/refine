import React from "react";
import Link from "@docusaurus/Link";
import { usePluralForm } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";

function useReadingTimePlural() {
    const { selectMessage } = usePluralForm();
    return (readingTimeFloat) => {
        const readingTime = Math.ceil(readingTimeFloat);
        return selectMessage(
            readingTime,
            translate(
                {
                    id: "theme.blog.post.readingTime.plurals",
                    description:
                        'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                    message: "One min read|{readingTime} min read",
                },
                { readingTime },
            ),
        );
    };
}

function ReadingTime({ readingTime }) {
    const readingTimePlural = useReadingTimePlural();
    return <>{readingTimePlural(readingTime)}</>;
}

function Date({ date, formattedDate }) {
    return (
        <time dateTime={date} itemProp="datePublished">
            {formattedDate}
        </time>
    );
}

function Spacer() {
    return <>{" · "}</>;
}

export const PostPaginator = ({ posts, title }) => {
    return (
        <div className="blog-post-item-shadow p-4 rounded-[10px]">
            <h2 className="mb-4 uppercase font-montserrat">{title}</h2>
            <div className="grid grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="blog-paginator-item p-4 rounded-2xl min-h-[150px] bg-[#f6f6f9] flex flex-col justify-between gap-4 font-montserrat transition duration-150 ease-in-out"
                    >
                        <figcaption className="flex justify-center items-center space-x-2">
                            <Link
                                to={`/blog/author/${post.authors[0]?.key}`}
                                itemProp="url"
                                className="self-end"
                            >
                                <img
                                    src={post.authors[0]?.imageURL}
                                    alt={post.authors[0]?.name}
                                    className="flex w-8 h-8 rounded-full object-cover"
                                    loading="lazy"
                                />
                            </Link>
                            <div>
                                <Link
                                    to={`/blog/author/${post.authors[0]?.key}`}
                                    itemProp="url"
                                    id="author-name"
                                    className="text-sm text-color-base font-semibold"
                                >
                                    {post.authors[0]?.name}
                                </Link>
                                <div
                                    id="author-title"
                                    className="text-xs text-[#525860] -mt-1.5 transition duration-150 ease-in-out"
                                >
                                    {post.authors[0]?.title}
                                </div>
                            </div>
                        </figcaption>
                        <Link
                            id="post-title"
                            to={post.permalink}
                            className="text-center font-bold text-[#2A2A42]"
                        >
                            {post.title}
                        </Link>
                        <div
                            id="post-info"
                            className="mb-2 text-sm text-[#525860] text-center transition duration-150 ease-in-out"
                        >
                            <Date
                                date={post.date}
                                formattedDate={post.formattedDate}
                            />
                            {typeof post.readingTime !== "undefined" && (
                                <>
                                    <Spacer />
                                    <ReadingTime
                                        readingTime={post.readingTime}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
