import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";

import { HamburgerIcon } from "./icons/hamburger";

import { openFigma } from "../utils/open-figma";
import { Menu } from "./common-header/menu";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import { CommonThemeToggle } from "./common-theme-toggle";
import { TopAnnouncement } from "./top-announcement";

import { LandingGithubStarButton } from "./landing-github-star-button";
import SearchBar from "../theme/SearchBar";
import { RefineLogoIcon } from "./icons/refine-logo";

type Props = {
  hasSticky?: boolean;
  trackProgress?: boolean;
  className?: string;
  variant?: "landing" | "blog";
};

export const CommonHeader = ({
  trackProgress,
  variant = "landing",
  className,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressPercentage = useTransform(
    scrollYProgress,
    [0.03, 0.95],
    ["0%", "100%"],
  );

  return (
    <>
      <TopAnnouncement />
      <header className={clsx("sticky", "top-0", "z-10")}>
        <div
          className={clsx(
            "absolute",
            "top-0 left-0 right-0",
            "backdrop-blur-[6px]",
            "landing-md:backdrop-blur-[12px]",
            "z-[-1]",
            "bg-gray-0 dark:bg-gray-900",
            "bg-opacity-80 dark:bg-opacity-80",
            "pointer-events-none",
            className,
          )}
          style={{
            top: "-20px",
            bottom: "-80px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
            maskImage:
              "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
          }}
        />
        <div
          className={clsx(
            "relative",
            "z-[1]",
            "p-4",
            "landing-sm:px-8",
            "landing-md:py-5",
          )}
        >
          <div
            className={clsx(
              "mx-auto",
              "flex",
              "items-center",
              "justify-between",
              "max-w-[896px]",
              "landing-lg:max-w-[1200px]",
            )}
          >
            <div className={clsx("w-[130px]", "landing-lg:w-[200px]")}>
              <Link to="/" onContextMenu={openFigma}>
                <RefineLogoIcon className="text-gray-900 dark:text-gray-0" />
              </Link>
            </div>
            <button
              type="button"
              className={clsx(
                "text-gray-900 dark:text-gray-0",
                "block landing-md:hidden",
              )}
              onClick={() => setIsModalOpen(true)}
            >
              <HamburgerIcon />
            </button>
            <div
              className={clsx(
                "hidden landing-md:flex",
                "flex-1",
                "items-center",
                "gap-8",
              )}
            >
              <Menu variant={variant} />
            </div>
            <div
              className={clsx(
                "hidden landing-md:flex",
                "items-center",
                "justify-end",
                "gap-2",
                "w-[314px]",
              )}
            >
              <SearchBar variant="landing" />
              <LandingGithubStarButton />
              <CommonThemeToggle />
            </div>
            <MobileMenuModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        {trackProgress && (
          <div
            className={clsx(
              "w-full",
              "h-[1px]",
              "translate",
              "bg-refine-react-3 dark:bg-refine-react-7",
            )}
          >
            <motion.div
              className={clsx(
                "h-full",
                "bg-refine-react-light-link dark:bg-refine-react-dark-link",
              )}
              style={{ width: progressPercentage }}
            />
          </div>
        )}
      </header>
    </>
  );
};
