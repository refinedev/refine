import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import { Feed, FeedSection } from "@refinedev/devtools-shared";

import { FEED_MD_URL } from "src/constants";

const splitSections = (feed: string) => {
    const sections = feed.split("---section");

    return sections.slice(1).map((section) => `---section${section}`);
};

const contentToHtml = (content: string) => {
    const html = marked(content);

    return sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ["src"],
        },
    });
};

const parseSection = (section: string): FeedSection => {
    const parsed = matter(section.replace("---section", "---"));

    return {
        ...parsed.data,
        content: contentToHtml(parsed.content),
    } as FeedSection;
};

const fetchFeed = async () => {
    if (__DEVELOPMENT__) {
        return fs.readFileSync("FEED.md", { encoding: "utf-8" });
    }
    const response = await fetch(FEED_MD_URL);

    return response.text();
};

export const getFeed = async (): Promise<Feed> => {
    try {
        const rawContent = await fetchFeed();
        const rawSections = splitSections(rawContent);
        const sections = rawSections.map(parseSection);

        return sections;
    } catch (e) {
        return [];
    }
};
