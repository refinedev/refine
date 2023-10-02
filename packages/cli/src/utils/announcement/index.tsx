import React from "react";
import { render } from "ink";
import matter from "gray-matter";

import { Announcement } from "@definitions/announcement";
import AnnouncementMessage from "@components/announcement-message";

const ANNOUNCEMENT_URL =
    "https://raw.githubusercontent.com/refinedev/refine/next/packages/cli/ANNOUNCEMENTS.md";

const ANNOUNCEMENT_DELIMITER = "---announcement";

const splitAnnouncements = (feed: string) => {
    const sections = feed.split(ANNOUNCEMENT_DELIMITER);

    return sections
        .slice(1)
        .map((section) => `${ANNOUNCEMENT_DELIMITER}${section}`);
};

const parseAnnouncement = (raw: string): Announcement => {
    const fixed = raw.replace(ANNOUNCEMENT_DELIMITER, "---");
    const parsed = matter(fixed);

    return {
        ...parsed.data,
        content:
            parsed.content.length === 0
                ? fixed.replace(/---/g, "")
                : parsed.content.replace(/---/g, ""),
    } as Announcement;
};

export const getAnnouncements = async () => {
    try {
        const response = await fetch(ANNOUNCEMENT_URL)
            .then((res) => res.text())
            .catch(() => "");

        const announcements = splitAnnouncements(response).map((section) =>
            parseAnnouncement(section),
        );

        return announcements;
    } catch (_) {
        return [];
    }
};

export const handleAnnouncements = async () => {
    const announcements = await getAnnouncements();

    const visibleAnnouncements = announcements.filter(
        (a) => Boolean(a.hidden) === false,
    );

    if (visibleAnnouncements.length === 0) {
        return;
    }

    const { unmount } = render(
        <AnnouncementMessage announcements={visibleAnnouncements} />,
    );

    unmount();
};
