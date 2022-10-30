import React from "react";
import Link from "@docusaurus/Link";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowIcon, ChevronRight, ScrollIcon } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionHero: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { md, lg } = useTWBreakpoints();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const caretPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        ["26%", "0%"],
    );

    const bgPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0.5, 0.9],
        // Into these values:
        ["0%", "100%"],
    );

    const tileTextPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        ["0rem", "-4.5rem"],
    );

    const tileRotateRight = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        [-4, 4],
    );

    const tileRotateLeft = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        [4, -4],
    );

    return (
        // Scroll animated container
        <motion.div
            ref={ref}
            className="h-auto lg:h-[200vh]"
            style={{
                backgroundImage:
                    "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(18,105,186,1) 50%, rgba(18,105,186,1) 55%, rgba(24,144,255,1) 100%)",
                backgroundSize: "400vh 400vh",
                backgroundPositionY: bgPosition,
            }}
        >
            <div className="hidden w-full h-px -mb-px lg:snap-start lg:block" />
            {/* Scroll animated section */}
            <motion.div className="relative top-0 left-0 flex flex-col justify-center w-full h-auto max-w-screen-xl pt-16 mx-auto -mt-16 lg:h-screen lg:sticky px-7 md:px-10 lg:px-16 xl:px-24 lg:pt-0 short:pt-16 lg:mt-0">
                <div className="flex flex-col gap-12 pt-10 lg:pt-16 lg:flex-row lg:gap-0">
                    <div className="heading mx-auto lg:mx-0 flex flex-[2] gap-6 h-min">
                        <div className="caret-wrapper relative py-2.5 w-[33px]">
                            <motion.div
                                transition={
                                    !lg
                                        ? {
                                              yoyo: Infinity,
                                              ease: "easeInOut",
                                              duration: 3.5,
                                              delay: 0.5,
                                          }
                                        : {}
                                }
                                style={{
                                    position: "absolute",
                                    bottom: lg ? caretPosition : undefined,
                                }}
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              bottom: [
                                                  ...(md
                                                      ? [
                                                            "25%",
                                                            "25%",
                                                            "25%",
                                                            "25%",
                                                            "0%",
                                                            "0%",
                                                            "0%",
                                                            "0%",
                                                        ]
                                                      : [
                                                            "36%",
                                                            "36%",
                                                            "36%",
                                                            "36%",
                                                            "3%",
                                                            "3%",
                                                            "3%",
                                                            "3%",
                                                        ]),
                                              ],
                                          }
                                }
                            >
                                <ArrowIcon width={36} height={36} />
                            </motion.div>
                        </div>
                        <div className="line-wrapper text-white font-montserrat tracking-tighter leading-[32px] md:leading-[45px] lg:leading-[50px] xl:leading-[60px]">
                            <div className="font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.75rem]">
                                build your
                            </div>
                            <div className="font-normal text-[1.5rem] md:text-[1.825rem] lg:text-[2rem] xl:text-[3rem]">
                                REACT BASED
                            </div>
                            <div className="font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.75rem]">
                                CRUD applications
                            </div>
                            <div className="font-normal text-[1.5rem] md:text-[1.825rem] lg:text-[2rem] xl:text-[3rem]">
                                WITHOUT CONSTRAINTS
                            </div>
                        </div>
                    </div>
                    <div className="tiles flex-[1] mx-auto lg:mx-0 min-w-[270px] max-w-[270px] sm:max-w-none lg:min-w-0 flex flex-col uppercase font-montserrat text-lg sm:text-xl lg:text-2xl tracking-tight font-medium text-[#1890FF]">
                        <motion.div
                            transition={
                                !lg
                                    ? {
                                          yoyo: Infinity,
                                          ease: "easeInOut",
                                          duration: 3.5,
                                          delay: 0.5,
                                      }
                                    : {}
                            }
                            style={
                                lg
                                    ? {
                                          rotate: tileRotateLeft,
                                          translateX: -10,
                                      }
                                    : { translateX: -10 }
                            }
                            animate={
                                lg
                                    ? { translateY: -8 }
                                    : {
                                          rotate: [4, 4, 4, -4, -4, -4],
                                          translateY: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem] rounded-lg"
                        >
                            <motion.div
                                transition={
                                    !lg
                                        ? {
                                              yoyo: Infinity,
                                              ease: "easeInOut",
                                              duration: 3.5,
                                              delay: 0.5,
                                          }
                                        : {}
                                }
                                style={
                                    lg
                                        ? {
                                              translateY: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              translateY: [
                                                  "0rem",
                                                  "0rem",
                                                  "0rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                              ],
                                          }
                                }
                            >
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    admin panels
                                </span>
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    headless ui
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            transition={
                                !lg
                                    ? {
                                          yoyo: Infinity,
                                          ease: "easeInOut",
                                          duration: 3.5,
                                          delay: 0.5,
                                      }
                                    : {}
                            }
                            style={
                                lg
                                    ? {
                                          rotate: tileRotateRight,
                                          translateX: 10,
                                      }
                                    : { translateX: 10 }
                            }
                            animate={
                                lg
                                    ? { translateY: -8 }
                                    : {
                                          rotate: [-4, -4, -4, 4, 4, 4],
                                          translateY: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem] rounded-lg"
                        >
                            <motion.div
                                transition={
                                    !lg
                                        ? {
                                              yoyo: Infinity,
                                              ease: "easeInOut",
                                              duration: 3.5,
                                              delay: 0.5,
                                          }
                                        : {}
                                }
                                style={
                                    lg
                                        ? {
                                              translateY: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              translateY: [
                                                  "0rem",
                                                  "0rem",
                                                  "0rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                              ],
                                          }
                                }
                            >
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    dashboards
                                </span>
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    backend agnostic
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            transition={
                                !lg
                                    ? {
                                          yoyo: Infinity,
                                          ease: "easeInOut",
                                          duration: 3.5,
                                          delay: 0.5,
                                      }
                                    : {}
                            }
                            style={
                                lg
                                    ? {
                                          rotate: tileRotateLeft,
                                          translateX: -10,
                                      }
                                    : { translateX: -10 }
                            }
                            animate={
                                lg
                                    ? { translateY: -8 }
                                    : {
                                          rotate: [4, 4, 4, -4, -4, -4],
                                          translateY: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem] rounded-lg"
                        >
                            <motion.div
                                transition={
                                    !lg
                                        ? {
                                              yoyo: Infinity,
                                              ease: "easeInOut",
                                              duration: 3.5,
                                              delay: 0.5,
                                          }
                                        : {}
                                }
                                style={
                                    lg
                                        ? {
                                              translateY: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              translateY: [
                                                  "0rem",
                                                  "0rem",
                                                  "0rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                              ],
                                          }
                                }
                            >
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    storefronts
                                </span>
                                <span className="absolute block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    custom workflow
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            transition={
                                !lg
                                    ? {
                                          yoyo: Infinity,
                                          ease: "easeInOut",
                                          duration: 3.5,
                                          delay: 0.5,
                                      }
                                    : {}
                            }
                            style={
                                lg
                                    ? {
                                          rotate: tileRotateRight,
                                          translateX: 10,
                                      }
                                    : { translateX: 10 }
                            }
                            animate={
                                lg
                                    ? { translateY: -8 }
                                    : {
                                          rotate: [-4, -4, -4, 4, 4, 4],
                                          translateY: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem] rounded-lg"
                        >
                            <motion.div
                                transition={
                                    !lg
                                        ? {
                                              yoyo: Infinity,
                                              ease: "easeInOut",
                                              duration: 3.5,
                                              delay: 0.5,
                                          }
                                        : {}
                                }
                                style={
                                    lg
                                        ? {
                                              translateY: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              translateY: [
                                                  "0rem",
                                                  "0rem",
                                                  "0rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                                  "-4.5rem",
                                              ],
                                          }
                                }
                            >
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    internal tools
                                </span>
                                <span className="block w-full text-center py-[23px] sm:py-[18px] p-[18px] h-[4.5rem]">
                                    open source
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <div className="flex flex-col-reverse max-w-lg gap-2 pt-12 pb-8 mx-auto lg:flex-row sm:pt-16 lg:pt-24 short:pt-10 short:pb-4 lg:gap-0 lg:mx-0 lg:max-w-none">
                    <div className="flex flex-col flex-1 gap-4 px-0 -mx-4 lg:flex-row md:px-8 lg:px-12">
                        <Link
                            className="flex flex-1 justify-center items-center appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 md:px-0 xl:px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:shadow-xl bg-gradient-to-l from-[#1890FF] to-[#47EBF5]"
                            to="/docs"
                        >
                            Start Tutorial
                        </Link>
                        <Link
                            className="flex items-center justify-center flex-1 gap-3 px-4 py-3 text-xl font-bold text-center text-white no-underline appearance-none font-montserrat md:px-0 xl:px-4 focus:outline-none"
                            href="/docs/getting-started/overview"
                        >
                            Read the docs <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex flex-row justify-end flex-1 gap-1 px-0 -mx-4 md:px-8 lg:px-12">
                        <div>
                            <a
                                href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=light&period=daily"
                                    alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt"
                                    width="250"
                                    height="54"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="items-center justify-center hidden pb-5 lg:flex short:mt-auto lg:mt-6 short:pb-7">
                    <motion.button
                        className="appearance-none border-none bg-none bg-transparent flex w-auto items-center justify-center gap-2.5"
                        animate={{ translateY: [-10, 10] }}
                        transition={{
                            yoyo: Infinity,
                            ease: "easeInOut",
                            duration: 1.5,
                        }}
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.scrollTo({
                                    top: window.innerHeight * 2,
                                    behavior: "smooth",
                                });
                            }
                        }}
                    >
                        <span className="text-xs text-right text-white uppercase font-montserrat w-14">
                            scroll
                        </span>
                        <ScrollIcon className="text-white cursor-pointer" />
                        <span className="text-xs text-left text-white uppercase font-montserrat w-14">
                            down
                        </span>
                    </motion.button>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="hidden w-screen h-screen max-w-full lg:snap-start lg:block" />
            {/* Scroll snap alignment */}
        </motion.div>
    );
};
