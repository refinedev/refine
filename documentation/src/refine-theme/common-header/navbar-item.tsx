import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import type { NavbarItemType } from "./constants";
import { TwoTonedCloudIcon } from "../icons/popover";

type NavbarItemProps = {
  item: NavbarItemType;
  variant?: "landing" | "blog";
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || null);
    window.addEventListener("storage", storageEventHandler, false);

    return () => {
      window.removeEventListener("storage", storageEventHandler, false);
    };
  }, []);

  const storageEventHandler = () => {
    setTheme(localStorage.getItem("theme") || null);
  };

  let Icon = item.icon;

  if (item.label === "Cloud") {
    Icon = theme === "light" ? TwoTonedCloudIcon : item.icon;
  }

  return (
    <Link
      key={item.label}
      to={item.href}
      className={clsx(
        "inline-flex items-center gap-2",
        "text-sm leading-6 font-normal text-gray-900 dark:text-gray-300",
        "transition-colors duration-150 ease-in-out",
        "no-underline",
        item.label === "Hackathon"
          ? [
              "py-1",
              "px-2",
              "rounded-lg",
              "bg-hackathon-button-bg",
              "animate-hackathon-button-bg",
              "bg-refine-bg",
              "text-gray-0",
              "bg-[length:200%_100%]",
              "text-[14px]",
              "hover:text-gray-0",
            ]
          : ["hover:text-gray-900 dark:hover:text-white"],
      )}
    >
      {item.label}
      {item.icon && <Icon />}
    </Link>
  );
};
