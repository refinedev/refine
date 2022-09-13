import React from "react";
import Link from "@docusaurus/Link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionBanners: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const { sm, md, lg, xl } = useTWBreakpoints();

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-auto lg:h-[240px] bg-white -mt-px">
            {/* Scroll snap alignment */}
            {/* <div className="hidden lg:block lg:snap-center h-0" /> */}
            {/* Scroll animated section */}
            <motion.div className="h-auto lg:h-[240px] lg:snap-center w-screen top-0 left-0 relative lg:sticky pt-16 flex flex-col items-center justify-end gap-24 lg:gap-0">
                <div className="w-full">
                    <div className="bg-[#F6F6F9] py-9 px-6">
                        <div className="max-w-5xl mx-auto flex items-center justify-between flex-col lg:flex-row gap-6 lg:gap-0">
                            <div className="font-montserrat text-2xl font-extrabold text-[#2A2A42]">
                                NOW YOU’RE READY
                            </div>
                            <div className="flex gap-3 lg:gap-1 flex-col lg:flex-row">
                                <Link
                                    className="appearance-none flex justify-center items-center rounded-lg h-12 w-[270px] bg-gradient-to-r from-[#47EBF5] to-[#1890FF] font-montserrat font-bold text-xl border-0 text-white"
                                    style={{
                                        boxShadow:
                                            "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                                    }}
                                    href="/docs"
                                >
                                    Start Tutorial
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#E1E1E4] py-9 px-6">
                        <div className="max-w-5xl mx-auto flex items-center justify-between flex-col lg:flex-row gap-6 lg:gap-0">
                            <div className="font-montserrat text-2xl leading-[24px] font-medium text-[#2A2A42]">
                                <div>NEED ANY FURTHER INFORMATION?</div>
                                <div>
                                    SET UP 1X1 WITH A{" "}
                                    <strong className="font-bold">
                                        refine
                                    </strong>{" "}
                                    ENGINEER.
                                </div>
                            </div>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://calendly.com/d/cmk-5gb-b2p/meet-refine"
                                className="appearance-none flex justify-center items-center rounded-lg h-12 w-full max-w-[270px] bg-gradient-to-r from-[#47EBF5] to-[#1890FF] font-montserrat font-bold text-xl border-0 text-white"
                                style={{
                                    boxShadow:
                                        "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                                }}
                            >
                                Book a session
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
