import React, { PropsWithChildren, SVGProps, useState } from "react";
import clsx from "clsx";
import { autoUpdate, useFloating, offset, flip } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";

type ThumbValue = 1 | 2;

type Props = {
  id: string;
};

export const DocThumbsUpDownFeedbackWidget = (
  props: PropsWithChildren<Props>,
) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedThumb, setSelectedThumb] = useState<ThumbValue | null>(null);
  const [resultViewVisible, setResultViewVisible] = useState(false);

  const isFeedbackTextIsVisible = selectedThumb !== null;
  const isPopoverVisible = isFeedbackTextIsVisible || resultViewVisible;

  const onThumbsUpDownClick = (value: ThumbValue) => {
    setSelectedThumb((prev) => (prev === value ? null : value));
  };

  const onFeedbackTextSubmit = () => {
    const value = feedbackText.trim();
    if (!value) return;

    // Send feedback to the server
    alert(props.id);

    setResultViewVisible(true);
    setTimeout(() => {
      setSelectedThumb(null);
      setFeedbackText("");
      setResultViewVisible(false);
    }, 3000);
  };

  return (
    <div className="group">
      {props.children}
      <div
        className={clsx(
          "relative",
          "z-popover",
          "flex",
          "items-center",
          "gap-5",
          "w-max h-[40px]",
          "pt-1 pr-1 pb-1 pl-4",
          "bg-[#99A1B31A] dark:bg-[#2F333C]",
          "rounded-[28px]",
          "transition-all duration-[600ms] ease-in-out",
          !isPopoverVisible && "opacity-0",
          "group-hover:opacity-100",
        )}
      >
        <div
          className={clsx(
            "text-xs",
            "whitespace-nowrap",
            "text-[#23272F] dark:text-[#E3E4E5]",
          )}
        >
          Was this helpful?
        </div>
        <div className={clsx("flex", "items-center", "gap-1")}>
          <button
            type="button"
            onClick={() => onThumbsUpDownClick(1)}
            className={clsx(
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-full",
              "text-gray-500",
              "hover:text-green-500 hover:bg-green-500/20",
              "transition-all duration-200 ease-in-out",
              selectedThumb === 1 && "text-green-500 bg-green-500/20",
            )}
          >
            <ThumbsUpIcon />
          </button>
          <button
            type="button"
            onClick={() => onThumbsUpDownClick(2)}
            className={clsx(
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-full",
              "text-gray-500",
              "hover:text-red-500 hover:bg-red-500/20",
              "transition-all duration-200 ease-in-out",
              selectedThumb === 2 && "text-red-500 bg-red-500/20",
            )}
          >
            <ThumbsDownIcon />
          </button>
        </div>
        <FeedbackTextPopover isOpen={isPopoverVisible}>
          <PopoverPointer
            style={{
              position: "absolute",
              top: "-10px",
              right: selectedThumb === 1 ? "150px" : "115px",
              transition: "right 0.2s ease-in-out",
              willChange: "right",
            }}
          />
          {!resultViewVisible && (
            <form
              className={clsx("flex flex-col", "p-2")}
              onSubmit={(e) => {
                e.preventDefault();
                onFeedbackTextSubmit();
              }}
            >
              <textarea
                rows={3}
                required
                minLength={3}
                placeholder="Your thumbs tells us a lot, but If you have any additional thoughts or suggestions, we'd love to hear them!"
                onChange={(e) => setFeedbackText(e.target.value)}
                value={feedbackText}
                className={clsx(
                  "w-full",
                  "bg-white dark:bg-[#343A46]",
                  "text-[#23272F] dark:text-[#E3E4E5]",
                  "resize-none",
                  "rounded-xl",
                  "text-xs",
                  "py-2 px-3",
                )}
              />
              <button
                type="submit"
                className={clsx(
                  "w-16 h-6",
                  "flex items-center justify-center",
                  "bg-refine-react-light-link dark:bg-refine-react-dark-link",
                  "text-xs",
                  "text-white",
                  "rounded-full",
                  "mt-2 ml-auto",
                )}
              >
                Send
              </button>
            </form>
          )}
          {resultViewVisible && (
            <div
              className={clsx(
                "flex items-center",
                "p-4",
                "text-xs",
                "text-gray-500",
              )}
            >
              <span>Thank you for your feedback!</span>
            </div>
          )}
        </FeedbackTextPopover>
      </div>
    </div>
  );
};

const FeedbackTextPopover = (
  props: PropsWithChildren<{
    isOpen: boolean;
  }>,
) => {
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: props.isOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(52),
      flip({
        fallbackAxisSideDirection: "start",
      }),
    ],
  });

  return (
    <>
      <div
        ref={refs.setReference}
        style={{
          position: "absolute",
          top: "0",
          left: 0,
        }}
      />
      <AnimatePresence>
        {context.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            ref={refs.setFloating}
            style={floatingStyles}
            className={clsx(
              "w-[320px]",
              "bg-[#EAEBEF] dark:bg-refine-react-dark-code",
              "border border-[#E3E4E5] dark:border-[#343A46]",
              "rounded-[20px]",
              "relative",
            )}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PopoverPointer = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={18}
      viewBox="0 0 42 18"
      fill="none"
      {...props}
    >
      <title>Popover Pointer</title>
      <path
        fill={isDarkTheme ? "#16181D" : "#EAEBEF"}
        stroke="url(#a)"
        d="M18.303 2.077C18.892 1.105 19.9.5 21 .5s2.108.605 2.697 1.577l3.026 4.992c.928 1.532 2.476 2.431 4.11 2.431H41.5v8H.5v-8h10.667c1.634 0 3.182-.899 4.11-2.431l3.026-4.992Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={21}
          x2={21}
          y1={1}
          y2={16}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.59} stopColor={isDarkTheme ? "#343A46" : "#E3E4E5"} />
          <stop
            offset={0.602}
            stopColor={isDarkTheme ? "#343A46" : "#E3E4E5"}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
