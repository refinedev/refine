import Link from "@docusaurus/Link";
import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC } from "react";
import { TWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import { ExternalLinkIcon } from "../icons/external-link-icon";
import { HeaderMobile } from "./header";

interface Props {
    scrollYProgress: MotionValue<number>;
    twBreakpoints: TWBreakpoints;
}

const OnStyling: FC<Props> = ({ scrollYProgress, twBreakpoints }) => {
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

    const opacityImage1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const translateYImage1 = useTransform(
        scrollYProgress,
        [0, 0.15],
        [0, -1000],
    );

    const opacityImage2 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            className="relative z-[1]"
            style={twBreakpoints.lg ? { opacity } : {}}
            whileInView={
                twBreakpoints.lg
                    ? {}
                    : {
                          opacity: 1,
                      }
            }
        >
            <div className="h-[1px] lg:snap-start bg-transparent" />
            {!twBreakpoints.lg && <HeaderMobile>On Styling</HeaderMobile>}
            <motion.div
                className="relative lg:sticky top-0 flex md:flex-row flex-col-reverse items-center justify-center h-auto lg:h-screen pt-4 lg:pt-[11rem]"
                style={
                    twBreakpoints.lg
                        ? {
                              opacity: opacityImage1,
                              translateY: translateYImage1,
                          }
                        : {}
                }
            >
                <motion.div className="relative flex flex-[1] item-start md:items-center h-full pointer-events-none 2xl:pr-16">
                    <p className="font-montserrat font-medium text-base 2xl:text-xl tracking-tight leading-[20px] max-w-[280px] 2xl:max-w-none mb-0 text-[#2A2A42] lg:translate-y-[-80%]">
                        <strong className="font-bold">refine</strong> is{" "}
                        <strong className="font-bold">
                            headless by design.
                        </strong>{" "}
                        <div>
                            It doesn’t ship with any pre-styled components or UI
                            by default.
                        </div>
                        <br />
                        <div>
                            Instead, you can use any{" "}
                            <strong className="font-bold">custom design</strong>{" "}
                            or{" "}
                            <strong className="font-bold">UI framework</strong>{" "}
                            for{" "}
                            <strong className="font-bold">
                                100% control over styling.
                            </strong>
                        </div>
                    </p>
                </motion.div>

                <motion.div
                    className="relative flex-[1] md:flex-[2]"
                    style={{
                        perspective: "500px",
                        perspectiveOrigin: "center",
                    }}
                    whileInView={
                        twBreakpoints.lg
                            ? {}
                            : {
                                  scale: [0, 1],
                              }
                    }
                >
                    <motion.img
                        className="z-[1]"
                        style={{
                            filter: "drop-shadow(14.4px 7.2px 21.6px rgba(0, 0, 0, 0.25))",
                            width: "100%",
                            maxWidth: "870px",
                            maxHeight: "644px",
                        }}
                        animate={{
                            translateZ: ["-5px", "5px"],
                        }}
                        transition={{
                            ease: "easeInOut",
                            duration: 3,
                            delay: 1,
                        }}
                        src="/landing/no-constraints/custom-ui.png"
                    />
                    <motion.div
                        className="font-montserrat bg-[#2A2A42] text-white text-xs md:text-2xl font-extrabold px-4 py-2 rounded-md absolute shadow-startTiles left-[10%] bottom-[26%] z-50"
                        initial={{
                            translateZ: "10px",
                        }}
                        transition={{
                            yoyo: Infinity,
                            ease: "easeInOut",
                            duration: 3,
                        }}
                    >
                        CUSTOM UI
                    </motion.div>
                </motion.div>
            </motion.div>
            <motion.div
                className="flex md:flex-row flex-col-reverse items-center justify-center mt-16 lg:mt-0 h-auto lg:h-screen lg:snap-start pt-0 lg:pt-[11rem]"
                style={twBreakpoints.lg ? { opacity: opacityImage2 } : {}}
                whileInView={
                    twBreakpoints.lg
                        ? {}
                        : {
                              opacity: 1,
                          }
                }
            >
                <div className="flex flex-[1] flex-col font-montserrat font-medium text-base 2xl:text-xl 2xl:pr-16 text-[#2A2A42]">
                    <div className="lg:translate-y-[-80%]">
                        <p>
                            Not ready for going headless yet?
                            <div>
                                <strong className="font-bold">
                                    No problem.
                                </strong>
                            </div>
                        </p>

                        <p>
                            <strong className="font-bold">refine</strong>{" "}
                            supports four powerful
                            <div>
                                <strong className="font-bold">
                                    UI frameworks
                                </strong>{" "}
                                out-of-the box:
                            </div>
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="">
                                <Link
                                    to="/examples"
                                    className="z-[1] border border-[#F0F2F5] bg-[#F6F6F9] border-solid rounded-[20px] h-7 w-[153px] flex items-center justify-between pl-3 py-1 pr-1"
                                >
                                    <div className="uppercase text-[#9696B4] text-[12px] leading-[12px] font-montserrat font-bold">
                                        view examples
                                    </div>
                                    <div className="flex items-center justify-center w-5 h-5 pl-px bg-white rounded-full">
                                        <ExternalLinkIcon className="h-2.5 w-2.5 text-[#9696B4]" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="relative flex-[1] md:flex-[2]"
                    style={{
                        perspective: "500px",
                        perspectiveOrigin: "center",
                    }}
                    whileInView={
                        twBreakpoints.lg
                            ? {}
                            : {
                                  scale: [0, 1],
                              }
                    }
                >
                    <motion.img
                        className="z-[1]"
                        style={{
                            filter: "drop-shadow(14.4px 7.2px 21.6px rgba(0, 0, 0, 0.25))",
                            width: "100%",
                            maxWidth: "870px",
                            maxHeight: "644px",
                        }}
                        animate={{
                            translateZ: ["-5px", "5px"],
                        }}
                        transition={{
                            yoyo: Infinity,
                            ease: "easeInOut",
                            duration: 3,
                            delay: 1,
                        }}
                        src="/landing/no-constraints/dashboard-mui.png"
                    />
                    <motion.div
                        className="absolute left-0 md:left-[-40px] flex flex-col gap-1 md:gap-4 bottom-9 z-50"
                        initial={{
                            translateZ: "10px",
                        }}
                    >
                        <div className="font-montserrat flex justify-center bg-[#3FDCF7] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            ANT DESIGN
                        </div>
                        <div className="translate-x-[50%] md:translate-x-[40%] font-montserrat flex justify-center bg-[#1890FF] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            MATERIAL UI
                        </div>
                        <div className="translate-x-[120%] md:translate-x-[105%] font-montserrat flex justify-center bg-[#105FA9] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            MANTINE UI
                        </div>
                        <div className="translate-x-[180%] md:translate-x-[150%] font-montserrat flex justify-center bg-[#450D87] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            CHAKRA UI
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default OnStyling;
