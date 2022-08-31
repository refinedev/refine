import React from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import {
    ChevronDown,
    MaterialUIIcon,
    AntDesignLogoIcon,
    RefineBgIcon,
    BusinessLogic01,
    BusinessLogic02,
    BusinessLogic04,
    BusinessLogic03,
} from "../icons";
import { CountingNumber } from "../counting-number";

export const SectionNoConstraints: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress: fullScrollYProgress } = useScroll();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const { scrollYProgress: scrollYInScreenProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    React.useEffect(() => {
        return scrollYProgress.onChange(async () => {
            console.log("S", scrollYProgress.get());
        });
    });

    React.useEffect(() => {
        return scrollYInScreenProgress.onChange(async () => {
            console.log("I", scrollYInScreenProgress.get());
        });
    });

    const slideX = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["0%", "0%", "0%", "-100%", "-200%", "-300%", "-500%"],
    );

    const slideLeftBgY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["100%", "0%", "-25%", "-50%", "-75%", "-100%", "-200%"],
    );

    const slideRightBgY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["200%", "150%", "75%", "50%", "25%", "0%", "-100%"],
    );

    const slide01ScreenProgress = useTransform<number, number>(
        [scrollYInScreenProgress, scrollYProgress],
        ([i, s]) => {
            return Math.max(i - s * 6, 0);
        },
    );

    const slideScreenText12Progress = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6],
        [1, 1, 0],
    );

    const slideScreenText2Progress = useTransform(
        scrollYProgress,
        [0, 1 / 6],
        [0, 1],
    );

    const slideScreenText3Progress = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6],
        [0, 0, 1],
    );

    const slideScreen01Y = useTransform(slide01ScreenProgress, [0, 1], [0, 1]);

    const slideScreen02Y = useTransform(scrollYProgress, [0, 1 / 6], [0, 1]);

    const slideScreen03Y = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6],
        [0, 0, 1],
    );

    const cardsSlideScaleAndOpacity = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [0, 0, 0, 0, 1, 0, 0],
    );

    const slideSubtitleY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [0, 0, 0, -36, -36 * 2, -36 * 3, -36 * 4],
    );

    const slideCounterCardsRotateX = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["90deg", "90deg", "90deg", "90deg", "90deg", "0deg", "0deg"],
    );

    const slideCounterCardsOpacity = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [0, 0, 0, 0, 0.5, 1, 1],
    );

    React.useEffect(() => {
        return slideScreen03Y.onChange(async () => {
            console.log("CCC", slideScreen03Y.get());
        });
    });

    const slideOpacity = useTransform(
        scrollYProgress,
        [0, 5 / 6, 1],
        [1, 1, 0],
    );

    return (
        <>
            {/* // Scroll animated container */}
            {/* <motion.div
                className="absolute left-0"
                style={{
                    top: "600vh",
                }}
            >
                <RefineBgIcon />
            </motion.div> */}
            <motion.div ref={ref} className="h-[600vh] bg-white">
                {/* Scroll animated section */}
                <motion.div className="overflow-hidden h-screen w-screen top-0 left-0 sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center py-[86px]">
                    <motion.div
                        className="absolute -left-36 -top-24 z-[-1]"
                        style={{
                            translateY: slideLeftBgY,
                        }}
                    >
                        <RefineBgIcon />
                    </motion.div>
                    <motion.div
                        className="absolute -right-36 -top-24 z-[-1]"
                        style={{
                            translateY: slideRightBgY,
                        }}
                    >
                        <RefineBgIcon />
                    </motion.div>
                    <div className="w-full flex-shrink-0">
                        <div className="w-full text-center font-montserrat text-[90px] leading-none font-extrabold text-[#1890FF]">
                            no constraints
                        </div>
                        <div className="w-full font-medium uppercase text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden">
                            <motion.div
                                className="absolute left-0 top-0 w-full"
                                style={{ y: slideSubtitleY }}
                            >
                                <div className="w-full h-9 text-center">
                                    on styling
                                </div>
                                <div className="w-full h-9 text-center">
                                    on backend
                                </div>
                                <div className="w-full h-9 text-center">
                                    on your workflow
                                </div>
                                <div className="w-full h-9 text-center">
                                    with open software
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        className="overflow-x-hidden overflow-y-hidden snap-x snap-mandatory relative flex-1"
                        style={{ opacity: slideOpacity }}
                    >
                        <motion.div
                            className="flex w-full h-full absolute"
                            style={{ x: slideX }}
                        >
                            {/* slide 01 */}
                            <div className="w-full flex-shrink-0 snap-center h-full">
                                <div className="flex h-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                                padding: "50px",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "500px",
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    scale: slideScreen01Y,
                                                    opacity: slideScreen01Y,
                                                }}
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                    delay: 1,
                                                }}
                                                src="/landing/no-constraints/custom-ui.png"
                                            />
                                            <motion.div
                                                className="bg-white text-[34px] leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[100px] bottom-[50px]"
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                style={{
                                                    boxShadow:
                                                        "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    scale: slideScreen01Y,
                                                    opacity: slideScreen01Y,
                                                }}
                                            >
                                                HEADLESS UI
                                            </motion.div>
                                        </motion.div>
                                        <motion.div
                                            className="absolute"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                                padding: "50px",
                                                scale: slideScreen02Y,
                                                opacity: slideScreen02Y,
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "500px",
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    scale: slideScreen02Y,
                                                    opacity: slideScreen02Y,
                                                }}
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                src="/landing/no-constraints/custom-ui-2.png"
                                            />
                                            <motion.div
                                                className="bg-white text-[34px] leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[100px] bottom-[50px]"
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                style={{
                                                    boxShadow:
                                                        "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    scale: slideScreen02Y,
                                                    opacity: slideScreen02Y,
                                                }}
                                            >
                                                CUSTOM UI
                                            </motion.div>
                                        </motion.div>
                                        <motion.div
                                            className="absolute right-10 bottom-2"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                                padding: "50px",
                                                scale: slideScreen03Y,
                                                opacity: slideScreen03Y,
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "500px",
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    scale: slideScreen03Y,
                                                    opacity: slideScreen03Y,
                                                }}
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                src="/landing/no-constraints/custom-ui-3.png"
                                            />
                                            <motion.div
                                                className="absolute right-[50px] bottom-[70px] flex gap-2 z-10"
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                    translateZ: [
                                                        "50px",
                                                        "50px",
                                                    ],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                style={{
                                                    scale: slideScreen03Y,
                                                    opacity: slideScreen03Y,
                                                }}
                                            >
                                                <div
                                                    className="bg-white text-[28px] leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2EBBFB]"
                                                    style={{
                                                        boxShadow:
                                                            "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    }}
                                                >
                                                    ANT DESIGN
                                                </div>
                                                <div
                                                    className="bg-white text-[28px] leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#247EF8]"
                                                    style={{
                                                        boxShadow:
                                                            "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    }}
                                                >
                                                    MATERIAL UI
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <div className="flex-[2] place-self-center">
                                        <div className="relative">
                                            <motion.div
                                                className="absolute w-full h-full left-0 top-0"
                                                style={{
                                                    opacity:
                                                        slideScreenText12Progress,
                                                }}
                                            >
                                                <p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px] mb-0">
                                                    <strong className="font-bold">
                                                        refine
                                                    </strong>{" "}
                                                    is{" "}
                                                    <strong className="font-bold">
                                                        headless by design.
                                                    </strong>{" "}
                                                </p>
                                                <p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px]">
                                                    It doesn’t ship with any
                                                    pre-styled components or UI
                                                    by default.
                                                </p>
                                                <motion.p
                                                    className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px]"
                                                    style={{
                                                        opacity:
                                                            slideScreenText2Progress,
                                                    }}
                                                >
                                                    Instead, you can use any{" "}
                                                    <strong className="font-bold">
                                                        custom design
                                                    </strong>
                                                    or{" "}
                                                    <strong className="font-bold">
                                                        UI framework
                                                    </strong>{" "}
                                                    for
                                                    <strong className="font-bold">
                                                        100% control over
                                                        styling.
                                                    </strong>
                                                </motion.p>
                                            </motion.div>
                                            <motion.div
                                                className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px] mb-0"
                                                style={{
                                                    opacity:
                                                        slideScreenText3Progress,
                                                }}
                                            >
                                                <p className="mb-0">
                                                    Not ready for going headless
                                                    yet?
                                                </p>
                                                <p>
                                                    <strong className="font-bold">
                                                        No problem.
                                                    </strong>
                                                </p>
                                                <p className="mb-0">
                                                    <strong className="font-bold">
                                                        refine
                                                    </strong>{" "}
                                                    supports two powerful
                                                </p>
                                                <p>
                                                    <strong className="font-bold">
                                                        UI frameworks
                                                    </strong>{" "}
                                                    out-of-the box:
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <div className="flex items-center gap-2.5 max-w-[300px]">
                                                            <AntDesignLogoIcon className="z-10" />
                                                            <div className="font-montserrat font-medium text-[21px] flex-1">
                                                                ANT DESIGN
                                                            </div>
                                                            <div className="w-0.5 bg-slate-400 h-8" />
                                                            <a className="text-[#9595A1] text-xs font-montserrat">
                                                                view demo
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2.5 max-w-[300px]">
                                                            <MaterialUIIcon />
                                                            <div className="font-montserrat font-medium text-[21px] flex-1">
                                                                MATERIAL UI
                                                            </div>
                                                            <div className="w-0.5 bg-slate-400 h-8" />
                                                            <a className="text-[#9595A1] text-xs font-montserrat">
                                                                view demo
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex-shrink-0 bg-red-600 snap-center">
                                asdasdasd
                            </div>
                            <div className="w-full flex-shrink-0 snap-center h-full">
                                <div className="flex h-full">
                                    <div className="flex-1 flex relative p-12 pt-6 justify-center items-center">
                                        <motion.div
                                            style={{
                                                perspective: "1000px",
                                                perspectiveOrigin: "left top",
                                                scale: cardsSlideScaleAndOpacity,
                                                opacity:
                                                    cardsSlideScaleAndOpacity,
                                            }}
                                            className="flex relative w-full max-w-[400px] h-full"
                                        >
                                            <motion.div
                                                className="bg-transparent"
                                                animate={{
                                                    rotateY: ["10deg", "20deg"],
                                                    rotateX: ["5deg", "-5deg"],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                    delay: 0,
                                                }}
                                                style={{
                                                    width: "45%",
                                                }}
                                            >
                                                <BusinessLogic02
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: "20px",
                                                        boxShadow:
                                                            "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[10%] left-[19%]"
                                                animate={{
                                                    rotateY: ["10deg", "20deg"],
                                                    rotateX: ["5deg", "-5deg"],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                    delay: 0,
                                                }}
                                                style={{
                                                    width: "45%",
                                                }}
                                            >
                                                <BusinessLogic03
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: "20px",
                                                        boxShadow:
                                                            "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[20%] left-[38%]"
                                                animate={{
                                                    rotateY: ["10deg", "20deg"],
                                                    rotateX: ["5deg", "-5deg"],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                    delay: 0,
                                                }}
                                                style={{
                                                    width: "45%",
                                                }}
                                            >
                                                <BusinessLogic04
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: "20px",
                                                        boxShadow:
                                                            "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[30%] left-[55%]"
                                                animate={{
                                                    rotateY: ["10deg", "20deg"],
                                                    rotateX: ["5deg", "-5deg"],
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                    delay: 0,
                                                }}
                                                style={{
                                                    width: "45%",
                                                }}
                                            >
                                                <BusinessLogic01
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: "20px",
                                                        boxShadow:
                                                            "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    }}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <div className="flex-1 place-self-center ">
                                        <div className="max-w-[390px] font-montserrat -ml-5 text-[#2A2A42]">
                                            <p className="text-xl max-w-[360px]">
                                                <strong>refine</strong> gives
                                                you and your team{" "}
                                                <strong>100% control</strong>{" "}
                                                over your project and totally
                                                prevents vendor lock-in:
                                            </p>
                                            <p className="text-base">
                                                <ul>
                                                    <li>
                                                        Write your code as you
                                                        are developing a vanilla
                                                        React project.
                                                    </li>
                                                    <li>
                                                        Add unlimited 3rd party
                                                        modules and
                                                        integrations.
                                                    </li>
                                                    <li>
                                                        Use your own source
                                                        control, CI & CD
                                                        systems.
                                                    </li>
                                                    <li>
                                                        Deploy your application
                                                        anywhere, including edge
                                                        & cloud workers.
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex-shrink-0 snap-center h-full">
                                <div className="flex h-full w-full">
                                    <div className="flex-1 flex flex-col justify-center items-center w-full gap-4">
                                        <div className="font-montserrat text-xl text-[#2A2A42] text-center max-w-[800px]">
                                            <p>
                                                <strong>refine</strong> core is
                                                an open source framework and it
                                                will always{" "}
                                                <strong>stay free</strong>.
                                            </p>
                                            <p>
                                                It has a very strong community
                                                of maintainers, contributers and
                                                and users providing{" "}
                                                <strong>7/24</strong> support on
                                                our Github, Twitter and Discord
                                                channels.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-2.5 w-full px-5 pb-5 max-w-[1000px]">
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={63} />
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center">
                                                    Contributors
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={1600} />
                                                    +
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center">
                                                    Commits
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={2500} />
                                                    +
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center">
                                                    GitHub Stars
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={300} />+
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center">
                                                    Discord Members
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={650} />+
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center">
                                                    Twitter Followers
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                style={{
                                                    rotateX:
                                                        slideCounterCardsRotateX,
                                                    opacity:
                                                        slideCounterCardsOpacity,
                                                }}
                                                className="rounded-[10px] p-2.5 bg-white shadow-tile min-h-[120px] flex flex-col justify-center relative"
                                            >
                                                <div className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] text-center">
                                                    &times;
                                                </div>
                                                <div className="font-montserrat font-bold text-xl text-center pb-4">
                                                    Come to our side
                                                </div>
                                                <div className="flex gap-6 justify-center">
                                                    <div className="w-8 h-8 bg-red-100 rounded-full" />
                                                    <div className="w-8 h-8 bg-red-100 rounded-full" />
                                                    <div className="w-8 h-8 bg-red-100 rounded-full" />
                                                    <div className="w-8 h-8 bg-red-100 rounded-full" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="flex-shrink-0">
                        <div
                            className="w-full flex max-w-5xl mx-auto bg-white"
                            style={{
                                boxShadow:
                                    "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                            }}
                        >
                            <div className="flex-1 uppercase font-montserrat font-medium text-[#1890FF] text-lg text-center py-3 border border-[#1890FF] border-solid">
                                headless ui
                            </div>
                            <div className="flex-1 uppercase font-montserrat font-medium text-[#1890FF] text-lg text-center py-3 border border-[#1890FF] border-solid">
                                backend agnostic
                            </div>
                            <div className="flex-1 uppercase font-montserrat font-medium text-[#1890FF] text-lg text-center py-3 border border-[#1890FF] border-solid">
                                custom workflow
                            </div>
                            <div className="flex-1 uppercase font-montserrat font-medium text-[#1890FF] text-lg text-center py-3 border border-[#1890FF] border-solid">
                                open source
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Scroll snap alignment */}
                {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                    <div key={i} className="snap-start h-screen w-screen" />
                ))}
            </motion.div>
        </>
    );
};
