import clsx from "clsx";
import React from "react";
import { AiLandingStepInfo } from "./ai-landing-step-info";
import { AiLandingStepOne } from "./ai-landing-step-one";
import { AiLandingStepTwo } from "./ai-landing-step-two";
import { AiLandingStepThree } from "./ai-landing-step-three";
import { AiLandingStepFour } from "./ai-landing-step-four";

export const StepList = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("not-prose", className)}>
      <h2
        className={clsx(
          "text-2xl",
          "font-semibold",
          "landing-sm:text-[32px] landing-sm:leading-[40px]",
          "pl-4 landing-sm:pl-10",
        )}
      >
        <span>Seamless workflow,</span>{" "}
        <span>
          <span
            className={clsx(
              "text-refine-indigo",
              "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.55)]",
              "dark:text-refine-green-alt",
              "dark:text-refine-react-dark-green-alt dark:drop-shadow-[0_0_30px_rgba(38,217,127,0.55)]",
            )}
          >
            step by step
            <span className={clsx("text-gray-900", "dark:text-white")}>.</span>
          </span>
        </span>
      </h2>
      <div
        className={clsx(
          "grid",
          "grid-cols-1 landing-md:grid-cols-2 landing-lg:grid-cols-1",
          "gap-6 landing-lg:gap-8",
          "mt-8 landing-lg:mt-12",
        )}
      >
        <StepContainer className="!gap-0 landing-md:gap-8">
          <AiLandingStepOne />
          <AiLandingStepInfo
            title="Go beyond simple prompts!"
            description="Don't limit yourself to words when describing your project. Refine AI can extract complex project specifications from API docs, design files, and various other resources."
            step={"01."}
          />
        </StepContainer>
        <StepContainer className="landing-lg:flex-row-reverse !gap-0 landing-md:gap-8">
          <AiLandingStepTwo />
          <AiLandingStepInfo
            title="Collaborative planning"
            description="Refine AI knows all the steps to build enterprise-grade, production-ready internal software. Before writing a single line of code, Refine AI ensures that all requirements and preferences are carefully gathered and validated."
            step={"02."}
          />
        </StepContainer>
        <StepContainer className="!gap-12 landing-md:gap-8">
          <AiLandingStepThree />
          <AiLandingStepInfo
            title="Vibe coding your internal software"
            description="Use natural language to add any CRUD functionality, new resources and components."
            step={"03."}
          />
        </StepContainer>
        <StepContainer className="landing-lg:flex-row-reverse">
          <AiLandingStepFour />
          <AiLandingStepInfo
            title="Download or deploy!"
            description="Download your project to continue development or deploy it with a single click for instant sharing."
            step={"04."}
          />
        </StepContainer>
      </div>
    </div>
  );
};

const StepContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-col landing-lg:flex-row",
        "justify-between",
        "gap-8",
        "items-center",
        className,
      )}
    >
      {children}
    </div>
  );
};
