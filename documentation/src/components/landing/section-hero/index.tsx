import React from "react";
import Link from "@docusaurus/Link";
import {
    motion,
    useScroll,
    useTransform,
    useAnimationControls,
} from "framer-motion";
import {
    ArrowIcon,
    ChevronRight,
    CloudTipIcon,
    GithubIcon,
    ScrollIcon,
} from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionHero: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { md, lg, xl } = useTWBreakpoints();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scrollButtonControls = useAnimationControls();

    React.useEffect(() => {
        return scrollYProgress.onChange(async () => {
            if (scrollYProgress.get() >= 0.3) {
                if (lg) {
                    await scrollButtonControls.start({
                        y: 40,
                    });
                }
                scrollButtonControls.start({
                    y: !lg ? [-10, 10] : [40, 46],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            } else {
                if (lg) {
                    await scrollButtonControls.start({ y: 0 });
                }
                scrollButtonControls.start({
                    y: !lg ? [-10, 10] : [0, 6],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            }
        });
    }, [lg]);

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

    const token = "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";
    const repo = "refine";
    const org = "pankod";

    const [githubStarCount, setGithubStarCount] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(
                `https://api.github.com/repos/${org}/${repo}?access_token=${token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    },
                },
            );

            const json = await response.json();

            setGithubStarCount(json.stargazers_count);
        })();
    }, []);

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
            {/* Scroll animated section */}
            <motion.div className="h-auto lg:h-screen w-screen max-w-screen-xl mx-auto w-full top-0 left-0 relative lg:sticky px-7 md:px-10 lg:px-16 xl:px-24 pt-16 lg:pt-0 flex flex-col justify-center">
                <div className="flex pt-16 flex-col lg:flex-row gap-12 lg:gap-0">
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
                                <ArrowIcon />
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
                                          x: -10,
                                      }
                                    : { x: -10 }
                            }
                            animate={
                                lg
                                    ? { y: -8 }
                                    : {
                                          rotate: [4, 4, 4, -4, -4, -4],
                                          y: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
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
                                              y: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              y: [
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
                                          x: 10,
                                      }
                                    : { x: 10 }
                            }
                            animate={
                                lg
                                    ? { y: -8 }
                                    : {
                                          rotate: [-4, -4, -4, 4, 4, 4],
                                          y: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
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
                                              y: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              y: [
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
                                          x: -10,
                                      }
                                    : { x: -10 }
                            }
                            animate={
                                lg
                                    ? { y: -8 }
                                    : {
                                          rotate: [4, 4, 4, -4, -4, -4],
                                          y: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
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
                                              y: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              y: [
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
                                          x: 10,
                                      }
                                    : { x: 10 }
                            }
                            animate={
                                lg
                                    ? { y: -8 }
                                    : {
                                          rotate: [-4, -4, -4, 4, 4, 4],
                                          y: -8,
                                      }
                            }
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
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
                                              y: tileTextPosition,
                                          }
                                        : {}
                                }
                                animate={
                                    lg
                                        ? {}
                                        : {
                                              y: [
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
                <div className="flex flex-col-reverse lg:flex-row pt-12 sm:pt-16 lg:pt-24 pb-8 gap-2 lg:gap-0 mx-auto lg:mx-0 max-w-lg lg:max-w-none">
                    <div className="flex flex-col lg:flex-row flex-1 gap-4 -mx-4 px-0 md:px-8 lg:px-12">
                        <Link
                            className="flex flex-1 justify-center items-center appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:shadow-xl bg-gradient-to-l from-[#1890FF] to-[#47EBF5]"
                            to="/docs"
                        >
                            Start Tutorial
                        </Link>
                        <Link
                            className="flex flex-1 justify-center items-center gap-3 appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 focus:outline-none"
                            href="/docs/getting-started/overview"
                        >
                            Read the docs <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex flex-row flex-1 gap-1 justify-end -mx-4 px-0 md:px-8 lg:px-12">
                        <div>
                            <a
                                href="https://www.producthunt.com/posts/refine-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-refine&#0045;2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=319164&theme=dark"
                                    alt="refine - Open&#0032;Source&#0032;React&#0032;Framework | Product Hunt"
                                    className="w-full lg:w-[250px] h-[54px] bg-[#211d21] rounded-tl-xl rounded-bl-xl"
                                />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://github.com/pankod/refine"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#211d21] no-underline rounded-tr-xl rounded-br-xl h-[54px] flex gap-2 pl-3.5 py-2.5 pr-2.5 items-center justify-center lg:justify-start"
                            >
                                <GithubIcon />
                                <div className="hidden sm:block font-bold font-montserrat text-base text-white">
                                    Star
                                </div>
                                <div className="flex items-start h-full">
                                    <CloudTipIcon className="mt-2 -mr-px" />
                                    <div className="cloud rounded-md bg-white text-[#211d21] h-full flex items-center justify-center px-1.5 font-montserrat font-bold text-base">
                                        {`${githubStarCount ?? "0"}`.padStart(
                                            4,
                                            "0",
                                        )}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                    <motion.button
                        className="appearance-none border-none bg-none bg-transparent flex w-auto items-center justify-center gap-2.5"
                        animate={
                            lg
                                ? scrollButtonControls
                                : {
                                      y: [-10, 10],
                                  }
                        }
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
                        <span className="uppercase text-xs text-white font-montserrat w-14 text-right">
                            scroll
                        </span>
                        <ScrollIcon className="text-white" />
                        <span className="uppercase text-xs text-white font-montserrat w-14 text-left">
                            down
                        </span>
                    </motion.button>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="snap-start hidden lg:block h-screen w-screen" />
            <div className="snap-start hidden lg:block h-screen w-screen" />
            {/* Scroll snap alignment */}
        </motion.div>
    );
};
