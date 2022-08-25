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
                    className="overflow-x-hidden snap-x snap-mandatory relative flex-1"
                    style={{ opacity: slideOpacity }}
                >
                    <motion.div
                        className="flex w-full h-full absolute"
                        style={{ x: slideX }}
                    >
                        {/* slide 01 */}
                        <div className="w-full flex-shrink-0 bg-red-300 snap-center">
                            <div></div>
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
