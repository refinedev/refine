import React from "react";
import Link from "@docusaurus/Link";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionUseCase: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const { sm, md, lg, xl } = useTWBreakpoints();

    return (
        // Scroll animated container
        <motion.div
            ref={ref}
            className="h-auto lg:h-screen lg:max-h-[650px] bg-white -mt-px"
        >
            {/* Scroll snap alignment */}
            {/* <div className="hidden lg:block snap-start h-screen lg:max-h-[550px]" /> */}
            {/* Scroll animated section */}
            <motion.div className="h-auto lg:h-screen lg:max-h-[650px] lg:snap-start w-screen top-0 left-0 relative lg:sticky pt-16 pb-12 flex flex-col items-center justify-end gap-24 lg:gap-0">
                <div className="w-full">
                    <div className="bg-[#F6F6F9] py-4 px-2 md:px-4 lg:px-6">
                        <div className="max-w-5xl mx-auto flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                            <div className="font-montserrat text-[18px] leading-[24px] font-extrabold text-[#2A2A42]">
                                NOW YOU’RE READY
                            </div>
                            <div className="flex gap-3 lg:gap-1 flex-col lg:flex-row">
                                <Link
                                    className="appearance-none flex justify-center items-center rounded-lg h-[38px] w-[210px] bg-gradient-to-r from-[#47EBF5] to-[#1890FF] font-montserrat font-bold text-base border-0 text-white"
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
                    <div className="bg-[#E1E1E4] py-4 px-2 md:px-4 lg:px-6">
                        <div className="max-w-5xl mx-auto flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                            <div className="font-montserrat text-[18px] leading-[24px] font-medium text-[#2A2A42]">
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
                                className="appearance-none flex justify-center items-center rounded-lg h-[38px] w-full max-w-[210px] bg-gradient-to-r from-[#47EBF5] to-[#1890FF] font-montserrat font-bold text-base border-0 text-white"
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
                <div className="flex-1 flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row max-w-[1080px] mx-auto w-full items-center justify-center px-4 md:px-6 lg:px-8">
                    <div className="flex-1">
                        <div className="font-montserrat text-[#1890FF] text-[26px] leading-[26px] sm:text-[28px] sm:leading-[28px] lg:text-[30px] lg:leading-[36px] mb-2.5">
                            <div className="font-medium">IF YOU’RE ALREADY</div>
                            <div className="font-medium">
                                USING{" "}
                                <span className="font-extrabold">refine,</span>
                            </div>
                            <div className="font-medium">
                                <span className="font-extrabold tracking-tight">
                                    SHARE
                                </span>{" "}
                                YOUR USECASE &
                            </div>
                            <div className="font-medium">
                                <span className="font-extrabold">INSPIRE</span>{" "}
                                OTHERS
                            </div>
                        </div>
                        <div className="font-montserrat text-[16px] leading-[20px] tracking-tight text-[#2A2A42] mb-2.5 max-w-[500px]">
                            <p>
                                We are very happy to see how people are building
                                great things with{" "}
                                <strong className="text-bold">refine</strong>.
                                Share your use-case to get listed on the
                                showcase page and receive{" "}
                                <strong className="text-bold">
                                    $100 Amazon Gift card
                                </strong>
                                .
                            </p>
                        </div>
                        <div className="flex lg:block justify-center">
                            <a
                                href="https://refinedev.typeform.com/to/Ypm6r6oj"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    boxShadow:
                                        "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                                }}
                                className="appearance-none block no-underline hover:text-white font-bold font-montserrat text-xl leading-[24px] py-3 w-60 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-lg cursor-pointer"
                            >
                                ADD YOURS <span className="font-normal">&</span>{" "}
                                WIN
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:w-auto flex">
                        <motion.div
                            className="flex-1 w-full lg:w-auto flex flex-col justify-end items-center lg:items-end relative"
                            whileInView={
                                !lg && md ? { scale: [0, 1] } : undefined
                            }
                            viewport={{
                                margin: "50px",
                            }}
                        >
                            <motion.img
                                src="landing/giftcard.png"
                                className="w-full max-w-[300px] lg:max-w-[330px] absolute top-0"
                                style={
                                    lg
                                        ? {
                                              opacity: cardOpacity,
                                          }
                                        : {}
                                }
                                animate={{
                                    translateY: ["20px", "0px"],
                                    rotate: ["-3deg", "0deg"],
                                    ...(!lg ? { opacity: [1, 1] } : {}),
                                }}
                                transition={{
                                    duration: 5,
                                    ease: "easeInOut",
                                    yoyo: Infinity,
                                }}
                            />
                            <div className="w-full max-w-screen md:max-w-[350px] min-h-[300px] md:min-h-[330px] lg:max-w-[330px] flex justify-center items-end lg:min-h-[300px]">
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        maxWidth: "200px",
                                        height: "200px",
                                        borderRadius: "999px",
                                        rotateX: "88deg",
                                        background: "#2A2A42",
                                        filter: "blur(50px)",
                                    }}
                                    animate={{
                                        opacity: [0.75, 0.2],
                                        width: ["200px", "300px"],
                                        height: ["200px", "300px"],
                                        bottom: ["-80px", "-130px"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        yoyo: Infinity,
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
