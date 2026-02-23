import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";

const DEFAULT_FAVICON_PATH = "/assets/favicon.svg";
const BLOG_FAVICON_PATH = "/assets/favicon-blog.svg";
const BLOG_ROUTE_PREFIX = "/blog";

const isBlogRoute = (pathname = "") =>
  pathname === BLOG_ROUTE_PREFIX ||
  pathname.startsWith(`${BLOG_ROUTE_PREFIX}/`);

const upsertFaviconLink = (rel: "icon" | "shortcut icon", href: string) => {
  let faviconLink = document.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!faviconLink) {
    faviconLink = document.createElement("link");
    faviconLink.setAttribute("rel", rel);
    document.head.appendChild(faviconLink);
  }

  faviconLink.setAttribute("type", "image/svg+xml");
  faviconLink.setAttribute("href", href);
};

const useRouteFavicon = () => {
  const { pathname = "" } = useLocation();

  useEffect(() => {
    const faviconPath = isBlogRoute(pathname)
      ? BLOG_FAVICON_PATH
      : DEFAULT_FAVICON_PATH;

    upsertFaviconLink("icon", faviconPath);
    upsertFaviconLink("shortcut icon", faviconPath);
  }, [pathname]);
};

export default useRouteFavicon;
