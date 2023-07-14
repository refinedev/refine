import React from "react";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
import { Tags } from "@site/src/components/blog";

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
                            const hash = `#${id}`;
                            if (hash !== window.location.hash) {
                                onIdChange(id);
                                if (typeof window !== "undefined") {
                                    window.history.replaceState(
                                        undefined,
                                        undefined,
                                        hash,
                                    );
                                }
                            }
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
                "py-2 pr-3",
                activeId === id &&
                    ` dark:bg-gray-700 bg-gray-100 text-gray-900 dark:text-gray-0 hover:text-gray-900`,
                activeId !== id &&
                    `dark:text-gray-500 hover:text-gray-900 text-gray-500`,
                "rounded-lg",
                "transition-colors duration-200 ease-in-out",
                "block",
                "text-sm",
                "leading-6",
                "no-underline hover:no-underline",
            )}
            dangerouslySetInnerHTML={{
                __html: value,
            }}
        />
    );
};

export const BlogTOC = (props) => {
    const { toc, hasTOC, activeId, setActiveId } = useTOC(props.toc);

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
                "blog-md:py-16",
                "border-l dark:border-l-gray-700 border-l-gray-100",
                !hasTOC && "invisible",
            )}
        >
            <Tags />
            <ul className="list-none m-0 p-0">
                {toc.map((item) => {
                    return (
                        <li key={item.id}>
                            <BlogTOCItem
                                id={item.id}
                                value={item.value}
                                activeId={activeId}
                                level={item.level}
                                onIdChange={(id) => {
                                    setActiveId(id);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
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
