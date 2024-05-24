import React from "react";
import clsx from "clsx";
import {
  type MotionValue,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { LandingKeyIcon } from "./icons/landing-key";
import { LandingShareIcon } from "./icons/landing-share";
import { LandingTableIcon } from "./icons/landing-table";
import { LandingWorldIcon } from "./icons/landing-world";
import { LandingSubtractIcon } from "./icons/landing-subtract";
import { LandingClipboardIcon } from "./icons/landing-clipboard";
import { LandingFingerprintIcon } from "./icons/landing-fingerprint";

const highlights = [
  {
    title: "Tables",
    icon: LandingTableIcon,
  },
  {
    title: "Forms",
    icon: LandingClipboardIcon,
  },
  {
    title: "Networking",
    icon: LandingShareIcon,
  },
  {
    title: "State Management",
    icon: LandingSubtractIcon,
  },
  {
    title: "Authentication",
    icon: LandingKeyIcon,
  },
  {
    title: "Access Control",
    icon: LandingFingerprintIcon,
  },
  {
    title: "i18n",
    icon: LandingWorldIcon,
  },
  {
    title: "Tables",
    icon: LandingTableIcon,
  },
];

const Item = ({
  index,
  title,
  Icon,
  y,
}: {
  index: number;
  title: string;
  Icon: typeof LandingKeyIcon;
  y: MotionValue<number>;
}) => {
  const opacity = useTransform(y, [index - 1, index, index + 1], [0, 1, 0]);

  return (
    <motion.div
      key={index}
      className={clsx(
        "text-center text-transparent",
        "bg-landing-sliding-highlight-bg bg-clip-text",
        "font-bold",
        "absolute left-0",
        "h-full w-full",
        "flex items-center justify-center gap-3",
      )}
      style={{
        top: `${index * 100}%`,
        opacity,
      }}
    >
      <Icon className="w-4 h-4 md:w-6 md:h-6" />
      <span>{title}</span>
    </motion.div>
  );
};

export const LandingSlidingHighlights = () => {
  const y = useMotionValue(0);

  const translateY = useTransform(
    y,
    [0, highlights.length - 1],
    ["0%", `${-(highlights.length - 1) * 100}%`],
  );

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const next = y.get() + 1;
      const nextValue = next > highlights.length - 1 ? 0 : next;
      const isGoingToLast = nextValue === highlights.length - 1;

      await animate(y, nextValue, {
        duration: 0.3,
        type: "spring",
        bounce: 0.5,
        stiffness: 100,
        onComplete: () => {
          if (isGoingToLast) {
            y.stop();
            y.set(0);
          }
        },
      });
    }, 4200);
    return () => {
      clearInterval(interval);
    };
  }, [y]);

  return (
    <div
      className={clsx(
        "h-8 md:h-12 overflow-hidden w-full max-w-[300px]",
        "animation-parent",
      )}
    >
      <motion.div
        style={{ translateY }}
        className={clsx("h-8 md:h-12 w-full relative")}
      >
        {highlights.map(({ title, icon: Icon }, index) => (
          <Item key={index} index={index} title={title} Icon={Icon} y={y} />
        ))}
      </motion.div>
    </div>
  );
};
