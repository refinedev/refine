import React from "react";
import clsx from "clsx";
import { useLocation, useHistory } from "@docusaurus/router";
import { Tags } from "@site/src/components/blog";

export const BlogTOC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { toc, hasTOC, activeId, setActiveId } = useTOC(props.toc);

  const onIdChange = (id) => {
    if (id !== `${location.hash ?? ""}`.replace("#", "")) {
      setActiveId(id);
      window.history.replaceState({}, "", `#${id}`);
    }
  };

  return (
    <div
      className={clsx(
        "hidden blog-md:block",
        "w-full",
        "sticky right-0 top-[67px]",
        "max-w-[280px]",
        "overflow-auto",
        "h-[calc(100vh-67px)]",
        "px-3",
        "pb-10",
        "pt-4 blog-lg:pt-9",
        "border-l border-l-gray-200 dark:border-l-zinc-700 ",
        !hasTOC && "invisible",
        "not-prose",
      )}
    >
      <Tags />
      <ul className="list-none m-0 p-0 pt-10 mt-1 not-prose space-y-1">
        {toc.map((item) => {
          return (
            <li key={item.id}>
              <BlogTOCItem
                id={item.id}
                value={item.value}
                activeId={activeId}
                level={item.level}
                onIdChange={onIdChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const BlogTOCItem = ({
  id,
  value,
  level,
  activeId,
  onIdChange,
}: {
  id: string;
  value: string;
  level: number;
  activeId: string;
  onIdChange?: (id: string) => void;
}) => {
  React.useEffect(() => {
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIdChange(id);
            }
          });
        },
        {
          rootMargin: "0px 0px -80% 0px",
        },
      );

      observer.observe(targetElement);

      return () => {
        observer.unobserve(targetElement);
      };
    }
  }, [id]);

  const isActive = activeId === id;

  return (
    <a
      href={`#${id}`}
      className={clsx(
        "refine-toc-item",
        "py-2 pr-4",
        level === 2 && "pl-4",
        level === 3 && "pl-6",
        level === 4 && "pl-8",
        level === 5 && "pl-8",
        isActive && "bg-zinc-200 dark:bg-zinc-700",
        isActive && "text-zinc-900 dark:text-white",
        !isActive && "text-zinc-700 dark:text-zinc-300",
        !isActive && "hover:bg-zinc-100 dark:hover:bg-[#303035]",
        "hover:text-zinc-900 dark:hover:text-white",
        "rounded-md",
        "block",
        "text-sm",
        "no-underline hover:no-underline",
        "transition-colors duration-200 ease-in-out",
        "tracking-[-0.07em]",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  );
};

export const useTOC = (toc) => {
  const { hash } = useLocation();

  const baseActiveId = `${hash}`.replace("#", "");

  const [activeId, setActiveId] = React.useState<string | undefined>(
    baseActiveId,
  );

  React.useEffect(() => {
    setActiveId(baseActiveId);
  }, [baseActiveId]);

  const hasTOC = toc?.length > 0;

  return {
    toc,
    activeId,
    setActiveId,
    hasTOC,
  };
};
