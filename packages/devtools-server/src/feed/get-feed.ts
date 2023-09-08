import fs from "fs";
import matter from "gray-matter";
import { FEED_MD_URL } from "src/constants";

export type Section = {
    content: string;
    // frontmatter
    title: string;
    featured?: boolean;
    date: string;
    author: string;
    avatar: string;
    cover?: string;
};

const splitSections = (feed: string) => {
    const sections = feed.split("---section");

    return sections.slice(1).map((section) => `---section${section}`);
};

const parseSection = (section: string): Section => {
    const parsed = matter(section.replace("---section", "---"));

    return {
        ...parsed.data,
        content: parsed.content,
    } as Section;
};

const fetchFeed = async () => {
    if (__DEVELOPMENT__) {
        return fs.readFileSync("FEED.md", { encoding: "utf-8" });
    }
    const response = await fetch(FEED_MD_URL);

    return response.text();
};

export const getFeed = async () => {
    try {
        const rawContent = await fetchFeed();
        const rawSections = splitSections(rawContent);
        const sections = rawSections.map(parseSection);

        return sections;
    } catch (e) {
        return [];
    }
};
