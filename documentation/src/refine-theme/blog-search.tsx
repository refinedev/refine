import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React from "react";

type BlogSearchItem = {
  title: string;
  summary?: string;
  permalink: string;
  tags: string[];
};

type BlogFeedItem = {
  title?: string;
  summary?: string;
  url?: string;
  id?: string;
  tags?: string[];
};

type BlogFeed = {
  items?: BlogFeedItem[];
};

type BlogSearchProps = {
  CustomButton: React.ComponentType<any>;
};

const MAX_RESULTS = 8;

export const BlogSearch = ({ CustomButton }: BlogSearchProps) => {
  const feedUrl = useBaseUrl("/blog/feed.json");
  const history = useHistory();

  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<BlogSearchItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = React.useMemo(() => {
    if (!normalizedQuery) return [];

    return items
      .filter((item) => {
        const title = item.title.toLowerCase();
        const summary = (item.summary ?? "").toLowerCase();
        const tags = item.tags.join(" ").toLowerCase();

        return (
          title.includes(normalizedQuery) ||
          summary.includes(normalizedQuery) ||
          tags.includes(normalizedQuery)
        );
      })
      .slice(0, MAX_RESULTS);
  }, [items, normalizedQuery]);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || isLoaded || isLoading) return;

    const controller = new AbortController();
    setIsLoading(true);

    fetch(feedUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load blog feed.");
        }

        return response.json() as Promise<BlogFeed>;
      })
      .then((feed) => {
        const loadedItems = (feed.items ?? [])
          .map((item) => {
            const permalink = normalizeBlogPermalink(item.url ?? item.id ?? "");

            if (!permalink || !item.title) return null;

            return {
              title: item.title,
              summary: item.summary,
              permalink,
              tags: Array.isArray(item.tags) ? item.tags : [],
            } as BlogSearchItem;
          })
          .filter(Boolean) as BlogSearchItem[];

        setItems(loadedItems);
        setIsLoaded(true);
      })
      .catch((error) => {
        if (error?.name === "AbortError") return;
        setItems([]);
        setIsLoaded(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [feedUrl, isLoaded, isLoading, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal, isOpen]);

  const openResult = React.useCallback(
    (permalink: string) => {
      history.push(permalink);
      closeModal();
      setQuery("");
    },
    [closeModal, history],
  );

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const firstResult = filteredItems[0];

      if (firstResult) {
        openResult(firstResult.permalink);
      }
    },
    [filteredItems, openResult],
  );

  return (
    <>
      <CustomButton onClick={openModal} />

      {isOpen && (
        <div
          className={clsx(
            "fixed inset-0 z-[200]",
            "bg-black/60 backdrop-blur-[2px]",
            "px-4 py-8",
          )}
          onClick={closeModal}
        >
          <div
            className={clsx(
              "mx-auto mt-8 w-full max-w-[720px]",
              "rounded-2xl border border-zinc-200 bg-white p-3",
              "dark:border-zinc-800 dark:bg-zinc-950",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <form
              onSubmit={onSubmit}
              className={clsx(
                "flex h-11 items-center gap-2 rounded-lg border",
                "border-zinc-200 px-3",
                "dark:border-zinc-800",
              )}
            >
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search blog"
                className={clsx(
                  "h-full w-full bg-transparent outline-none",
                  "text-sm font-normal leading-5 tracking-[-0.007em]",
                  "text-zinc-900 dark:text-zinc-100",
                  "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                )}
              />
            </form>

            <div
              className={clsx(
                "mt-3 max-h-[60vh] overflow-y-auto rounded-lg border",
                "border-zinc-200 dark:border-zinc-800",
              )}
            >
              {isLoading && (
                <div className={clsx("px-4 py-3 text-sm text-zinc-500")}>
                  Loading...
                </div>
              )}

              {!isLoading && !normalizedQuery && (
                <div className={clsx("px-4 py-3 text-sm text-zinc-500")}>
                  Type to search blog posts
                </div>
              )}

              {!isLoading && normalizedQuery && filteredItems.length === 0 && (
                <div className={clsx("px-4 py-3 text-sm text-zinc-500")}>
                  No blog posts found
                </div>
              )}

              {!isLoading &&
                filteredItems.map((item) => (
                  <Link
                    key={item.permalink}
                    to={item.permalink}
                    onClick={() => openResult(item.permalink)}
                    className={clsx(
                      "block border-b border-zinc-200 px-4 py-3",
                      "last:border-b-0",
                      "dark:border-zinc-800",
                      "no-underline hover:no-underline",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                    )}
                  >
                    <div
                      className={clsx(
                        "text-sm font-medium leading-5 tracking-[-0.007em]",
                        "text-zinc-900 dark:text-zinc-100",
                      )}
                    >
                      {item.title}
                    </div>
                    {item.summary && (
                      <div
                        className={clsx(
                          "mt-1 line-clamp-2 text-xs leading-4",
                          "text-zinc-500 dark:text-zinc-400",
                        )}
                      >
                        {item.summary}
                      </div>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const normalizeBlogPermalink = (url: string) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/, "");

    return normalizedPath || "/";
  } catch {
    return url;
  }
};
