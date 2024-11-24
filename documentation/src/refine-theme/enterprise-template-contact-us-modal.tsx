import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { CloseCircleIcon } from "./icons/close-circle";
import { EnterpriseGetInTouchButton } from "./enterprise-get-in-touch-button";
import { CommonThemedImage } from "./common-themed-image";

type Props = {
  title: string;
  utmMedium: string;
  open: boolean;
  onClose: () => void;
};

export const EnterpriseTemplateContactUsModal = ({
  title,
  utmMedium,
  open,
  onClose,
}: Props) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-modal" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-gray-900/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full my-auto",
                  "flex flex-col justify-center items-center",
                )}
              >
                <div
                  className={clsx(
                    "relative",
                    "flex",
                    "flex-col-reverse landing-md:flex-row",
                    "justify-center landing-md:justify-between",
                    "items-center",
                    "gap-6",
                    "w-full",
                    "max-w-[320px] landing-sm:max-w-[520px] landing-md:max-w-[840px]",
                    "dark:bg-gray-700 bg-white",
                    "shadow-enterprise-modal",
                    "py-9 landing-md:py-14",
                    "px-9",
                    "rounded-3xl",
                    "not-prose",
                  )}
                >
                  <button
                    className={clsx(
                      "absolute",
                      "top-2 right-2",
                      "dark:text-gray-500 text-gray-400",
                    )}
                    onClick={onClose}
                  >
                    <CloseCircleIcon />
                  </button>
                  <div
                    className={clsx(
                      "not-prose",
                      "max-w-[486px]",
                      "flex",
                      "items-center landing-md:items-start",
                      "text-center landing-md:text-start",
                      "flex-col",
                      "gap-6",
                    )}
                  >
                    <h2
                      className={clsx(
                        "text-xl",
                        "font-semibold",
                        "dark:text-white text-gray-900",
                      )}
                    >
                      {title}
                    </h2>
                    <p
                      className={clsx(
                        "text-base",
                        "dark:text-gray-300 text-gray-600",
                      )}
                    >
                      The source code of this project is exclusive to Refine's{" "}
                      <a
                        href="https://refine.dev/enterprise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                          "dark:text-refine-link-dark text-refine-link-light",
                          "underline",
                        )}
                      >
                        Enterprise Edition
                      </a>
                      . For more information please:
                    </p>
                    <EnterpriseGetInTouchButton
                      variant="default"
                      utmMedium={utmMedium}
                    />
                  </div>
                  <CommonThemedImage
                    className={clsx(
                      "block",
                      "landing-md:mr-8",
                      "h-[180px] w-[180px]",
                    )}
                    srcDark="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/enterprise-hero-image-dark.png"
                    srcLight="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/enterprise-hero-image-light.png"
                    alt="refine enterprise image"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
