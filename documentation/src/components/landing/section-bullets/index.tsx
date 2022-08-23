import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    CrossIcon,
    HeartCodeIcon,
    ScrollIcon,
    ShieldIcon,
    TripleIcon,
} from "../icons";

const Bullet = ({ icon, title, children, scrollYProgress }) => {
    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [-180, 0, 0, 180],
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [0, 1, 1, 0],
    );

    return (
        <motion.div
            className="flex items-center gap-4"
            style={{ rotateX, opacity }}
        >
            <div className="shadow-startTiles rounded-[10px] h-24 w-24 flex justify-center items-center">
                {icon}
            </div>
            <div className="max-w-[223px] flex flex-col gap-2">
                <div className="font-montserrat font-black text-xl leading-6 text-[#2A2A42]">
                    {title}
                </div>
                <div className="font-montserrat font-normal text-sm leading-4 text-[#2A2A42]">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export const SectionBullets = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress: scrollYProgressIncoming } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: scrollYProgressOutgoing } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scrollYProgress = useTransform<number, number>(
        [scrollYProgressIncoming, scrollYProgressOutgoing],
        ([incoming, outgoing]) => {
            return incoming - outgoing;
        },
    );

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-[100vh] bg-white">
            {/* Scroll animated section */}
            <motion.div className="h-screen w-screen top-0 left-0 sticky pt-8 px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col">
                <div className="flex pt-12 gap-7 max-w-5xl px-3 mx-auto w-full items-center">
                    <div className="grid grid-cols-2 gap-5 place-content-center w-full">
                        <Bullet
                            scrollYProgress={scrollYProgress}
                            icon={<TripleIcon />}
                            title="FAST"
                        >
                            Up to 3x increase in speed of development. (*)
                        </Bullet>
                        <Bullet
                            scrollYProgress={scrollYProgress}
                            icon={<ShieldIcon />}
                            title="FUTURE-PROOF"
                        >
                            Robust architecture, full test coverage and no
                            technical debt.
                        </Bullet>
                        <Bullet
                            scrollYProgress={scrollYProgress}
                            icon={<CrossIcon />}
                            title="UNIVERSAL"
                        >
                            Single framework for internal tools and
                            customer-facing apps. SSR included.
                        </Bullet>
                        <Bullet
                            scrollYProgress={scrollYProgress}
                            icon={<HeartCodeIcon />}
                            title="1-MINUTE SETUP"
                        >
                            Start your project with a single CLI command.
                        </Bullet>
                    </div>
                    <div>{/* images */}</div>
                </div>
                <div className="flex pt-12 gap-7 max-w-5xl px-3 mx-auto w-full justify-center">
                    <p className="text-center">
                        <p className="font-medium font-montserrat text-2xl text-[#2A2A42]">
                            With <strong className="font-bold">refine</strong>{" "}
                            you can have it all
                        </p>
                        <p className="font-medium font-montserrat text-2xl text-[#2A2A42]">
                            without compromising your freedom or facing
                            constraints.
                        </p>
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <motion.button
                        className="appearance-none border-none bg-none bg-transparent flex w-auto items-center justify-center gap-2.5"
                        animate={{ y: [0, 6] }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            yoyo: Infinity,
                        }}
                    >
                        <span className="uppercase text-xs text-[#136DC1] font-montserrat w-28 text-right">
                            scroll down
                        </span>
                        <ScrollIcon className="text-[#136DC1]" />
                        <span className="uppercase text-xs text-[#136DC1] font-montserrat w-28 text-left">
                            to learn how
                        </span>
                    </motion.button>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen" />
        </motion.div>
    );
};
