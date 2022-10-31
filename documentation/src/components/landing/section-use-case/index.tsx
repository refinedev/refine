import React from "react";

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
        <motion.div
            ref={ref}
            className="h-auto px-4 -mt-px bg-white lg:h-screen lg:px-0"
        >
            <motion.div className="relative top-0 left-0 flex flex-col items-center justify-end w-screen h-auto max-w-full gap-24 pt-16 pb-6 overflow-x-hidden lg:pt-16 lg:pb-12 lg:h-screen lg:snap-start lg:sticky lg:gap-0">
                <div className="flex-1 flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row mx-auto max-w-[900px] w-full h-full items-center justify-center">
                    <div className="flex-1">
                        <div className="font-montserrat text-[#1890FF] text-[26px] leading-[26px] sm:text-[28px] sm:leading-[28px] lg:text-[30px] lg:leading-[36px] mb-0">
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
                        <div className="font-montserrat text-[16px] leading-[20px] tracking-tight text-[#2A2A42] mt-4 lg:mt-8 mb-0 max-w-[380px] ">
                            <p>
                                We are very happy to see how people are building
                                great things with{" "}
                                <strong className="text-bold">refine</strong>.
                                Share your{" "}
                                <span className="whitespace-nowrap">
                                    use-case
                                </span>{" "}
                                to get listed on the showcase page and receive{" "}
                                <strong className="text-bold">
                                    $100 Amazon Gift card
                                </strong>
                                .
                            </p>
                        </div>
                        <div className="flex items-center gap-8 mt-4 lg:mt-16">
                            <a
                                href="https://refinedev.typeform.com/to/Ypm6r6oj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shadow-startTiles  appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-[4px] cursor-pointer"
                            >
                                ADD YOURS{" "}
                                <span className="mx-1 font-normal">&</span>
                                WIN
                            </a>

                            {/* TODO - when UseCases page ready */}
                            {/* <a
                                href="https://refine.dev/docs/getting-started/overview/#use-cases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shadow-startTiles appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-[#1890FF] text-center bg-white rounded-[4px] cursor-pointer border border-solid border-[#EDEDEF]"
                            >
                                View UseCases
                            </a> */}
                        </div>
                    </div>
                    <div className="flex flex-1 w-full lg:w-auto">
                        <motion.div
                            className="relative flex flex-col items-center justify-end flex-1 w-full lg:w-auto lg:items-end"
                            whileInView={
                                !lg && md ? { scale: [0, 1] } : undefined
                            }
                            viewport={{
                                margin: "50px",
                            }}
                        >
                            <div className="w-full max-w-[260px] lg:max-w-[375px] absolute top-[-32px]">
                                <motion.img
                                    src="landing/giftcard.png"
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
                            </div>
                            <div className="w-full max-w-screen md:max-w-[350px] min-h-[200px] md:min-h-[330px] lg:max-w-[375px] flex justify-center items-end lg:min-h-[352px]">
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
