import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ChevronDown,
    MaterialUIIcon,
    AntDesignLogoIcon,
    BusinessLogic01,
    BusinessLogic02,
    BusinessLogic04,
    BusinessLogic03,
    BackendIcons,
    RefineAnimatedBgIcon,
} from "../icons";
import { CountingNumber } from "../counting-number";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import { ExternalLinkIcon } from "../icons/external-link-icon";

export const SectionNoConstraints: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { sm, md, lg, xl } = useTWBreakpoints();

    const [currentSlide, setCurrentSlide] = React.useState(1);

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

    const slideLeftBgDotY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["0%", "0%", "25%", "50%", "75%", "100%", "100%"],
    );

    const slideRightBgY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        ["200%", "150%", "75%", "50%", "25%", "0%", "-100%"],
    );

    const slideRightBgDotY = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [
            `${0}px`,
            `${0}px`,
            `${Math.floor((974 - 402) / 4)}px`,
            `${Math.floor((974 - 402) / 4) * 2}px`,
            `${Math.floor((974 - 402) / 4) * 3}px`,
            `${Math.floor(974 - 402)}px`,
            `${Math.floor(974 - 402)}px`,
        ],
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

    const backendScaleUp = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 2.1 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
    );

    const backendScaleDown = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 2.1 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [1.5, 1.5, 1.5, 1.5, 1, 1.5, 1.5, 1.5],
    );

    const backendOpacity = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 2.1 / 6, 3 / 6, 3.5 / 6, 4 / 6, 5 / 6, 1],
        [0, 0, 0, 0, 1, 1, 0, 0, 0],
    );

    const slideNumbers = useTransform(
        scrollYProgress,
        [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
        [1, 1, 1, 2, 3, 4, 5],
    );

    React.useEffect(() => {
        return slideNumbers.onChange(async () => {
            setCurrentSlide(Math.round(slideNumbers.get()));
        });
    });

    const slideOpacity = useTransform(
        scrollYProgress,
        [0, 5 / 6, 1],
        [1, 1, 0],
    );

    const backendItems = [
        {
            name: "Nestjs",
            Icon: BackendIcons.Nestjs,
            AltIcon: BackendIcons.NestjsAlt,
        },
        {
            name: "Airtable",
            Icon: BackendIcons.Airtable,
            AltIcon: BackendIcons.AirtableAlt,
        },
        {
            name: "Strapi",
            Icon: BackendIcons.Strapi,
            AltIcon: BackendIcons.StrapiAlt,
        },
        {
            name: "Supabase",
            Icon: BackendIcons.Supabase,
            AltIcon: BackendIcons.SupabaseAlt,
        },
        {
            name: "Hasura",
            Icon: BackendIcons.Hasura,
            AltIcon: BackendIcons.HasuraAlt,
        },
        {
            name: "Nhost",
            Icon: BackendIcons.Nhost,
            AltIcon: BackendIcons.NhostAlt,
        },
        {
            name: "Appwrite",
            Icon: BackendIcons.Appwrite,
            AltIcon: BackendIcons.AppwriteAlt,
        },
        {
            name: "Medusa",
            Icon: BackendIcons.Medusa,
            AltIcon: BackendIcons.MedusaAlt,
        },
        {
            name: "Firebase",
            Icon: BackendIcons.Firebase,
            AltIcon: BackendIcons.FirebaseAlt,
        },
        {
            name: "Directus",
            Icon: BackendIcons.Directus,
            AltIcon: BackendIcons.DirectusAlt,
        },
        {
            name: "Altogic",
            Icon: BackendIcons.Altogic,
            AltIcon: BackendIcons.AltogicAlt,
        },
        {
            name: "Node",
            Icon: BackendIcons.Node,
            AltIcon: BackendIcons.NodeAlt,
        },
        {
            name: "Python",
            Icon: BackendIcons.Python,
            AltIcon: BackendIcons.PythonAlt,
        },
        {
            name: "Json",
            Icon: BackendIcons.Json,
            AltIcon: BackendIcons.JsonAlt,
        },
        {
            name: "GraphQL",
            Icon: BackendIcons.Graphql,
            AltIcon: BackendIcons.GraphqlAlt,
        },
    ];

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
            <motion.div ref={ref} className="h-auto lg:h-[600vh] bg-white">
                {/* Scroll animated section */}
                <motion.div className="lg:overflow-hidden h-auto lg:h-screen w-screen top-0 left-0 relative lg:sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center py-[86px]">
                    <motion.div
                        className="hidden lg:block absolute -left-36 -top-24 z-[-1]"
                        style={{
                            translateY: slideLeftBgY,
                        }}
                    >
                        <RefineAnimatedBgIcon dotY={slideLeftBgDotY} />
                    </motion.div>
                    <motion.div
                        className="hidden lg:block absolute -right-36 -top-24 z-[-1]"
                        style={{
                            translateY: slideRightBgY,
                        }}
                    >
                        <RefineAnimatedBgIcon dotY={slideRightBgDotY} />
                    </motion.div>
                    <div className="w-full flex-shrink-0">
                        <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF]">
                            no constraints
                        </div>
                        <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden">
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
                        className="overflow-x-hidden lg:overflow-y-hidden lg:snap-x lg:snap-mandatory relative flex-1 lg:max-h-[600px]"
                        style={{ opacity: slideOpacity }}
                    >
                        <motion.div
                            className="flex w-full lg:h-full lg:absolute flex-col lg:flex-row"
                            style={lg ? { x: slideX } : {}}
                            animate={lg ? {} : { x: 0 }}
                        >
                            {/* slide 01 */}
                            <div className="w-full flex-shrink-0 lg:snap-center lg:h-full flex justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "500px",
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                    ...(lg
                                                        ? {
                                                              scale: slideScreen01Y,
                                                              opacity:
                                                                  slideScreen01Y,
                                                          }
                                                        : {}),
                                                }}
                                                animate={{
                                                    rotateY: ["10deg", "17deg"],
                                                    rotateX: [
                                                        "2.5deg",
                                                        "-2.5deg",
                                                    ],
                                                    ...(lg
                                                        ? {}
                                                        : {
                                                              scale: [1, 1],
                                                              opacity: [1, 1],
                                                          }),
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
                                                    ...(lg
                                                        ? {}
                                                        : {
                                                              scale: [1, 1],
                                                              opacity: [1, 1],
                                                          }),
                                                }}
                                                transition={{
                                                    yoyo: Infinity,
                                                    ease: "easeInOut",
                                                    duration: 3,
                                                }}
                                                style={{
                                                    boxShadow:
                                                        "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    ...(lg
                                                        ? {
                                                              scale: slideScreen01Y,
                                                              opacity:
                                                                  slideScreen01Y,
                                                          }
                                                        : {}),
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
                                            className="absolute"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                                padding: "50px",
                                                scale: slideScreen03Y,
                                                opacity: slideScreen03Y,
                                                translateY: "40px",
                                                translateX: "30px",
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
                                                className="relative lg:absolute w-full h-full left-0 top-0"
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
                                                    className="hidden lg:block font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px]"
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
                                                className="hidden lg:block font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px] mb-0"
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
                                                                <ExternalLinkIcon className="mr-1 mt-2" />
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
                                                                <ExternalLinkIcon className="mr-1 mt-2" />
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
                            <div className="flex lg:hidden w-full flex-shrink-0 lg:snap-center lg:h-full justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
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
                                                className="bg-white text-[34px] leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[60px] bottom-[50px]"
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
                                                }}
                                            >
                                                CUSTOM UI
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <div className="flex-[2] place-self-center">
                                        <div className="relative">
                                            <motion.div className="w-full h-full left-0 top-0">
                                                <motion.p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px]">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-24 lg:mb-0 flex lg:hidden w-full flex-shrink-0 lg:snap-center lg:h-full justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
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
                                                className="absolute right-[30px] bottom-[50px] flex gap-2 z-10 flex-col"
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
                                                style={{}}
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
                                                className="w-full h-full left-0 top-0"
                                                style={{
                                                    opacity:
                                                        slideScreenText12Progress,
                                                }}
                                            ></motion.div>
                                            <motion.div className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[400px] mb-0">
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
                                                                <ExternalLinkIcon className="mr-1 mt-2" />
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
                                                                <ExternalLinkIcon className="mr-1 mt-2" />
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
                            <div className="mb-24 lg:mb-0 w-full lg:h-full flex-shrink-0 lg:snap-center flex justify-center items-center">
                                <div className="flex pt-3 h-auto max-w-screen-xl w-full">
                                    <div className="flex-1 flex flex-col justify-start items-center w-full gap-4">
                                        <div className="font-montserrat text-xl leading-8 font-medium text-[#2A2A42] text-center max-w-[860px] mb-4">
                                            <p className="mb-0">
                                                <strong className="font-bold">
                                                    refine
                                                </strong>{" "}
                                                connects to any custom
                                                <strong className="font-bold">
                                                    REST
                                                </strong>{" "}
                                                or{" "}
                                                <strong className="font-bold">
                                                    GraphQL
                                                </strong>{" "}
                                                API.
                                            </p>
                                            <p className="mb-0">
                                                It also includes ready-made
                                                integrations for{" "}
                                                <strong className="font-bold">
                                                    30+
                                                </strong>{" "}
                                                popular backend services.
                                                <a className="no-underline text-[#1890FF] visited:text-[#1890FF]">
                                                    (SEE ALL)
                                                </a>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full px-5 gap-x-2 gap-y-5">
                                            {backendItems.map(
                                                (
                                                    { name, Icon, AltIcon },
                                                    index,
                                                ) => (
                                                    <motion.div
                                                        style={{
                                                            ...(lg
                                                                ? {
                                                                      scale:
                                                                          index %
                                                                              2 ===
                                                                          0
                                                                              ? backendScaleUp
                                                                              : backendScaleDown,
                                                                      opacity:
                                                                          backendOpacity,
                                                                  }
                                                                : {}),
                                                            boxShadow:
                                                                "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                                                        }}
                                                        animate={
                                                            lg
                                                                ? {}
                                                                : {
                                                                      opacity: [
                                                                          1, 1,
                                                                      ],
                                                                      scale: [
                                                                          1, 1,
                                                                      ],
                                                                  }
                                                        }
                                                        key={name}
                                                        className={`group relative w-full h-20 lg:h-[90px] bg-white rounded-[10px] ${
                                                            name === "Python"
                                                                ? "pt-1.5"
                                                                : "pt-0"
                                                        }`}
                                                    >
                                                        <div className="group-hover:opacity-0 scale-100 group-hover:scale-0 opacity-100 transition-all duration-300 w-full h-full flex justify-center items-center">
                                                            <AltIcon className="scale-75 lg:scale-100" />
                                                        </div>
                                                        <div
                                                            className={`opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 absolute left-0 ${
                                                                name ===
                                                                "Python"
                                                                    ? "top-1"
                                                                    : "top-0"
                                                            } w-full h-full flex justify-center items-center`}
                                                        >
                                                            <Icon className="scale-75 lg:scale-100" />
                                                        </div>
                                                    </motion.div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-24 lg:mb-0 w-full flex-shrink-0 lg:snap-center lg:h-full flex justify-center items-center">
                                <div className="flex h-auto max-w-screen-xl w-full flex-col lg:flex-row gap-20 md:gap-32 lg:gap-0">
                                    <div className="flex-1 flex relative -mx-6 lg:mx-0 px-[55px] pt-0 pb-4 lg:px-12 lg:pb-12 lg:pt-6 justify-center items-center">
                                        <motion.div
                                            style={{
                                                perspective: "1000px",
                                                perspectiveOrigin: "left top",
                                                ...(lg
                                                    ? {
                                                          scale: cardsSlideScaleAndOpacity,
                                                          opacity:
                                                              cardsSlideScaleAndOpacity,
                                                      }
                                                    : {}),
                                            }}
                                            animate={
                                                lg
                                                    ? {}
                                                    : {
                                                          scale: [1, 1],
                                                          opacity: [1, 1],
                                                      }
                                            }
                                            className="flex relative w-full max-w-[400px] h-full"
                                        >
                                            <motion.div
                                                className="bg-transparent h-min rounded-[20px]"
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
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                }}
                                            >
                                                <BusinessLogic02
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[10%] left-[19%] h-min rounded-[20px]"
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
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                }}
                                            >
                                                <BusinessLogic03
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[20%] left-[38%] h-min rounded-[20px]"
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
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                }}
                                            >
                                                <BusinessLogic04
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="bg-transparent absolute top-[30%] left-[55%] h-min rounded-[20px]"
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
                                                    boxShadow:
                                                        "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                                                }}
                                            >
                                                <BusinessLogic01
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <div className="flex-1 place-self-center ">
                                        <div className="max-w-[390px] font-montserrat ml-auto mr-auto lg:mr-0 lg:-ml-5 text-[#2A2A42]">
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
                            <div className="w-full flex-shrink-0 lg:snap-center lg:h-full flex justify-center items-center">
                                <div className="flex h-auto max-w-screen-xl w-full">
                                    <div className="flex-1 flex flex-col justif text-[#2A2A42] text-center max-w-[800px]y-center items-center w-full gap-4">
                                        <div className="font-montserrat text-xl pt-[14px] max-w-screen-lg">
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-2.5 w-full px-5 pb-5 max-w-[1000px]">
                                            <motion.div
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                                                style={
                                                    lg
                                                        ? {
                                                              rotateX:
                                                                  slideCounterCardsRotateX,
                                                              opacity:
                                                                  slideCounterCardsOpacity,
                                                          }
                                                        : {}
                                                }
                                                animate={
                                                    lg
                                                        ? {}
                                                        : {
                                                              rotateX: [0, 0],
                                                              opacity: [1, 1],
                                                          }
                                                }
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
                    <div className="hidden lg:block flex-shrink-0">
                        <div
                            className="w-full flex max-w-5xl mx-auto bg-white relative"
                            style={{
                                boxShadow:
                                    "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                            }}
                        >
                            <motion.div
                                style={{
                                    zIndex: currentSlide === 1 ? 2 : 0,
                                    color:
                                        currentSlide === 1
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                    borderColor:
                                        currentSlide === 1
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                }}
                                className="ml-px transition-colors duration-200 ease-in-out flex-1 uppercase font-montserrat font-medium text-lg text-center py-3 border border-solid"
                            >
                                headless ui
                            </motion.div>
                            <motion.div
                                style={{
                                    zIndex: currentSlide === 2 ? 2 : 0,
                                    color:
                                        currentSlide === 2
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                    borderColor:
                                        currentSlide === 2
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                }}
                                className="-ml-px transition-colors duration-200 ease-in-out flex-1 uppercase font-montserrat font-medium text-lg text-center py-3 border border-solid"
                            >
                                backend agnostic
                            </motion.div>
                            <motion.div
                                style={{
                                    zIndex: currentSlide === 3 ? 2 : 0,
                                    color:
                                        currentSlide === 3
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                    borderColor:
                                        currentSlide === 3
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                }}
                                className="-ml-px transition-colors duration-200 ease-in-out flex-1 uppercase font-montserrat font-medium text-lg text-center py-3 border border-solid"
                            >
                                custom workflow
                            </motion.div>
                            <motion.div
                                style={{
                                    zIndex: currentSlide === 4 ? 2 : 0,
                                    color:
                                        currentSlide === 4
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                    borderColor:
                                        currentSlide === 4
                                            ? "#1890FF"
                                            : "#A3D3FF",
                                }}
                                className="-ml-px transition-colors duration-200 ease-in-out flex-1 uppercase font-montserrat font-medium text-lg text-center py-3 border border-solid"
                            >
                                open source
                            </motion.div>
                            <div
                                className="absolute top-0 h-2.5 -mt-2 transition-all duration-200"
                                style={{
                                    left: `calc(${
                                        (currentSlide - 1) * 25
                                    }% + calc(12.5% - 3px))`,
                                }}
                            >
                                <ChevronDown />
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Scroll snap alignment */}
                {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                    <div
                        key={i}
                        className="hidden lg:block snap-start h-screen w-screen"
                    />
                ))}
            </motion.div>
        </>
    );
};
