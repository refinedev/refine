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
            "font-semibold",
            "tracking-normal",
            "text-white",
          )}
        >
          Get started now!
        </h2>
        <p
          className={clsx(
            "text-base",
            "font-normal",
            "tracking-[-0.004rem]",
            "text-zinc-300",
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
        "gap-1",
        className,
      )}
    >
      <div
        className={clsx(
          "flex-1",
          "flex",
          "flex-col",
          "gap-6 landing-sm:gap-10",
          "pt-10",
          "pb-20",
          "px-10",
          "bg-zinc-800 landing-md:bg-transparent",
          "rounded-tl-[0.75rem]",
          "rounded-tr-[0.75rem]",
          "rounded-br-[0.75rem]",
          "rounded-bl-[3rem]",
        )}
      >
        <div
          className={clsx(
            "text-base landing-lg:text-2xl",
            "text-white",
            "landing-md:max-w-[318px]",
            "landing-lg:max-w-[446px]",
          )}
        >
          <div>Use our online GUI to create,</div>
          <div>customize, and download.</div>
        </div>
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            "appearance-none",
            "focus:outline-none",
            "self-start",
            "rounded-lg",
            "!text-white",
            "bg-orange-500",
            "pr-6",
            "pl-3",
            "py-3",
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
          "landing-md:hidden",
          "absolute",
          "top-1/2",
          "left-20",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "text-white",
          "w-20 h-20",
          "rounded-full",
          "text-xl",
          "uppercase",
          "flex items-center justify-center",
          "bg-zinc-900",
        )}
      >
        or
      </div>
      <div
        className={clsx(
          "flex flex-col",
          "flex-1",
          "pt-20",
          "pb-10",
          "px-10",
          "landing-md:items-end",
          "bg-zinc-800 landing-md:bg-transparent",
          "rounded-tl-[0.75rem]",
          "rounded-tr-[3rem]",
          "rounded-br-[0.75rem]",
          "rounded-bl-[0.75rem]",
        )}
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
          <div
            className={clsx(
              "text-base landing-lg:text-2xl",
              "text-white",
              "landing-lg:max-w-[446px]",
            )}
          >
            <div>Run the npm command in Terminal and</div>
            <div>follow the wizard instructions.</div>
          </div>
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
      {!visible && <BackgroundGraphicDesktop />}
      <div
        ref={ref}
        className={clsx(
          "box-content",
          "flex-shrink-0",
          "rounded-2xl landing-md:rounded-3xl",
          "border border-solid",
          "transition-[border-color,width,height,opacity,background-color]",
          "mx-auto",
          "duration-300",
          "ease-in-out",
          "overflow-hidden",
          "scrollbar-hidden",
          !visible && ["pointer-events-none", "select-none"],
          !visible && ["landing-md:border-transparent"],
          visible && ["landing-md:border-zinc-700"],
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
    </div>
  );
};

const BackgroundGraphicDesktop = (props) => {
  return (
    <div
      className={clsx(
        "absolute",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "overflow-hidden",
        "pointer-events-none",
        "z-0",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1200 208"
        fill="none"
        preserveAspectRatio="none"
        {...props}
      >
        <path
          fill="#27272A"
          d="M640.76 196.648c2.447 5.3-1.425 11.352-7.263 11.352H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h476.576c37.445 0 71.473 21.772 87.164 55.77l65.02 140.878ZM1200 196c0 6.627-5.37 12-12 12H711.424c-37.445 0-71.473-21.772-87.164-55.77L559.24 11.353C556.793 6.051 560.665 0 566.503 0H1188c6.63 0 12 5.373 12 12v184Z"
        />
      </svg>
      <div
        className={clsx(
          "absolute",
          "top-1/2",
          "left-1/2",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "text-white",
          "w-20 h-20",
          "rounded-full",
          "text-xl",
          "uppercase",
          "flex items-center justify-center",
          "bg-zinc-900",
        )}
      >
        or
      </div>
    </div>
  );
};
