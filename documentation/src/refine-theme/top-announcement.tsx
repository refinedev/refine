import clsx from "clsx";
import React, { type SVGProps } from "react";

export const TopAnnouncement = () => {
  return (
    <div
      className={clsx(
        "w-full h-12",
        "relative",
        "bg-top-announcement",
        "not-prose",
        "font-inter",
        "z-top-announcement",
      )}
    >
      <div
        className={clsx(
          "hidden lg:flex",
          "w-full h-full",
          "max-w-screen",
          "overflow-hidden",
          "border-b border-solid border-[#47ebeb26]",
          "top-announcement-mask",
        )}
      >
        <div
          className={clsx(
            "w-[1280px] h-full",
            "mx-auto",
            "flex",
            "justify-between",
          )}
        >
          <div className={clsx("w-[calc(50%-300px)] h-full", "relative")}>
            <GlowSmall
              style={{
                animationDelay: "1.5s",
              }}
              className={clsx("absolute", "top-[2px]", "right-[220px]")}
              id={"1"}
            />
            <GlowSmall
              style={{
                animationDelay: "1s",
              }}
              className={clsx(
                "absolute",
                "rotate-180",
                "top-[8px] right-[100px]",
              )}
              id={"2"}
            />
            <GlowBig className={clsx("absolute", "right-[10px]")} id={"3"} />
          </div>

          <div className={clsx("w-[calc(50%-300px)] h-full", "relative")}>
            <GlowSmall
              style={{
                animationDelay: "2s",
              }}
              className={clsx(
                "absolute",
                "rotate-180",
                "top-[6px] right-[180px]",
              )}
              id={"4"}
            />
            <GlowSmall
              style={{
                animationDelay: "0.5s",
              }}
              className={clsx(
                "delay-[1300]",
                "absolute",
                "top-[2px]",
                "right-[40px]",
              )}
              id={"5"}
            />

            <GlowBig className={clsx("absolute", "right-[-70px]")} id={"6"} />
          </div>
        </div>
      </div>
      <Text />
    </div>
  );
};

const Text = () => {
  return (
    <a
      href="https://s.refine.dev/devtools-beta"
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "relative lg:absolute",
        "px-2 lg:px-0",
        "top-0",
        "left-[50%]",
        "translate-x-[-50%]",
        "bg-top-announcement-text",
        "h-full w-full lg:w-[780px]",
        "flex items-center justify-center",
        "text-white",
        "text-xs sm:text-sm",
        "text-center",
        "no-underline",
        "hover:no-underline",
        "hover:text-white",
        "not-prose",
      )}
    >
      <div className={clsx("ml-2", "not-prose")}>
        Unlock powerful debugging and effortless query monitoring with{" "}
        <span className={clsx("font-semibold")}>Refine Devtools</span>
        <span
          className={clsx(
            "text-refine-cyan-alt hover:text-refine-cyan-alt",
            "font-semibold",
            "ml-2",
          )}
        >
          Learn More
        </span>
      </div>
    </a>
  );
};

const GlowSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={40}
    fill="none"
    {...props}
    className={clsx(
      "animate-top-announcement-glow",
      "opacity-1",
      props.className,
    )}
  >
    <circle cx={40} r={40} fill={`url(#${props.id}-a)`} fillOpacity={0.5} />
    <defs>
      <radialGradient
        id={`${props.id}-a`}
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 40 -40 0 40 0)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#47EBEB" />
        <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);

const GlowBig = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={120}
    height={48}
    fill="none"
    {...props}
    className={clsx(
      "animate-top-announcement-glow",
      "opacity-1",
      props.className,
    )}
  >
    <circle
      cx={60}
      cy={24}
      r={60}
      fill={`url(#${props.id}-a)`}
      fillOpacity={0.5}
    />
    <defs>
      <radialGradient
        id={`${props.id}-a`}
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 60 -60 0 60 24)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#47EBEB" />
        <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
