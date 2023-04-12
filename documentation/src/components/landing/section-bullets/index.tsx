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
                className="max-w-ful relative left-0 top-0 -mt-px flex h-auto flex-col overflow-x-hidden overflow-y-hidden pt-0 lg:h-screen lg:snap-start lg:pt-8"
            >
                <motion.div
                    className="short:pt-14 mt-8 flex items-center justify-center px-2 opacity-100 lg:px-0 lg:pb-4 lg:pt-8"
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
                    <motion.div className="font-montserrat shadow-startTiles z-[1] -mx-16 flex h-fit rounded-lg bg-[#1784EB] px-1 text-[36px] font-extrabold uppercase leading-[36px] text-white  lg:-rotate-3 lg:px-5 lg:text-[52px] lg:leading-[52px]">
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
                                        <div className="lg: flex flex-row items-center justify-center gap-3 pt-2 lg:justify-start">
                                            <BenefitIcons.NextjsIcon className="h-[12px] w-auto lg:h-[18px]" />
                                            <BenefitIcons.RemixIcon className="h-[12px] w-auto lg:h-[22px]" />
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
                    <div className="font-montserrat text-center text-base font-medium tracking-wide text-[#2A2A42] xl:text-xl">
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
