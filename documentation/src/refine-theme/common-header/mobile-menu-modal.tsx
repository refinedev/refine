import Link from "@docusaurus/Link";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { type FC, Fragment, type PropsWithChildren } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { openFigma } from "@site/src/utils/open-figma";
import { CloseIcon } from "../icons/close";
import { GithubStarIcon } from "../icons/popover";
import { RefineLogoIcon } from "../icons/refine-logo";
import { MENU_ITEMS, type NavbarItemType } from "./constants";
import { MenuItem } from "./menu-item";
import { MobileNavItem } from "./mobile-nav-item";
import { TopAnnouncement } from "../top-announcement";
import { DarkModeIcon } from "../icons/dark-mode";
import { LightModeIcon } from "../icons/light-mode";
import { useLocation } from "@docusaurus/router";

type MobileMenuModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const location = useLocation();

  React.useEffect(() => {
    setIsModalOpen(false);
  }, [location]);

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <Tablet
        className={clsx(
          "hidden landing-sm:block",
          "overflow-auto",
          "border border-gray-200 dark:border-gray-700 rounded-lg",
        )}
      />
      <Phone
        className={clsx(
          "block landing-sm:hidden",
          "overflow-auto",
          "border border-gray-200 dark:border-gray-700 rounded-lg",
        )}
      />
    </Modal>
  );
};

const Modal: FC<PropsWithChildren<MobileMenuModalProps>> = ({
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              "fixed inset-0",
              "bg-gray-0 dark:bg-gray-900",
              "flex",
              "flex-col",
            )}
          >
            <TopAnnouncement />
            <div
              className={clsx(
                "flex items-center justify-between",
                "p-4",
                "landing-sm:px-8",
              )}
            >
              <RefineLogoIcon
                className="dark:text-gray-0 text-gray-900"
                onContextMenu={openFigma}
              />
              <button
                type="button"
                className={clsx(
                  "rounded-lg",
                  "hover:brightness-105",
                  "active:scale-90",
                  "transition-transform duration-75 ease-in-out",
                )}
              >
                <CloseIcon
                  className="text-gray-900 dark:text-white"
                  onClick={() => setIsModalOpen(false)}
                />
              </button>
            </div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={clsx("flex-1", "overflow-y-auto", "px-4", "pb-4")}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const Tablet = (props: { className?: string }) => {
  return (
    <div className={clsx(props.className)}>
      {MENU_ITEMS.map((item, i) => {
        const Icon = "icon" in item && item.icon;
        return (
          <div
            key={i}
            className={clsx(
              "not-prose",
              "p-4",
              "border-t dark:border-gray-700 border-gray-200",
            )}
          >
            <Link
              to={"href" in item ? item.href : undefined}
              className={clsx(
                "appearance-none",
                "block",
                "no-underline",
                "dark:text-gray-0 text-gray-900",
                "font-bold",
              )}
            >
              <div className={clsx("flex items-center gap-2")}>
                <div>{item.label}</div>
                {Icon && <Icon />}
              </div>
            </Link>
            {"items" in item && (
              <div
                className={clsx(
                  "mt-2",
                  "grid grid-cols-2 min-[800px]:grid-cols-3",
                  "gap-x-8 gap-y-4",
                )}
              >
                {item.items.map((subItem) => (
                  <MenuItem key={subItem.label} item={subItem} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <ThemeToggle />
      <Github id="tablet" />
    </div>
  );
};

const Phone = (props: { className?: string }) => {
  return (
    <div className={clsx(props.className)}>
      <div className="flex-grow">
        {MENU_ITEMS.map((item) => {
          if (item.isPopover) {
            return (
              <Disclosure key={`modal-${item.label}`}>
                {({ open }) => (
                  <>
                    <MobileNavItem
                      component={Disclosure.Button}
                      label={item.label}
                      open={open}
                    />

                    <Disclosure.Panel
                      className={clsx(
                        open && "pb-4",
                        open && "border-b border-gray-200 dark:border-gray-700",
                      )}
                    >
                      {item.items.map((subItem) => (
                        <MenuItem key={subItem.label} item={subItem} />
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          }

          return (
            <MobileNavItem
              key={`modal-${item.label}`}
              label={item.label}
              href={(item as NavbarItemType).href}
              icon={(item as NavbarItemType).icon}
            />
          );
        })}
      </div>
      <ThemeToggle />
      <Github id="phone" />
    </div>
  );
};

const Github = (props: { id?: string }) => {
  return (
    <Link to="https://github.com/refinedev/refine" className="no-underline">
      <div
        className={clsx(
          "border-t dark:border-gray-700 border-gray-300",
          "dark:bg-gray-800 bg-gray-100",
          "flex items-center",
          "p-4",
        )}
      >
        <GithubStarIcon id={props?.id || ""} />
        <div className={clsx("ml-4", "dark:text-gray-400 text-gray-600")}>
          If you like Refine, don’t forget to star us on GitHub!
        </div>
      </div>
    </Link>
  );
};

const ThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();

  const toggle = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  const isDarkSelected = colorMode === "dark";
  const isLightSelected = colorMode === "light";

  return (
    <div className={clsx("not-prose", "p-4", "flex items-center")}>
      <div
        className={clsx("text-sm", "mr-10", "dark:text-gray-400 text-gray-600")}
      >
        Apperance
      </div>
      <button
        onClick={toggle}
        className={clsx(
          "mr-4",
          "rounded-full",
          "appearance-none",
          "select-none",
          "flex items-center gap-2",
          "h-[40px] px-3",
          "text-sm",
          "border dark:border-gray-700 border-gray-200",
          "text-gray-500",
          isLightSelected && "bg-gray-50",
        )}
      >
        <LightModeIcon />
        Light
      </button>
      <button
        onClick={toggle}
        className={clsx(
          "rounded-full",
          "appearance-none",
          "select-none",
          "flex items-center gap-2",
          "h-[40px] px-3",
          "text-sm",
          "border dark:border-gray-700 border-gray-200",
          isDarkSelected ? "text-gray-400" : "text-gray-500",
          isDarkSelected && "bg-gray-700",
        )}
      >
        <DarkModeIcon />
        Dark
      </button>
    </div>
  );
};
