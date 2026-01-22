import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import { ChevronRightIcon } from "@site/src/refine-theme/icons/chevron-right";
import { HomeIcon } from "@site/src/refine-theme/icons/home";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
};

const toAbsoluteUrl = (siteUrl: string, href: string) => {
  try {
    const url = new URL(href, siteUrl);
    // Ensure trailing slash so breadcrumb items align with canonical URLs.
    if (!url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }
    return url.toString();
  } catch {
    return href.endsWith("/") ? href : `${href}/`;
  }
};

/**
 * Emits JSON-LD BreadcrumbList markup so search engines can display breadcrumb
 * paths in SERP results.
 */
export const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const { siteConfig } = useDocusaurusContext();

  const itemListElement = React.useMemo(() => {
    return items.map((item, index): BreadcrumbListItem => {
      const listItem: BreadcrumbListItem = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };

      if (item.href) {
        listItem.item = toAbsoluteUrl(siteConfig.url, item.href);
      }

      return listItem;
    });
  }, [items, siteConfig.url]);

  if (!items.length) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <Head>
      {/* Search engines use this to render breadcrumb paths in SERP results. */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  listClassName?: string;
  showJsonLd?: boolean;
};

export const Breadcrumbs = ({
  items,
  className,
  listClassName,
  showJsonLd = true,
}: BreadcrumbsProps) => {
  if (!items.length) {
    return null;
  }

  const normalizedItems = items.map((item) => {
    if (item.label.toLowerCase() === "home") {
      return { ...item, href: "/core/" };
    }

    return item;
  });

  return (
    <nav
      className={clsx(
        "refine-breadcrumbs",
        "not-prose",
        "pb-4",
        "z-10",
        className,
      )}
      aria-label="Breadcrumbs"
    >
      {showJsonLd && <BreadcrumbJsonLd items={normalizedItems} />}
      <ul
        className={clsx(
          "breadcrumbs",
          "flex flex-wrap items-center",
          listClassName,
        )}
      >
        {normalizedItems.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && item.label.toLowerCase() === "home";

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex flex-row flex-nowrap items-center z-10"
            >
              {index > 0 && (
                <ChevronRightIcon className="text-zinc-300 dark:text-zinc-400" />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={clsx(
                    "text-zinc-500 dark:text-zinc-400",
                    "text-base",
                    "z-10",
                  )}
                >
                  {isHome ? (
                    <>
                      <HomeIcon className="text-zinc-500 dark:text-zinc-400" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast
                      ? "text-zinc-400 dark:text-zinc-300"
                      : "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {isHome ? (
                    <>
                      <HomeIcon className="text-zinc-500 dark:text-zinc-400" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
