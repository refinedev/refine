import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ChevronDown,
    MaterialUIIcon,
    AntDesignLogoIcon,
    RefineBgIcon,
} from "../icons";

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
                        <div className="w-full">
                            {/* change this */}
                            <div className="font-medium uppercase text-4xl leading-none font-montserrat text-[#1890FF] text-center">
                                on styling
                            </div>
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
                            <div className="w-full flex-shrink-0 bg-red-500 snap-center">
                                asdasdasd
                            </div>
                            <div className="w-full flex-shrink-0 bg-red-600 snap-center">
                                asdasdasd
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
