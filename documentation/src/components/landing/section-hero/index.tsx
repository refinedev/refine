import React from "react";
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

export const SectionHero: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scrollButtonControls = useAnimationControls();

    React.useEffect(() => {
        return scrollYProgress.onChange(async () => {
            if (scrollYProgress.get() >= 0.3) {
                await scrollButtonControls.start({
                    y: 40,
                });
                scrollButtonControls.start({
                    y: [40, 46],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            } else {
                await scrollButtonControls.start({ y: 0 });
                scrollButtonControls.start({
                    y: [0, 6],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            }
        });
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
            className="h-[200vh]"
            style={{
                backgroundImage:
                    "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(18,105,186,1) 50%, rgba(18,105,186,1) 55%, rgba(24,144,255,1) 100%)",
                backgroundSize: "400vh 400vh",
                backgroundPositionY: bgPosition,
            }}
        >
            {/* Scroll animated section */}
            <motion.div className="h-screen w-screen top-0 left-0 sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center">
                <div className="flex pt-16 flex-col lg:flex-row">
                    <div className="heading flex flex-[2] gap-6 h-min">
                        <div className="caret-wrapper relative py-2.5 w-[33px]">
                            <motion.div
                                style={{
                                    position: "absolute",
                                    bottom: caretPosition,
                                }}
                            >
                                <ArrowIcon />
                            </motion.div>
                        </div>
                        <div className="line-wrapper text-white font-montserrat tracking-tighter leading-[60px]">
                            <div className="font-extrabold text-[3.75rem]">
                                build your
                            </div>
                            <div className="font-normal text-[3rem]">
                                REACT BASED
                            </div>
                            <div className="font-extrabold text-[3.75rem]">
                                CRUD applications
                            </div>
                            <div className="font-normal text-[3rem]">
                                WITHOUT CONSTRAINTS
                            </div>
                        </div>
                    </div>
                    <div className="tiles flex-[1] flex flex-col uppercase font-montserrat text-2xl tracking-tight font-medium text-[#1890FF]">
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 1,
                            }}
                            style={{
                                rotate: tileRotateLeft,
                                x: -10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    admin panels
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    headless ui
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 0,
                            }}
                            style={{
                                rotate: tileRotateRight,
                                x: 10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    dashboards
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    backend agnostic
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 3,
                            }}
                            style={{
                                rotate: tileRotateLeft,
                                x: -10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    storefronts
                                </span>
                                <span className="absolute block w-full text-center p-[18px] h-[4.5rem]">
                                    custom workflow
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 1.7,
                            }}
                            style={{
                                rotate: tileRotateRight,
                                x: 10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    internal tools
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    open source
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row pt-24 pb-8">
                    <div className="flex flex-col lg:flex-row flex-1 gap-4 px-4 md:px-8 lg:px-12">
                        <a
                            className="flex flex-1 justify-center items-center appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:shadow-xl bg-gradient-to-l from-[#1890FF] to-[#47EBF5]"
                            href=""
                        >
                            Start Tutorial
                        </a>
                        <a
                            className="flex flex-1 justify-center items-center gap-3 appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 focus:outline-none"
                            href=""
                        >
                            Read the docs <ChevronRight />
                        </a>
                    </div>
                    <div className="flex flex-row flex-1 gap-1 justify-end px-4 md:px-8 lg:px-12 opacity-80">
                        <div>
                            <a
                                href="https://www.producthunt.com/posts/refine-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-refine&#0045;2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=319164&theme=dark"
                                    alt="refine - Open&#0032;Source&#0032;React&#0032;Framework | Product Hunt"
                                    style={{ width: "250px", height: "54px" }}
                                    className="w-[250px] h-[54px] bg-[#211d21] rounded-tl-xl rounded-bl-xl"
                                />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://github.com/pankod/refine"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#211d21] no-underline rounded-tr-xl rounded-br-xl h-[54px] flex gap-2 pl-3.5 py-2.5 pr-2.5 items-center"
                            >
                                <GithubIcon />
                                <div className="font-bold font-montserrat text-base text-white">
                                    Star
                                </div>
                                <div className="flex items-start h-full">
                                    <CloudTipIcon className="mt-2 -mr-px" />
                                    <div className="cloud rounded-md bg-white text-[#211d21] h-full flex items-center justify-center px-1.5 font-montserrat font-bold text-base">
                                        {`${githubStarCount}`.padStart(4, "0")}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <motion.button
                        className="appearance-none border-none bg-none bg-transparent flex w-auto items-center justify-center gap-2.5"
                        animate={scrollButtonControls}
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
            <div className="snap-start h-screen w-screen" />
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen w-screen" />
        </motion.div>
    );
};
