import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BenefitIcons } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import styles from "./styles.module.css";

export const SectionBullets = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);

    const { lg } = useTWBreakpoints();

    const { scrollYProgress: scrollYProgressInnerIncoming } = useScroll({
        target: innerRef,
        offset: ["start end", "end end"],
    });

    const whyNotY = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.25, 1],
        [100, -50, 24],
    );

    const whyNotRotate = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.75, 1],
        [0, -3, -1.5],
    );

    const whyNotOpacity = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.25, 1],
        [0, 1, 1],
    );

    const bulletsOpacity = useTransform(
        scrollYProgressInnerIncoming,
        [0.75, 1],
        [0, 1],
    );

    const bulletsY = useTransform(
        scrollYProgressInnerIncoming,
        [0.75, 1],
        [180, 0],
    );

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-auto bg-white lg:h-screen">
            {/* Scroll animated section */}
            <motion.div
                ref={innerRef}
                className="relative top-0 left-0 flex flex-col w-screen h-auto pt-0 -mt-px overflow-x-hidden overflow-y-hidden lg:pt-8 max-w-ful lg:h-screen lg:snap-start"
            >
                <motion.div
                    className="flex items-center justify-center px-2 mt-8 opacity-100 lg:pt-8 short:pt-14 lg:pb-4 lg:px-0"
                    // animate={
                    //     !lg
                    //         ? {
                    //               opacity: 1,
                    //               rotate: -2,
                    //               translateY: 0,
                    //           }
                    //         : {}
                    // }
                    style={
                        lg
                            ? {
                                  rotate: whyNotRotate,
                                  translateY: whyNotY,
                                  opacity: whyNotOpacity,
                              }
                            : undefined
                    }
                    whileInView={
                        lg
                            ? undefined
                            : {
                                  opacity: [0, 1],
                                  translateY: [100, 0],
                                  rotate: [0, -3],
                              }
                    }
                    transition={
                        lg
                            ? undefined
                            : {
                                  repeat: 0,
                                  duration: 0.3,
                                  ease: "easeInOut",
                                  delay: 0.3,
                              }
                    }
                >
                    <motion.div className="h-fit z-[1] px-1 lg:px-5 -mx-16 bg-[#1784EB] font-extrabold font-montserrat text-white uppercase text-[36px] leading-[36px] lg:text-[52px] lg:leading-[52px]  lg:-rotate-3 shadow-startTiles flex rounded-lg">
                        why not both?
                    </motion.div>
                </motion.div>
                <motion.div
                    animate={!lg ? { opacity: 1, translateY: 0 } : {}}
                    style={
                        lg
                            ? {
                                  opacity: bulletsOpacity,
                                  translateY: bulletsY,
                              }
                            : { opacity: 1, translateY: 0 }
                    }
                    className={styles.container}
                >
                    <div className={styles.gridWrapper}>
                        <div className={styles.gridContainer}>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 0,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.ChronoIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        <strong className="font-extrabold">
                                            1-minute
                                        </strong>{" "}
                                        setup with a single{" "}
                                        <strong className="font-extrabold">
                                            CLI command
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 0.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.SsrIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        <div>
                                            <strong className="font-extrabold">
                                                SSR
                                            </strong>{" "}
                                            support with{" "}
                                        </div>
                                        <div className="flex flex-row items-center justify-center gap-3 pt-2 lg:justify-start lg:">
                                            <BenefitIcons.NextjsIcon className="w-auto h-[12px] lg:h-[18px]" />
                                            <BenefitIcons.RemixIcon className="w-auto h-[12px] lg:h-[22px]" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 1,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.ReactIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Perfect{" "}
                                        <strong className="font-extrabold">
                                            state management
                                        </strong>{" "}
                                        &{" "}
                                        <strong className="font-extrabold">
                                            mutations
                                        </strong>{" "}
                                        with{" "}
                                        <strong className="font-extrabold">
                                            React Query
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 1.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.RouteIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Advanced routing with any{" "}
                                        <strong className="font-extrabold">
                                            router
                                        </strong>{" "}
                                        library of your choice
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 2,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.AuthIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Providers for seamless{" "}
                                        <strong className="font-extrabold">
                                            authentication
                                        </strong>{" "}
                                        &{" "}
                                        <strong className="font-extrabold">
                                            access control
                                        </strong>{" "}
                                        flows
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 2.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.RealtimeIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Out-of-the-box support for{" "}
                                        <strong className="font-extrabold">
                                            live&nbsp;/&nbsp;realtime
                                            applications
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 3,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.AuditIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Easy{" "}
                                        <strong className="font-extrabold">
                                            audit logs
                                        </strong>{" "}
                                        &{" "}
                                        <strong className="font-extrabold">
                                            document versioning
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 3.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardText}>
                                        <BenefitIcons.GlobalIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        Support for any{" "}
                                        <strong className="font-extrabold">
                                            i18n
                                        </strong>{" "}
                                        framework
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center font-montserrat font-medium text-base xl:text-xl text-[#2A2A42] tracking-wide">
                        <p className="mb-0">
                            With <strong className="font-bold">refine</strong>{" "}
                            you can have it all without compromising
                        </p>
                        <p className="mb-0">
                            your freedom or facing constraints.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
            {/* Scroll snap alignment */}
            {/* <div className="hidden h-screen lg:block snap-start" /> */}
        </motion.div>
    );
};
