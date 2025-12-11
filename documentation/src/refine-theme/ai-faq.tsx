import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { MinusRectangle } from "./icons/minus-rectangle";
import { PlusRectangle } from "./icons/plus-rectangle";

type AiFaqProps = {
  className?: string;
};

export const AiFaq = ({ className }: AiFaqProps) => {
  return (
    <div className={clsx("w-full", "max-w-[760px]", "mx-auto", className)}>
      <h2
        className={clsx(
          "pl-6",
          "text-xl",
          "font-bold",
          "text-gray-900 dark:text-white",
        )}
      >
        Frequently asked questions
      </h2>
      <div className={clsx("flex", "flex-col", "gap-6", "mt-6")}>
        {faqData.map((item) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

type AccordionItemProps = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "rounded-2xl",
        "text-gray-900 dark:text-white",
        "border",
        "border-gray-200 dark:border-zinc-700",
        "transition-colors",
        "duration-300",
        {
          "bg-gray-50 dark:bg-zinc-800": isOpen,
          "bg-transparent": !isOpen,
        },
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full",
          "flex",
          "justify-between",
          "items-center",
          "p-6",
          "text-left",
          "focus:outline-none",
        )}
      >
        <span className={clsx("text-lg", "font-medium")}>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0.5, originY: 0.5, display: "inline-block" }}
        >
          {isOpen ? (
            <MinusRectangle
              className={clsx("text-gray-400 dark:text-zinc-400")}
            />
          ) : (
            <PlusRectangle
              className={clsx("text-gray-400 dark:text-zinc-400")}
            />
          )}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={clsx("overflow-hidden")}
          >
            <div className={clsx("px-6", "pb-6")}>
              <div
                className={clsx(
                  "w-full",
                  "h-[1px]",
                  "border-t",
                  "border-gray-200 dark:border-zinc-700",
                )}
              />
              <p
                className={clsx(
                  "text-base",
                  "text-gray-900 dark:text-white",
                  "mt-6",
                )}
              >
                {answer}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqData = [
  {
    question: "What are credits?",
    answer:
      "Credits are the usage units you spend when generating code, previewing output, or using any other feature in Refine AI. Every paid plan refills a fixed number of credits at the start of each billing month.",
  },
  {
    question: "How many real tokens does one credit equal?",
    answer:
      "We don’t tie credits to a strict number of model tokens, as usage depends on factors like prompt complexity, generation type, and model efficiency. Behind the scenes, we continuously optimize our infrastructure to help you get more value from every credit — no need to worry about token math.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "You can still view and edit the code you’ve already generated, but new AI actions pause until the next refill. Need to keep building right away? Upgrade your plan—credits and billing cycle refresh instantly.",
  },
  {
    question: "Can I upgrade my plan at any time?",
    answer:
      "Yes — upgrades take effect immediately. You’ll receive additional credits right away.",
  },
  {
    question: "What happens when I downgrade?",
    answer: (
      <div>
        <p>
          Downgrades take effect at the start of your next billing cycle. You’ll
          remain on your current tier until then.
        </p>
        <p className={clsx("mt-1")}>
          <span className={clsx("font-bold")}>Example:</span> You’re on $40 / 3
          K-tokens with 800 tokens left. You downgrade to $20 / 1.5 K-tokens.
          You can still use the remaining 800 tokens this month; on your next
          billing date your bucket resets to 1,500 tokens.
        </p>
      </div>
    ),
  },
  {
    question: "Will I lose unused credits when I change plans?",
    answer: (
      <div>
        <p>
          If you upgrade, your balance is topped-up to the full allowance of the
          new plan right away.
        </p>
        <p className={clsx("mt-1")}>
          <span className={clsx("font-bold")}>Example:</span> You’re on the $20
          / 1.5 K-token plan and have 600 tokens left. Mid-month you upgrade to
          $40 / 3 K-tokens. Your bucket is immediately refilled to 3,000 tokens
          for the rest of the current cycle.
        </p>
      </div>
    ),
  },
  {
    question: "Do unused credits roll over month-to-month?",
    answer:
      "No — credits reset each month unless you’re on an Enterprise plan with a custom rollover agreement.",
  },
  {
    question: "Can I buy extra credits without upgrading?",
    answer:
      "No — we don’t offer one-time credit top-ups. If you need more credits before your next renewal, you can upgrade your plan at any time. Upgrades apply immediately and include a fresh set of monthly credits.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes — you can cancel anytime from your billing settings. Your current plan will remain active until the end of your billing cycle.",
  },
];
