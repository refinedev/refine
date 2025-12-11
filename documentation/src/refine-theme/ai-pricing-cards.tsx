import React from "react";

import { Separator } from "./shadcn/separator";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";
import { type ClassValue, clsx } from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

type PricingCardProps = {
  className?: string;
};

export const AiPricingCards = ({ className }: PricingCardProps) => {
  return (
    <div className={className}>
      <div className={clsx("not-prose")}>
        <h2
          className={clsx(
            "text-2xl",
            "font-semibold",
            "landing-sm:text-[32px] landing-sm:leading-[40px]",
            "pl-4 landing-sm:pl-10",
          )}
        >
          <span>Select your plan and</span>{" "}
          <span
            className={clsx(
              "text-refine-indigo",
              "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.55)]",
              "dark:text-refine-green-alt",
              "dark:text-refine-react-dark-green-alt dark:drop-shadow-[0_0_30px_rgba(38,217,127,0.55)]",
            )}
          >
            get started
            <span className={clsx("text-gray-900", "dark:text-white")}>.</span>
          </span>
        </h2>
      </div>
      <div
        className={clsx(
          "mt-14",
          "w-full",
          "grid",
          "flex",
          "flex-wrap",
          "landing-md:grid-cols-[repeat(auto-fit,minmax(384px,1fr))]",
          "auto-rows-[1fr]",
          "items-center",
          "justify-center",
          "items-stretch",
          "gap-6",
        )}
      >
        <PricingCardStarter />
        <PricingCardPro />
        <PricingCardEnterprise />
        <div
          className={clsx(
            "hidden",
            "refine-sm:flex",
            "w-full",
            "max-w-[344px]",
            "landing-sm:max-w-[420px]",
            "landing-md:max-w-[436px]",
            "landing-lg:max-w-[384px]",
          )}
        />
      </div>
    </div>
  );
};

const PricingCardStarter = () => {
  const starterPlan = {
    planKey: "starter",
    name: "Starter",
    description: "Get hands-on with the fundamentals.",
    features: ["Core features for exploration", "Preview your builds"],
    refineTokenCount: 300,
    monthlyPriceCents: 0,
  };

  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "rounded-3xl",
        "py-10",
        "px-6",
        "w-full",
        "max-w-[344px]",
        "landing-sm:max-w-[420px]",
        "landing-md:max-w-[436px]",
        "landing-lg:max-w-[384px]",
        "border",
        "dark:border-[#343A46]",
        "border-[#E3E4E5]",
      )}
    >
      <div className={clsx("px-4")}>
        <div
          className={clsx("flex", "items-center", "justify-between", "gap-2")}
        >
          <h2
            className={clsx(
              "font-semibold",
              "tracking-wide",
              "text-[20px]",
              "!leading-10",
              "uppercase",
              "text-refine-react-light-green dark:text-refine-react-dark-green",
            )}
          >
            {starterPlan?.name}
          </h2>
        </div>

        <div className={clsx("mt-4", "w-[312px]")}>
          <p className={clsx("text-sm", "line-clamp-1")}>
            {starterPlan?.description}
          </p>
        </div>
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <div className={clsx("flex", "items-center", "gap-1", "px-4", "h-10")}>
        <span className={clsx("font-semibold", "tabular-nums")}>
          {new Intl.NumberFormat().format(starterPlan?.refineTokenCount || 0)}
        </span>
        <span>credits</span>
        <span className={clsx("text-react-8", "dark:text-react-5")}>/</span>
        <span>month</span>
      </div>

      <div className={clsx("flex", "flex-col", "gap-2", "mt-2", "px-4")}>
        <p className={clsx("text-xl", "flex", "items-center", "gap-1")}>FREE</p>
      </div>

      <div className={clsx("mt-4", "px-4")}>
        <a
          href="https://s.refine.dev/ai-landing-pricing-card-starter"
          target="_blank"
          rel="noopener"
          className={clsx("appearance-none", "no-underline")}
        >
          <SubscribeButton
            onClick={() => {}}
            buttonText="Start for free"
            className={clsx(
              "mt-auto",
              "text-refine-react-light-green dark:text-refine-react-dark-green",
              "bg-refine-react-dark-green/10 dark:bg-refine-react-dark-green/20",
            )}
          />
        </a>
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <div className={clsx("flex", "flex-col", "gap-3", "px-4", "mt-4")}>
        {starterPlan?.features?.map((feature, i) => (
          <div key={i} className={clsx("flex", "items-center", "gap-2")}>
            <img
              src="/assets/pricing-card-checkmark-green.png"
              alt={feature}
              className={clsx("w-4", "h-4")}
            />
            <div className={clsx("text-sm")}>{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingCardPro = () => {
  const proPlans = [
    {
      planKey: "pro",
      name: "Pro",
      description: "Full power for production-grade development.",
      features: [
        "Interactive code editor",
        "One-Click Export",
        "Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      refineTokenCount: 1500,
      monthlyPriceCents: 2000,
    },
    {
      planKey: "pro_3k",
      name: "Pro 3K",
      description: "Full power for production-grade development.",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 2,
      refineTokenCount: 3000,
      monthlyPriceCents: 4000,
    },
    {
      planKey: "pro_6k",
      name: "Pro 6K",
      description: "Full power for production-grade development.",
      tier: "pro",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 3,
      refineTokenCount: 6000,
      monthlyPriceCents: 8000,
    },
    {
      planKey: "pro_9k",
      name: "Pro 9K",
      description: "Full power for production-grade development.",
      tier: "pro",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 4,
      refineTokenCount: 9000,
      monthlyPriceCents: 12000,
    },
    {
      planKey: "pro_15k",
      name: "Pro 15K",
      description: "Full power for production-grade development.",
      tier: "pro",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 5,
      refineTokenCount: 15000,
      monthlyPriceCents: 20000,
    },
    {
      planKey: "pro_20k",
      name: "Pro 20K",
      description: "Full power for production-grade development.",
      tier: "pro",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 6,
      refineTokenCount: 20000,
      monthlyPriceCents: 26600,
    },
    {
      planKey: "pro_40k",
      name: "Pro 40K",
      description: "Full power for production-grade development.",
      tier: "pro",
      features: [
        "Interactive code editor",
        "One-Click Export & Hosting with Netlify",
        "Attach files, specs, or artefacts",
      ],
      sortKey: 7,
      refineTokenCount: 40000,
      monthlyPriceCents: 53300,
    },
  ];

  const [selectedTierKey, setSelectedTierKey] = useState<string | null>(
    proPlans.at(0)?.planKey ?? null,
  );
  const selectedTier = proPlans.find(
    (plan) => plan.planKey === selectedTierKey,
  );

  const tierOptions = proPlans.map((plan) => ({
    label: `${new Intl.NumberFormat().format(
      plan.refineTokenCount,
    )} credits / month`,
    value: plan.planKey,
  }));

  const handleOnPlanClick = async () => {
    console.log("handleOnPlanClick");
  };

  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "rounded-3xl",
        "py-10",
        "px-6",
        "w-full",
        "max-w-[344px]",
        "landing-sm:max-w-[420px]",
        "landing-md:max-w-[436px]",
        "landing-lg:max-w-[384px]",
        "border",
        "dark:border-[#343A46]",
        "border-[#E3E4E5]",
        "bg-pricing-card-pro-light dark:bg-pricing-card-pro-dark",
      )}
    >
      <div className={clsx("px-4")}>
        <div
          className={clsx("flex", "items-center", "justify-between", "gap-2")}
        >
          <h2
            className={clsx(
              "font-semibold",
              "tracking-wide",
              "text-[24px]",
              "!leading-10",
              "uppercase",
              "text-refine-react-light-link dark:text-refine-react-dark-link",
            )}
          >
            {proPlans[0]?.name}
          </h2>
          <MostPopularBadge />
        </div>

        <div className={clsx("mt-4", "landing-md:w-[305px]")}>
          <p className={clsx("text-sm", "line-clamp-1")}>
            {selectedTier?.description}
          </p>
        </div>
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <Select
        value={selectedTierKey ?? ""}
        onValueChange={(value) => {
          setSelectedTierKey(value);
        }}
      >
        <SelectTrigger
          className={clsx(
            "h-10",
            "rounded-md",
            "dark:bg-[#16181D80]",
            "dark:border-[#FFFFFF26]",
          )}
        >
          <SelectValue placeholder="Select a plan">
            <div className={clsx("flex", "items-center", "gap-1")}>
              <span className={clsx("font-semibold", "tabular-nums")}>
                {new Intl.NumberFormat().format(
                  selectedTier?.refineTokenCount || 0,
                )}
              </span>
              <span>credits</span>
              <span className={clsx("text-react-8", "dark:text-react-5")}>
                /
              </span>
              <span>month</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {tierOptions.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className={clsx("flex", "flex-col", "gap-2", "mt-2", "px-4")}>
        <p className={clsx("text-xl", "flex", "items-center", "gap-1")}>
          <span className={clsx("font-semibold", "tabular-nums")}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format((selectedTier?.monthlyPriceCents ?? 0) / 100)}
          </span>
          <span className={clsx("text-react-8", "dark:text-react-5")}>/</span>
          <span>month</span>
        </p>
      </div>

      <div className={clsx("mt-4", "px-4")}>
        <a
          href={`https://s.refine.dev/ai-landing-pricing-card-${selectedTier?.planKey}`}
          target="_blank"
          rel="noopener"
          className={clsx("appearance-none", "no-underline")}
        >
          <SubscribeButton
            onClick={handleOnPlanClick}
            buttonText="Get started"
            className={clsx(
              "mt-auto",
              "text-white",
              "bg-refine-react-light-link dark:bg-refine-react-dark-link",
            )}
          />
        </a>
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <div className={clsx("flex", "flex-col", "gap-3", "px-4", "mt-4")}>
        {selectedTier?.features?.map((feature, i) => (
          <div key={i} className={clsx("flex", "items-center", "gap-2")}>
            <img
              src="/assets/pricing-card-checkmark-blue.png"
              alt={feature}
              className={clsx("w-4", "h-4")}
            />
            <div className={clsx("text-sm")}>{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingCardEnterprise = () => {
  const features = useMemo(() => {
    return [
      "Custom terms and volume pricing",
      "Dedicated support team",
      "SSO (Single Sign-On)",
      "Option to opt out of data training",
      "Private Slack channel with direct access",
    ];
  }, []);

  const handleOnPlanClick = () => {
    window.open("mailto:info@refine.dev", "_blank");
  };

  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "rounded-3xl",
        "py-10",
        "px-6",
        "w-full",
        "max-w-[344px]",
        "landing-sm:max-w-[420px]",
        "landing-md:max-w-[436px]",
        "landing-lg:max-w-[384px]",
        "border",
        "dark:border-[#343A46]",
        "border-[#E3E4E5]",
      )}
    >
      <div className={clsx("px-4")}>
        <div
          className={clsx("flex", "items-center", "justify-between", "gap-2")}
        >
          <h2
            className={clsx(
              "font-bold",
              "tracking-wide",
              "text-[20px]",
              "!leading-10",
              "uppercase",
              "text-refine-react-light-purple dark:text-refine-react-dark-purple",
            )}
          >
            Enterprise
          </h2>
        </div>

        <div className={clsx("mt-4")}>
          <p className={clsx("text-sm", "line-clamp-1")}>
            Custom solutions for large-scale teams.
          </p>
        </div>
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <p
        className={clsx("text-sm", "px-4", "text-react-6", "dark:text-react-3")}
      >
        Designed for teams building at scale or with specialized needs.
        Enterprise offers tailored solutions with advanced security, support,
        and control options.
      </p>

      <div className={clsx("mt-4", "px-4")}>
        <SubscribeButton
          onClick={handleOnPlanClick}
          buttonText="Contact us"
          className={clsx(
            "mt-auto",
            "text-refine-react-light-purple dark:text-refine-react-dark-purple",
            "bg-refine-react-light-purple/10 dark:bg-refine-react-dark-purple/20",
          )}
        />
      </div>

      <div className={clsx("px-4")}>
        <Separator className={clsx("my-6", "dark:bg-[#FFFFFF26]")} />
      </div>

      <div className={clsx("flex", "flex-col", "gap-3", "px-4", "mt-4")}>
        {features?.map((feature, i) => (
          <div key={i} className={clsx("flex", "items-center", "gap-2")}>
            <img
              src="/assets/pricing-card-checkmark-purple.png"
              alt={feature}
              className={clsx("w-4", "h-4")}
            />
            <div className={clsx("text-sm")}>{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SubscribeButton = ({
  onClick,
  buttonText,
  className,
}: {
  onClick: undefined | (() => void);
  buttonText: string;
  className?: ClassValue;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "w-full",
        "rounded-lg",
        "py-3",
        "font-medium",
        "transition-colors",
        className,
      )}
    >
      {buttonText}
    </button>
  );
};

const MostPopularBadge = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { colorMode } = useColorMode();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={clsx("w-[114px]", "h-[28px]", "object-cover")}>
      <img
        key={colorMode}
        src={
          colorMode === "dark"
            ? "/assets/most-popular-badge-dark.png"
            : "/assets/most-popular-badge-light.png"
        }
        alt="Most Popular"
        className={clsx("object-cover")}
      />
    </div>
  );
};
