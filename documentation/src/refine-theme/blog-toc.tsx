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
        "border-l dark:border-l-gray-700 border-l-gray-100",
        !hasTOC && "invisible",
        "not-prose",
      )}
    >
      <Tags />
      <ul className="list-none m-0 p-0 pt-10 mt-1 not-prose">
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

  return (
    <a
      href={`#${id}`}
      className={clsx(
        "refine-toc-item",
        level === 2 && "pl-3",
        level === 3 && "pl-7",
        level === 4 && "pl-11",
        "py-2 pr-4",
        activeId === id && "bg-refine-blue-2-light dark:bg-refine-blue-2/10",
        activeId === id &&
          "text-refine-react-light-link dark:text-refine-react-dark-link",
        activeId !== id && "text-refine-react-8 dark:text-refine-react-3",
        activeId !== id &&
          "hover:bg-refine-blue-2-light/40 hover:dark:bg-refine-blue-2/5",
        activeId !== id &&
          "hover:text-refine-react-light-link hover:dark:text-refine-react-dark-link",
        "rounded-[18px]",
        "transition-colors duration-200 ease-in-out",
        "block",
        "text-sm",
        "leading-6",
        "no-underline hover:no-underline",
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
