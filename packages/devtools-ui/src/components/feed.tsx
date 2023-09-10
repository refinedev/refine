import React from "react";
import clsx from "clsx";
import type { Feed as FeedType } from "@refinedev/devtools-shared";
import { FeedItem } from "src/components/feed-item";

export const Feed = () => {
    const [feed, setFeed] = React.useState<FeedType | null>(null);

    const fetchFeed = React.useCallback(async () => {
        try {
            const response = await fetch("api/feed");
            const { data } = (await response.json()) as {
                data: FeedType | null;
            };
            setFeed(data);
        } catch (error) {
            //
        }
    }, []);

    React.useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    return (
        <div
            className={clsx(
                "re-flex-1",
                "re-flex",
                "re-flex-col",
                "re-gap-8",
                "re-h-full",
                "re-w-full",
                "large:re-max-w-[380px]",
                "re-justify-center",
                "re-overflow-auto",
                "re-mx-auto",
            )}
        >
            <div
                className={clsx(
                    "re-text-sm",
                    "re-leading-6",
                    "re-text-gray-0",
                    "re-font-semibold",
                )}
            >
                Updates from the refine team
            </div>
            {feed?.map((item, index) => (
                <FeedItem key={index} item={item} />
            ))}
            <div className="re-h-px re-w-full re-flex-shrink-0" />
        </div>
    );
};
