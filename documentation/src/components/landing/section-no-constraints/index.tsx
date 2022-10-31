import React from "react";
import { useScroll } from "framer-motion";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import OnBackend from "./on-backend";
import OnWorkflow from "./on-workflow";
import WithOpenSource from "./with-open-source";
import OnStyling from "./on-styling";
import { Header } from "./header";
import SpotLight from "./spot-light";

export const SectionNoConstraints: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const twBreakpoints = useTWBreakpoints();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    return (
        <>
            <div className="relative mt-16 lg:mt-0 mx-auto px-6 xl:px-0 xl:max-w-[1024px] 2xl:max-w-[1280px]">
                {twBreakpoints.lg && (
                    <Header scrollYProgress={scrollYProgress} />
                )}

                {twBreakpoints.xl && (
                    <SpotLight scrollYProgress={scrollYProgress} />
                )}

                <div
                    ref={ref}
                    className="relative flex flex-col gap-16 lg:gap-0 "
                >
                    <OnStyling
                        scrollYProgress={scrollYProgress}
                        twBreakpoints={twBreakpoints}
                    />
                    <OnBackend
                        scrollYProgress={scrollYProgress}
                        twBreakpoints={twBreakpoints}
                    />
                    <OnWorkflow
                        scrollYProgress={scrollYProgress}
                        twBreakpoints={twBreakpoints}
                    />
                    <WithOpenSource
                        scrollYProgress={scrollYProgress}
                        twBreakpoints={twBreakpoints}
                    />
                </div>
            </div>
        </>
    );
};
