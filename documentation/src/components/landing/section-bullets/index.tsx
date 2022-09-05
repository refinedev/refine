import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    CrossIcon,
    HeartCodeIcon,
    ScrollIcon,
    ShieldIcon,
    TripleIcon,
    BenefitIcons,
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
    const innerRef = React.useRef<HTMLDivElement>(null);

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

    const scrollYProgress = useTransform<number, number>(
        [scrollYProgressIncoming, scrollYProgressOutgoing],
        ([incoming, outgoing]) => {
            return incoming - outgoing;
        },
    );

    const whyNotY = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.5],
        [100, 0],
    );

    const whyNotRotate = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.75, 1],
        [0, -3, -1.5],
    );

    const whyNotOpacity = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.5, 1],
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
        <motion.div ref={ref} className="h-[200vh] lg:h-[100vh] bg-white">
            {/* Scroll animated section */}
            <motion.div
                ref={innerRef}
                className="h-screen w-screen top-0 left-0 sticky pt-8 px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col"
            >
                <motion.div
                    className="flex items-center justify-center pt-16 pb-4"
                    style={{
                        rotate: whyNotRotate,
                        y: whyNotY,
                        opacity: whyNotOpacity,
                    }}
                >
                    <motion.div className="h-fit z-[1] px-5 -mx-16 bg-[#1784EB] font-extrabold font-montserrat text-white uppercase text-[52px] leading-[52px] py-0.5 -rotate-3 shadow-startTiles flex">
                        why not both?
                    </motion.div>
                </motion.div>
                <motion.div
                    style={{
                        opacity: bulletsOpacity,
                        y: bulletsY,
                    }}
                    className="flex pt-12 gap-7 max-w-6xl px-3 mx-auto w-full justify-center flex-col"
                >
                    <div className="flex w-full flex-col gap-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 0,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.ChronoIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
                                    <strong className="font-extrabold">
                                        1-minute
                                    </strong>{" "}
                                    setup with a single{" "}
                                    <strong className="font-extrabold">
                                        CLI command
                                    </strong>
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 0.5,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div className="flex-shrink-0">
                                    <BenefitIcons.SsrIcon />
                                </div>
                                <div className="flex-1 font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
                                    <div>
                                        <strong className="font-extrabold">
                                            SSR
                                        </strong>{" "}
                                        support with{" "}
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <BenefitIcons.NextjsIcon
                                            width="auto"
                                            height={18}
                                        />
                                        <BenefitIcons.RemixIcon
                                            width="auto"
                                            height={18}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 1,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.ReactIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 1.5,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.RouteIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
                                    Advanced routing with any{" "}
                                    <strong className="font-extrabold">
                                        router
                                    </strong>{" "}
                                    library of your choice
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 2,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.AuthIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
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
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 2.5,
                                }}
                                className="rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.RealtimeIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
                                    Out-of-the-box support for
                                    <strong className="font-extrabold">
                                        live / real-time applications
                                    </strong>
                                </div>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 3,
                                }}
                                className="col-span-2 col-start-2 rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.AuditIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
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
                            <motion.div
                                animate={{ scale: [1, 1.02] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    delay: 3.5,
                                }}
                                className="col-span-2 rounded-2xl bg-white shadow-tile p-6 pb-7 flex gap-6 items-center justify-between w-full max-w-[400px]"
                            >
                                <div>
                                    <BenefitIcons.GlobalIcon />
                                </div>
                                <div className="font-montserrat font-normal text-base leading-5 text-[#2A2A42] tracking-tight">
                                    Support for any{" "}
                                    <strong className="font-extrabold">
                                        i18n
                                    </strong>{" "}
                                    framework
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-5 place-content-center w-full">
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
                    <div className="flex pt-12 gap-7 max-w-5xl px-3 mx-auto w-full justify-center">
                        <p className="text-center">
                            <p className="font-medium font-montserrat text-2xl text-[#2A2A42]">
                                With{" "}
                                <strong className="font-bold">refine</strong>{" "}
                                you can have it all
                            </p>
                            <p className="font-medium font-montserrat text-2xl text-[#2A2A42]">
                                without compromising your freedom or facing
                                constraints.
                            </p>
                        </p>
                    </div> */}
                </motion.div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen" />
            <div className="snap-start h-screen lg:hidden" />
        </motion.div>
    );
};
