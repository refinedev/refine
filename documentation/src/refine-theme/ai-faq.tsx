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
  question: string;
  answer: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "rounded-2xl",
        "text-gray-900 dark:text-white",
        "border",
        "border-gray-200 dark:border-gray-700",
        "transition-colors",
        "duration-300",
        {
          "bg-gray-50 dark:bg-gray-800": isOpen,
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
              className={clsx("text-gray-400 dark:text-gray-500")}
            />
          ) : (
            <PlusRectangle
              className={clsx("text-gray-400 dark:text-gray-500")}
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
                  "border-gray-200 dark:border-gray-700",
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
      "Credits are the usage units you spend when generating code, previewing output, or using any other feature in Refine AI. Every paid plan includes a monthly credit allowance based on your tier.",
  },
  {
    question: "How many real tokens does one credit equal?",
    answer:
      "We don’t tie credits to a strict number of model tokens, as usage depends on factors like prompt complexity, generation type, and model efficiency. Behind the scenes, we continuously optimize our infrastructure to help you get more value from every credit — no need to worry about token math.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "When your credits run out, you can continue working within your existing projects — but generating new outputs will pause until your next renewal. If you need to keep building right away, you can upgrade your plan at any time. Upgrades take effect immediately and reset your credit balance so you can pick up where you left off.",
  },
  {
    question: "Can I upgrade my plan at any time?",
    answer:
      "Yes — upgrades take effect immediately. You’ll receive additional credits right away, and your billing cycle will restart from the upgrade date. Your previous payment is prorated and credited automatically.",
  },
  {
    question: "What happens when I downgrade?",
    answer:
      "Downgrades take effect at the start of your next billing cycle. You’ll remain on your current tier until then.",
  },
  {
    question: "Will I lose unused credits when I change plans?",
    answer:
      "If you upgrade, any unused credits carry over but still expire at the end of your current billing cycle. If you downgrade, your new monthly credit limit will apply at the start of the next cycle.",
  },
  {
    question: "Do unused credits roll over month-to-month?",
    answer:
      "No — credits reset each month unless you’re on an Enterprise plan with a custom rollover agreement.",
  },
  {
    question: "How does billing work when I upgrade mid-month?",
    answer:
      "We use prorated billing — you’ll only pay the difference for the time remaining in your current billing cycle. This is handled automatically through Stripe.",
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
