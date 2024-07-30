import React from "react";
import clsx from "clsx";
import { LandingStartActionIcon } from "./icons/landing-start-action";
import { LandingCopyCommandButton } from "./landing-copy-command-button";
import { LandingPlaygroundModal } from "./landing-playground-modal";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import { useInView } from "framer-motion";

export const LandingTryItSection = ({ className }: { className?: string }) => {
  const [wizardOpen, setWizardOpen] = React.useState(false);

  const onClick = React.useCallback(() => {
    setWizardOpen(true);
  }, []);

  const { search, hash } = useLocation();

  const [params, setParams] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const _params = new URLSearchParams(search);
    const paramsObj: Record<string, string> = {};

    // @ts-expect-error no downlevel iteration
    for (const [key, value] of _params.entries()) {
      paramsObj[key] = value;
    }

    setParams(paramsObj);
  }, [search]);

  const scrollToItem = React.useCallback(() => {
    const scroller = () => {
      const playgroundElement = document.getElementById("playground");
      if (playgroundElement) {
        playgroundElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    };

    scroller();
    setTimeout(scroller, 300);
  }, []);

  React.useEffect(() => {
    if (params.playground || hash === "#playground") {
      if (params.playground === "browser") {
        setWizardOpen(true);
      } else {
        scrollToItem();
      }
    }
  }, [params.playground, hash]);

  React.useEffect(() => {
    if (wizardOpen) {
      scrollToItem();
    }
  }, [wizardOpen]);

  return (
    <div
      id="playground"
      className={clsx(
        "flex",
        "flex-col",
        "gap-8 landing-sm:gap-12 landing-md:gap-8 ",
        className,
      )}
      style={{
        scrollMarginTop: "6rem",
      }}
    >
      <div
        className={clsx(
          "flex",
          "flex-col",
          "gap-4 landing-sm:gap-6",
          "px-4 landing-sm:px-10",
        )}
      >
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
            "font-bold",
            "text-gray-900 dark:text-gray-0",
          )}
        >
          Get started now!
        </h2>
        <p
          className={clsx(
            "text-base",
            "font-normal",
            "text-gray-600 dark:text-gray-400",
            "landing-sm:max-w-[446px]",
          )}
        >
          Choose your way to scaffold your project and start developing in
          seconds.
        </p>
      </div>
      <div
        className={clsx(
          "w-full",
          "rounded-2xl landing-md:rounded-3xl",
          "relative",
          "overflow-hidden",
          "transition-[min-height,height]",
          "duration-300",
          "ease-out",
          wizardOpen && "min-h-[515px]",
        )}
      >
        <LandingTryItWizardSection visible={wizardOpen} />
        <LandingTryItOptionsSection
          onClick={onClick}
          className={clsx(
            "w-full",
            "transition-[transform,opacity,margin-bottom]",
            "duration-300",
            "ease-in-out",
            wizardOpen && [
              "pointer-events-none",
              "select-none",
              "landing-md:-translate-y-[300px]",
              "landing-md:opacity-0",
              "landing-md:origin-top",
              "landing-md:-mb-[272px]",
            ],
          )}
        />
      </div>
      <LandingPlaygroundModal
        visible={wizardOpen}
        close={() => setWizardOpen(false)}
      />
    </div>
  );
};

const LandingTryItOptionsSection = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col landing-md:flex-row",
        className,
      )}
    >
      <div
        className={clsx(
          "flex-1",
          "rounded-2xl landing-md:rounded-3xl",
          "landing-md:rounded-tr-none landing-md:rounded-br-none",
          "flex",
          "flex-col",
          "gap-6 landing-sm:gap-10",
          "pt-4 landing-sm:pt-10 landing-md:pt-16",
          "px-4 landing-sm:px-10",
          "pb-14 landing-sm:pb-20 landing-md:pb-16",
          "bg-gray-50 dark:bg-gray-800",
          "landing-md:bg-landing-wizard-option-bg-light dark:landing-md:bg-landing-wizard-option-bg-dark",
          "landing-md:bg-landing-wizard-option-left landing-md:bg-landing-wizard-option",
        )}
        style={{
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        <p
          className={clsx(
            "text-base landing-sm:text-xl landing-md:text-base landing-lg:text-xl",
            "font-semibold",
            "text-gray-600 dark:text-gray-400",
            "landing-md:max-w-[318px]",
            "landing-lg:max-w-[446px]",
          )}
        >
          Use our online GUI to create, customize, and download.
        </p>
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            "appearance-none",
            "focus:outline-none",
            "self-start",
            "rounded-3xl",
            "!text-gray-0 dark:!text-gray-900",
            "bg-refine-blue dark:bg-refine-cyan-alt",
            "py-3",
            "px-6",
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            "hover:!no-underline",
            "hover:brightness-110",
            "transition-[filter]",
            "duration-150",
            "ease-in-out",
          )}
        >
          <LandingStartActionIcon />
          <span className={clsx("text-base", "font-semibold")}>
            Try it in your browser
          </span>
        </button>
      </div>
      <div
        className={clsx(
          "h-4 landing-md:h-full",
          "w-full landing-md:w-0",
          "relative",
          "flex-shrink-0",
        )}
      >
        <div
          className={clsx(
            "hidden",
            "landing-md:block",
            "absolute",
            "-left-2",
            "skew-x-[14deg]",
            "top-0",
            "h-[272px]",
            "w-2",
            "bg-gray-0 dark:bg-gray-900",
          )}
        />
        <div
          className={clsx(
            "absolute",
            "-top-6 left-8",
            "landing-md:top-32 landing-md:-left-1",
            "landing-md:-translate-x-1/2",
            "landing-md:-translate-y-1/2",
            "bg-gray-0 dark:bg-gray-900",
            "text-gray-600 dark:text-gray-400",
            "w-16 h-16 landing-md:w-[78px] landing-md:h-[78px]",
            "rounded-full",
            "text-base",
            "uppercase",
            "flex items-center justify-center",
          )}
        >
          or
        </div>
      </div>
      <div
        className={clsx(
          "flex-1",
          "rounded-2xl landing-md:rounded-3xl",
          "flex flex-col",
          "landing-md:rounded-tl-none landing-md:rounded-bl-none",
          "pb-4 landing-sm:pb-10 landing-md:pb-16",
          "px-4 landing-sm:px-10",
          "pt-14 landing-sm:pt-20 landing-md:pt-16",
          "bg-gray-50 dark:bg-gray-800",
          "landing-md:bg-landing-wizard-option-bg-light dark:landing-md:bg-landing-wizard-option-bg-dark",
          "landing-md:bg-landing-wizard-option-right landing-md:bg-landing-wizard-option",
          "landing-md:items-end",
        )}
        style={{
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        <div
          className={clsx(
            "landing-md:max-w-[318px]",
            "landing-lg:max-w-[446px]",
            "flex",
            "flex-col",
            "gap-6 landing-sm:gap-10",
          )}
        >
          <p
            className={clsx(
              "text-base landing-sm:text-xl landing-md:text-base landing-lg:text-xl",
              "font-semibold",
              "text-gray-600 dark:text-gray-400",
              "landing-lg:max-w-[446px]",
            )}
          >
            Run the npm command in Terminal and follow the wizard instructions.
          </p>
          <LandingCopyCommandButton />
        </div>
      </div>
    </div>
  );
};

const LandingTryItWizardSection = ({
  className,
  visible,
}: {
  className?: string;
  visible: boolean;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    margin: "100px",
  });

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { colorMode } = useColorMode();

  const postColorMode = React.useCallback(() => {
    iframeRef.current.contentWindow?.postMessage(
      {
        type: "colorMode",
        colorMode,
      },
      "*",
    );
  }, [colorMode]);

  React.useEffect(() => {
    // when color mode changes, post a message to the iframe
    // to update its color mode
    if (iframeRef.current) {
      postColorMode();
    }
  }, [postColorMode]);

  return (
    <div
      className={clsx(
        "hidden",
        "w-full",
        "items-stretch",
        "h-auto",
        "landing-md:flex",
      )}
    >
      <div
        className={clsx(
          "flex-1",
          "bg-gray-0 dark:bg-gray-900",
          "opacity-0",
          visible && "opacity-100",
          "transition-[background-color,background,opacity]",
          "duration-150",
          "ease-in-out",
          "bg-landing-wizard-side-bg-light dark:bg-landing-wizard-side-bg",
          "bg-landing-wizard-side-left-position",
          "bg-landing-wizard-side-size",
          "bg-no-repeat",
        )}
      />
      <div
        ref={ref}
        className={clsx(
          "box-content",
          "flex-shrink-0",
          "rounded-2xl landing-md:rounded-3xl",
          "bg-gray-50 dark:bg-gray-800",
          "border border-solid",
          "transition-[border-color,width,height,opacity,background-color]",
          "mx-auto",
          "duration-300",
          "ease-in-out",
          "overflow-hidden",
          "scrollbar-hidden",
          !visible && ["pointer-events-none", "select-none"],
          !visible && ["landing-md:border-transparent"],
          visible && [
            "landing-md:border-gray-200 dark:border-gray-700",
            "landing-md:bg-gray-50 dark:bg-gray-800",
          ],
          !visible && [
            "landing-md:opacity-0",
            "landing-md:h-0",
            "landing-md:w-full",
          ],
          visible && [
            "landing-md:opacity-100",
            "landing-md:h-[512px]",
            "landing-md:w-[894px]",
            "landing-lg:w-[944px]",
          ],
        )}
      >
        {inView ? (
          <iframe
            ref={iframeRef}
            src="https://refine.new/embed-form"
            onLoad={() => {
              setTimeout(postColorMode, 50);
            }}
            className={clsx(
              "scrollbar-hidden",
              "transition-opacity",
              "duration-300",
              "delay-300",
              visible && "opacity-100",
              !visible && "opacity-0",
              "w-full",
              "h-full",
              "border-none",
              "rounded-2xl landing-md:rounded-3xl",
            )}
          />
        ) : null}
      </div>
      <div
        className={clsx(
          "flex-1",
          "bg-gray-0 dark:bg-gray-900",
          "opacity-0",
          visible && "opacity-100",
          "transition-[background-color,background,opacity]",
          "duration-150",
          "ease-in-out",
          "bg-landing-wizard-side-bg-light dark:bg-landing-wizard-side-bg",
          "bg-landing-wizard-side-right-position",
          "bg-landing-wizard-side-size",
          "bg-no-repeat",
        )}
      />
    </div>
  );
};
