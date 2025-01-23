import React, {
  type CSSProperties,
  type PropsWithChildren,
  type SVGProps,
  useState,
} from "react";
import clsx from "clsx";
import {
  autoUpdate,
  useFloating,
  useDismiss,
  useInteractions,
  offset,
  flip,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import {
  type SurveyOption,
  SurveyTypeEnum,
  useRefineCloudSurveyAPI,
} from "../hooks/use-refine-cloud-survey-api";
import { useLocation } from "@docusaurus/router";

type Props = {
  id: string;
};

export const DocThumbsUpDownFeedbackWidget = (
  props: PropsWithChildren<Props>,
) => {
  const location = useLocation();

  const [feedbackText, setFeedbackText] = useState("");
  const [selectedThumb, setSelectedThumb] = useState<SurveyOption | null>(null);
  const [isFeedbackTextIsVisible, setIsFeedbackTextIsVisible] = useState(false);
  const [resultViewVisible, setResultViewVisible] = useState(false);

  const isPopoverVisible = isFeedbackTextIsVisible || resultViewVisible;

  const { survey, createSurvey, updateSurvey } = useRefineCloudSurveyAPI({
    type: SurveyTypeEnum.THUMBS,
  });

  const onThumbsUpDownClick = async (value: SurveyOption) => {
    setSelectedThumb(value);
    setIsFeedbackTextIsVisible(true);

    if (survey) {
      await updateSurvey({
        surveyId: survey.id,
        body: {
          response: value,
        },
      });
    } else {
      await createSurvey({
        body: {
          response: value,
          entityId: location.pathname,
          metaData: {
            sectionId: props.id,
          },
        },
      });
    }
  };

  const onFeedbackTextSubmit = async () => {
    const text = feedbackText.trim();
    if (!text) return;

    await updateSurvey({
      surveyId: survey.id,
      body: { response: selectedThumb, responseText: text },
    });

    setResultViewVisible(true);
    setTimeout(() => {
      setIsFeedbackTextIsVisible(false);
      setResultViewVisible(false);
    }, 2000);
  };

  return (
    <div className="group">
      {props.children}
      <div
        className={clsx(
          "refine-feedback-widget",
          "relative",
          "z-popover",
          "hidden md:flex",
          "items-center",
          "gap-5",
          "w-max h-[40px]",
          "pt-1 pr-1 pb-1 pl-4",
          "bg-[#99A1B31A] dark:bg-[#2F333C]",
          "rounded-[28px]",
          "transition-all duration-300 ease-in-out",
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
        <div
          className={clsx("flex", "items-center", "gap-1", "widget-actions")}
        >
          <button
            type="button"
            onClick={() => onThumbsUpDownClick(THUMBS_VALUES.UP)}
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
            onClick={() => onThumbsUpDownClick(THUMBS_VALUES.DOWN)}
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
        <FeedbackTextPopover
          isOpen={isPopoverVisible}
          onOpenChange={(isOpen) => {
            if (resultViewVisible) return;

            if (!isOpen) {
              setIsFeedbackTextIsVisible(false);
              setResultViewVisible(false);
            }
          }}
          arrowStyle={{
            right: selectedThumb === 1 ? "150px" : "115px",
          }}
        >
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
    arrowStyle?: CSSProperties;
    onOpenChange?: (isOpen: boolean) => void;
  }>,
) => {
  const [flipped, setFlipped] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: props.isOpen,
    onOpenChange: props.onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(({ middlewareData }) => {
        if (middlewareData?.flip) {
          return {
            mainAxis: 12,
          };
        }
        return {
          mainAxis: 52,
        };
      }),
      flip(({ placement }) => {
        if (placement.includes("bottom")) {
          setFlipped(false);
        }

        if (placement.includes("top")) {
          setFlipped(true);
        }

        return {
          fallbackPlacements: ["top-start"],
        };
      }),
    ],
  });
  const dismiss = useDismiss(context, {
    outsidePress: (event) =>
      !(event.target as HTMLElement)?.closest?.(".widget-actions"),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
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
            {...getFloatingProps()}
            className={clsx(
              "w-[320px]",
              "bg-[#EAEBEF] dark:bg-refine-react-dark-code",
              "border border-[#E3E4E5] dark:border-[#343A46]",
              "rounded-[20px]",
              "relative",
            )}
          >
            {props.children}
            <PopoverPointer
              style={{
                position: "absolute",
                top: flipped ? "unset" : "-10px",
                bottom: flipped ? "-10px" : "unset",
                transform: flipped ? "rotate(180deg)" : "rotate(0deg)",
                transition: "right 0.2s ease-in-out",
                willChange: "right",
                ...props.arrowStyle,
              }}
            />
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

const THUMBS_VALUES: Record<"UP" | "DOWN", SurveyOption> = {
  UP: 1,
  DOWN: 2,
};
