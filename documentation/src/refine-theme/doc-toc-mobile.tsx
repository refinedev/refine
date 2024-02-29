import React from "react";
import clsx from "clsx";
import { useTOC } from "./doc-toc";
import { Disclosure, Transition } from "@headlessui/react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const DocTOCMobile = () => {
  const { hasTOC, activeId, toc } = useTOC();

  if (!hasTOC) {
    return null;
  }

  return (
    <div
      className={clsx(
        "xl:hidden block w-full mb-10",
        "max-w-screen-content-sm",
      )}
    >
      <Disclosure>
        {({ open }) => (
          <div
            className={clsx(
              "rounded-lg",
              "border gray-300 dark:border-gray-700",
              "bg-gray-100 dark:bg-gray-700",
            )}
          >
            <Disclosure.Button
              className={clsx("w-full", "flex items-center gap-2", "px-2 py-2")}
            >
              <TriangleDownIcon
                className={clsx(
                  "h-5 w-5",
                  "text-gray-500",
                  "transition-transform duration-200 ease-in-out",
                  {
                    "transform -rotate-90": !open,
                  },
                )}
              />
              <span
                className={clsx(
                  "text-base",
                  "text-gray-800 dark:text-gray-100",
                )}
              >
                On this page
              </span>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-y-95"
              enterTo="transform opacity-100 scale-y-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-y-100"
              leaveTo="transform opacity-0 scale-y-95"
            >
              <Disclosure.Panel className="h-[328px] rounded-bl-lg rounded-br-lg overflow-auto bg-gray-0 dark:bg-gray-800">
                <ul className="p-4">
                  {toc.map(({ id, value, level }) => {
                    const isActive = activeId === id;

                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={clsx(
                          "refine-toc-item",
                          level === 2 && "pl-4",
                          level === 3 && "pl-6",
                          level === 4 && "pl-8",
                          "py-2 pr-4",
                          "rounded-[18px]",
                          "transition-colors duration-200 ease-in-out",
                          "block",
                          "text-sm",
                          "leading-5",
                          "no-underline hover:no-underline",
                          {
                            "text-gray-800 dark:text-gray-300": !isActive,
                            "text-refine-react-light-link dark:text-refine-react-dark-link":
                              isActive,
                            "bg-refine-blue-2-light dark:bg-refine-blue dark:bg-opacity-10":
                              isActive,
                            "hover:bg-gray-100 dark:hover:bg-gray-700":
                              !isActive,
                            "hover:text-gray-800 dark:hover:text-gray-300":
                              !isActive,
                          },
                        )}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                        dangerouslySetInnerHTML={{
                          __html: value,
                        }}
                      />
                    );
                  })}
                </ul>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};
