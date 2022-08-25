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

const slideScrollProgress = 1 / 6;

export const SectionNoConstraints: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    React.useEffect(() => {
        return scrollYProgress.onChange(async () => {
            console.log(scrollYProgress.get());
        });
    });

    const slideX = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["0%", "-100%", "-200%", "-300%", "-400%", "-500%", "-700%"],
    );

    const slideOpacity = useTransform(
        scrollYProgress,
        [0, 5 / 6, 1],
        [1, 1, 0],
    );

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-[600vh] bg-white">
            {/* Scroll animated section */}
            <motion.div className="h-screen w-screen overflow-hidden top-0 left-0 sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center py-[86px]">
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
                        <div className="w-full flex-shrink-0 snap-center">
                            <div className="flex">
                                <motion.div
                                    className="flex-[3] flex justify-center items-center relative"
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
                                        }}
                                        animate={{
                                            rotateY: ["20deg", "27deg"],
                                            rotateX: ["2.5deg", "-2.5deg"],
                                        }}
                                        transition={{
                                            yoyo: Infinity,
                                            ease: "easeInOut",
                                            duration: 3,
                                        }}
                                        src="/landing/no-constraints/custom-ui.png"
                                    />
                                    <motion.div
                                        className="bg-white text-[34px] leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[100px] bottom-[50px]"
                                        animate={{
                                            rotateY: ["20deg", "27deg"],
                                            rotateX: ["2.5deg", "-2.5deg"],
                                        }}
                                        transition={{
                                            yoyo: Infinity,
                                            ease: "easeInOut",
                                            duration: 3,
                                        }}
                                        style={{
                                            boxShadow:
                                                "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                        }}
                                    >
                                        HEADLESS UI
                                    </motion.div>
                                </motion.div>
                                <div className="flex-[2] place-self-center">
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
                                        It doesn’t ship with any pre-styled
                                        components or UI by default.
                                    </p>
                                    {/* <p>
                                        Instead, you can use any{" "}
                                        <strong>custom design</strong>
                                        or <strong>UI framework</strong> for
                                        <strong>
                                            100% control over styling.
                                        </strong>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex-shrink-0 bg-red-400 snap-center">
                            asdasdasd
                        </div>
                        <div className="w-full flex-shrink-0 bg-red-500 snap-center">
                            asdasdasd
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
                        className="w-full flex max-w-5xl mx-auto"
                        style={{
                            boxShadow: "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
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
    );
};
