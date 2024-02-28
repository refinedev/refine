import { useDoc } from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import React from "react";
import { useHistory, useLocation } from "@docusaurus/router";

export const TOCItem = ({
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
        "py-2 pr-4",
        level === 2 && "pl-4",
        level === 3 && "pl-6",
        level === 4 && "pl-8",
        level === 5 && "pl-8",
        activeId === id &&
          "bg-refine-blue-2-light dark:bg-refine-blue-2 dark:bg-opacity-10",
        activeId === id &&
          "text-refine-react-light-link dark:text-refine-react-dark-link",
        activeId !== id && "text-refine-600 dark:text-refine-300",
        activeId !== id && "hover:bg-gray-100 dark:hover:bg-gray-700",
        activeId !== id && "hover:text-gray-600 dark:hover:text-gray-300",
        "rounded-[18px]",
        "block",
        "text-sm",
        "no-underline hover:no-underline",
        "transition-colors duration-200 ease-in-out",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  );
};

export const DocTOC = () => {
  const location = useLocation();
  const history = useHistory();

  const { toc, hasTOC, activeId, setActiveId } = useTOC();

  const onIdChange = (id) => {
    if (id !== `${location.hash ?? ""}`.replace("#", "")) {
      setActiveId(id);
      // history.replace({
      //     ...location,
      //     hash: `#${id}`,
      // });
      window.history.replaceState({}, "", `#${id}`);
    }
  };

  return (
    <div
      className={clsx(
        "hidden xl:block",
        "w-full",
        "sticky right-0 top-[65px]",
        "max-w-[260px]",
        "overflow-auto",
        "h-[calc(100vh-65px)]",
        "px-4",
        "py-4",
        "border-l border-l-gray-300 dark:border-l-gray-700",
        !hasTOC && "invisible",
      )}
    >
      <ul>
        {toc
          .filter((item) => item.level < 5)
          .map((item) => {
            return (
              <li key={item.id}>
                <TOCItem
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

export const useTOC = () => {
  const { hash } = useLocation();

  const baseActiveId = `${hash}`.replace("#", "");

  const [activeId, setActiveId] = React.useState<string | undefined>(
    baseActiveId,
  );

  React.useEffect(() => {
    setActiveId(baseActiveId);
  }, [baseActiveId]);

  const { toc } = useDoc();

  const hasTOC = toc?.length > 0;

  return {
    toc,
    activeId,
    setActiveId,
    hasTOC,
  };
};
