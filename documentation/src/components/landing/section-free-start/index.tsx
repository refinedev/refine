import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HikerIcon, RocketIcon } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import styles from "./styles.module.css";

export const SectionFreeStart: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { lg } = useTWBreakpoints();

    const { scrollYProgress: scrollYProgressIncoming } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: scrollYProgressOutgoing } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scroll = useTransform<number, number>(
        [scrollYProgressIncoming, scrollYProgressOutgoing],
        ([incoming, outgoing]) => {
            return incoming - outgoing;
        },
    );

    const leftCardOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const leftCardX = useTransform(scroll, [1, 0, -1], [-100, 0, -100]);
    const leftCardRotate = useTransform(
        scroll,
        [1, 0, -1],
        ["0deg", "-4deg", "0deg"],
    );
    const rightCardOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const rightCardX = useTransform(scroll, [1, 0, -1], [100, 0, 100]);
    const rightCardRotate = useTransform(
        scroll,
        [1, 0, -1],
        ["0deg", "4deg", "0deg"],
    );
    const orOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const orY = useTransform(scroll, [1, 0, -1], [200, 0, -200]);
    const orRotate = useTransform(scroll, [1, 0, -1], [-180, -5, 180]);

    return (
        <motion.div ref={ref} className="h-auto lg:h-[400px] bg-white mt-6">
            <motion.div className="relative top-0 left-0 flex flex-col justify-end w-screen h-full max-w-full px-4 pb-8 overflow-x-hidden lg:snap-start lg:sticky lg:pt-16 md:px-10 lg:px-16 xl:px-24">
                <div className="flex flex-col items-center justify-between w-full max-w-5xl gap-0 lg:flex-row lg:pt-12 lg:gap-7 lg:px-3 lg:mx-auto">
                    <motion.div
                        className={styles.card}
                        style={
                            lg
                                ? {
                                      translateX: leftCardX,
                                      opacity: leftCardOpacity,
                                      rotate: leftCardRotate,
                                  }
                                : {}
                        }
                        whileInView={
                            lg
                                ? undefined
                                : {
                                      opacity: [0, 1],
                                      translateX: [-100, 0],
                                      rotate: ["0deg", "0deg"],
                                  }
                        }
                        transition={
                            lg
                                ? undefined
                                : {
                                      duration: 0.3,
                                      ease: "easeInOut",
                                      delay: 0.2,
                                  }
                        }
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.cardTextContainer}>
                                <div className={styles.cardTitle}>START</div>
                                <div className={styles.cardSubtitle}>
                                    FROM SCRATCH
                                </div>
                                <div className={styles.cardText}>
                                    FOR FREEDOM
                                </div>
                            </div>
                            <HikerIcon
                                className={styles.hikerIcon}
                                width={200}
                                height={132}
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        style={
                            lg
                                ? {
                                      translateY: orY,
                                      opacity: orOpacity,
                                      rotate: orRotate,
                                  }
                                : { rotate: -3 }
                        }
                        whileInView={
                            lg
                                ? undefined
                                : {
                                      opacity: [0, 1],
                                      translateY: [200, 0],
                                      rotate: [-180, -5],
                                  }
                        }
                        transition={
                            lg
                                ? undefined
                                : {
                                      duration: 0.3,
                                      ease: "easeInOut",
                                      delay: 0.2,
                                  }
                        }
                        className="h-fit z-[1] px-5 -my-4 lg:my-0 lg:-mx-16 bg-[#3FDCF7] font-extrabold font-montserrat text-white uppercase text-[39px] leading-[42px] lg:text-[52px] lg:leading-[52px] py-0.5 -rotate-3 shadow-startTiles rounded-lg"
                    >
                        or
                    </motion.div>
                    <motion.div
                        className={styles.card}
                        style={
                            lg
                                ? {
                                      translateX: rightCardX,
                                      opacity: rightCardOpacity,
                                      rotate: rightCardRotate,
                                  }
                                : {}
                        }
                        whileInView={
                            lg
                                ? undefined
                                : {
                                      opacity: [0, 1],
                                      translateX: [100, 0],
                                      rotate: ["0deg", "0deg"],
                                  }
                        }
                        transition={
                            lg
                                ? undefined
                                : {
                                      duration: 0.3,
                                      ease: "easeInOut",
                                      delay: 0.3,
                                  }
                        }
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.cardTextContainer}>
                                <div className={styles.cardTitle}>USE</div>
                                <div className={styles.cardSubtitle}>
                                    A FRAMEWORK
                                </div>
                                <div className={styles.cardText}>
                                    FOR PRODUCTIVITY
                                </div>
                                <div className={styles.cardText}>
                                    AND ROBUSTNESS
                                </div>
                            </div>
                            <RocketIcon className="w-[28%] h-auto lg:w-[129px] lg:h-[129px]" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
