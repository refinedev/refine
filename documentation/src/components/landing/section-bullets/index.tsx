import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BenefitIcons } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionBullets = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);

    const { sm, md, lg, xl } = useTWBreakpoints();

    const { scrollYProgress: scrollYProgressIncoming } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: scrollYProgressInnerIncoming } = useScroll({
        target: innerRef,
        offset: ["start end", "end end"],
    });

    const { scrollYProgress: scrollYProgressOutgoing } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const whyNotY = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.25, 1],
        [100, -50, 0],
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

    React.useEffect(() => {
        return scrollYProgressIncoming.onChange(() => {
            console.log(
                "scrollYProgressIncoming",
                scrollYProgressIncoming.get(),
            );
        });
    });

    React.useEffect(() => {
        return scrollYProgressOutgoing.onChange(() => {
            console.log(
                "scrollYProgressOutgoing",
                scrollYProgressOutgoing.get(),
            );
        });
    });

    React.useEffect(() => {
        return scrollYProgressInnerIncoming.onChange(() => {
            console.log(
                "scrollYProgressInnerIncoming",
                scrollYProgressInnerIncoming.get(),
            );
        });
    });

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-auto lg:h-[100vh] bg-white">
            {/* Scroll animated section */}
            <motion.div
                ref={innerRef}
                className="h-auto lg:h-screen lg:snap-start overflow-x-hidden overflow-y-hidden w-screen top-0 left-0 relative lg:sticky pt-8 px-4 md:px-10 lg:px-16 xl:px-24 flex flex-col -mt-px"
            >
                <motion.div
                    className="flex items-center justify-center lg:pt-16 short:pt-14 lg:pb-4 opacity-100 px-2 lg:px-0"
                    // animate={
                    //     !lg
                    //         ? {
                    //               opacity: 1,
                    //               rotate: -2,
                    //               y: 0,
                    //           }
                    //         : {}
                    // }
                    style={
                        lg
                            ? {
                                  rotate: whyNotRotate,
                                  y: whyNotY,
                                  opacity: whyNotOpacity,
                              }
                            : undefined
                    }
                    whileInView={
                        lg
                            ? undefined
                            : {
                                  opacity: [0, 1],
                                  y: [100, 0],
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
                    <motion.div className="h-fit z-[1] px-1 lg:px-5 -mx-16 bg-[#1784EB] font-extrabold font-montserrat text-white uppercase text-[36px] leading-[36px] lg:text-[52px] lg:leading-[52px] py-0.5 lg:-rotate-3 shadow-startTiles flex">
                        why not both?
                    </motion.div>
                </motion.div>
                <motion.div
                    animate={!lg ? { opacity: 1, y: 0 } : {}}
                    style={
                        lg
                            ? {
                                  opacity: bulletsOpacity,
                                  y: bulletsY,
                              }
                            : { opacity: 1, y: 0 }
                    }
                    className="flex pt-12 short:pt-4 gap-5 max-w-6xl lg:px-3 mx-auto w-full justify-center flex-col"
                >
                    <div className="flex w-full flex-col gap-6 justify-center">
                        <div className="grid grid-cols-6 gap-4 lg:gap-4 place-items-center lg:place-items-start">
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.ChronoIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
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
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex-shrink-0 flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.SsrIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="flex-1 font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
                                        <div>
                                            <strong className="font-extrabold">
                                                SSR
                                            </strong>{" "}
                                            support with{" "}
                                        </div>
                                        <div className="flex items-center flex-row justify-center lg:justify-start lg: gap-3 pt-2">
                                            <BenefitIcons.NextjsIcon className="w-auto h-[12px] lg:h-[18px]" />
                                            <BenefitIcons.RemixIcon className="w-auto h-[12px] lg:h-[18px]" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.ReactIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
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
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.RouteIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
                                        Advanced routing with any{" "}
                                        <strong className="font-extrabold">
                                            router
                                        </strong>{" "}
                                        library of your choice
                                    </div>
                                </motion.div>
                            </div>
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.AuthIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
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
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.RealtimeIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
                                        Out-of-the-box support for{" "}
                                        <strong className="font-extrabold">
                                            live / realtime applications
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="col-span-3 lg:col-span-2 lg:col-start-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.AuditIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
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
                            <div className="col-span-3 lg:col-span-2 h-full flex w-full">
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
                                                  y: [100, 0],
                                                  x: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className="col-span-3 lg:col-span-2 rounded-2xl bg-white shadow-tile p-2 md:p-4 pt-3 pb-3 md:pt-4 md:pb-4 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between w-full lg:w-auto max-w-[400px]"
                                >
                                    <div className="flex justify-center mb-4 lg:mb-0 lg:block">
                                        <BenefitIcons.GlobalIcon className="h-[36px] lg:h-[50px]" />
                                    </div>
                                    <div className="flex-1 font-montserrat font-normal text-center lg:text-left text-sm lg:text-base leading-4 lg:leading-5 text-[#2A2A42] tracking-tight">
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
                    <div className="text-center font-montserrat font-medium text-lg lg:text-2xl text-[#2A2A42] pt-2 pb-6 lg:pb-2 lg:pt-2 tracking-wide">
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
            {/* <div className="hidden lg:block snap-start h-screen" /> */}
        </motion.div>
    );
};
