import React from "react";
import Link from "@docusaurus/Link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ChevronDown,
    BusinessLogic01,
    BusinessLogic02,
    BusinessLogic04,
    BusinessLogic03,
    BackendIcons,
    RefineAnimatedBgIcon,
    GraySocialIcons,
    SmallSocialIcons,
    ColoredSocialIcons,
} from "../icons";
import { CountingNumber } from "../counting-number";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import { ExternalLinkIcon } from "../icons/external-link-icon";

export const SectionNoConstraints: React.FC<{ starCount?: number }> = ({
    starCount,
}) => {
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
        ["0%", "0%", "0%", "-25%", "-50%", "-75%", "-100%"],
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
        [0, 5 / 6, 5.5 / 6],
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
            <motion.div
                ref={ref}
                className="h-auto lg:h-[600vh] bg-white -mt-px"
            >
                <div className="hidden lg:block snap-start h-0 w-screen max-w-full" />
                <div className="hidden lg:snap-start lg:block h-px w-full -mb-px" />
                {/* Scroll animated section */}
                <motion.div className="lg:overflow-hidden h-auto lg:h-screen w-screen max-w-full top-0 left-0 relative lg:sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center pt-[86px] pb-[50px]">
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
                        <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                            no constraints
                        </div>
                        <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden short:text-[24px] short:leading-[24px] short:h-6">
                            <motion.div
                                className="absolute left-0 top-0 w-full"
                                style={{ translateY: slideSubtitleY }}
                            >
                                <div className="w-full h-9 short:h-6 text-center">
                                    on styling
                                </div>
                                <div className="w-full h-9 short:h-6 text-center">
                                    on backend
                                </div>
                                <div className="w-full h-9 short:h-6 text-center">
                                    on your workflow
                                </div>
                                <div className="w-full h-9 short:h-6 text-center">
                                    with open software
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        className="overflow-x-visible lg:overflow-x-hidden lg:overflow-y-hidden lg:snap-x lg:snap-mandatory relative flex-1 lg:max-h-[600px]"
                        style={lg ? { opacity: slideOpacity } : {}}
                    >
                        <motion.div
                            className="flex w-full lg:h-full lg:absolute flex-col lg:flex-row"
                            style={lg ? { translateX: slideX } : {}}
                            animate={lg ? {} : { translateX: 0 }}
                        >
                            {/* slide 01 */}
                            <div className="w-full flex-shrink-0 lg:h-full flex justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] lg:pt-[20px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                            }}
                                            whileInView={
                                                !lg
                                                    ? { scale: [0, 1] }
                                                    : undefined
                                            }
                                            viewport={{
                                                margin: "20px",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "280px",
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
                                                className="max-w-[460px] short:max-w-[430px]"
                                                src="/landing/no-constraints/custom-ui.png"
                                            />
                                            <motion.div
                                                className="bg-white text-[22px] leading-[22px] lg:text-[34px] lg:leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[70px] bottom-[60px] lg:right-[100px] lg:bottom-[50px]"
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
                                                padding: "20px 50px 50px",
                                                scale: slideScreen02Y,
                                                opacity: slideScreen02Y,
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "280px",
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
                                                className="max-w-[460px] short:max-w-[430px]"
                                                src="/landing/no-constraints/custom-ui-2.png"
                                            />
                                            <motion.div
                                                className="bg-white text-[22px] leading-[22px] lg:text-[34px] lg:leading-[34px]  py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[100px] bottom-[50px]"
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
                                                padding: "20px 50px 50px",
                                                scale: slideScreen03Y,
                                                opacity: slideScreen03Y,
                                                translateY: "30px",
                                                translateX: "25px",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "280px",
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
                                                className="max-w-[460px] short:max-w-[430px]"
                                                src="/landing/no-constraints/custom-ui-3.png"
                                            />
                                            <motion.div
                                                className="absolute right-[50px] bottom-[60px] flex gap-2 z-10"
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
                                                    className="bg-white text-[22px] leading-[22px] lg:text-[28px] lg:leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2EBBFB]"
                                                    style={{
                                                        boxShadow:
                                                            "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    }}
                                                >
                                                    ANT DESIGN
                                                </div>
                                                <div
                                                    className="bg-white text-[22px] leading-[22px] lg:text-[28px] lg:leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#247EF8]"
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
                                                className="relative lg:absolute w-full h-full left-0 top-0 pointer-events-none"
                                                style={{
                                                    opacity:
                                                        slideScreenText12Progress,
                                                }}
                                            >
                                                <p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] mb-0 text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        refine
                                                    </strong>{" "}
                                                    is{" "}
                                                    <strong className="font-bold">
                                                        headless by design.
                                                    </strong>{" "}
                                                </p>
                                                <p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] text-[#2A2A42]">
                                                    It doesn’t ship with any
                                                    pre-styled components or UI
                                                    by default.
                                                </p>
                                                <motion.p
                                                    className="hidden lg:block font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] text-[#2A2A42] z-[-1]"
                                                    style={{
                                                        opacity:
                                                            slideScreenText2Progress,
                                                        scale: slideScreenText2Progress,
                                                    }}
                                                >
                                                    Instead, you can use any{" "}
                                                    <strong className="font-bold">
                                                        custom design
                                                    </strong>{" "}
                                                    or{" "}
                                                    <strong className="font-bold">
                                                        UI framework
                                                    </strong>{" "}
                                                    for{" "}
                                                    <strong className="font-bold">
                                                        100% control over
                                                        styling.
                                                    </strong>
                                                </motion.p>
                                            </motion.div>
                                            <motion.div
                                                className="hidden lg:block font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] mb-0 text-[#2A2A42] z-[1]"
                                                style={{
                                                    opacity:
                                                        slideScreenText3Progress,
                                                    scale: slideScreenText3Progress,
                                                }}
                                            >
                                                <p className="mb-0 text-[#2A2A42]">
                                                    Not ready for going headless
                                                    yet?
                                                </p>
                                                <p className="text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        No problem.
                                                    </strong>
                                                </p>
                                                <p className="mb-0 text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        refine
                                                    </strong>{" "}
                                                    supports three powerful
                                                </p>
                                                <p className="text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        UI frameworks
                                                    </strong>{" "}
                                                    out-of-the box:
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    <div className="">
                                                        <Link
                                                            to="/examples"
                                                            className="z-[1] appearance-none border border-[#F0F2F5] bg-[#F6F6F9] border-solid rounded-[20px] h-7 w-[153px] flex items-center justify-between pl-3 py-1 pr-1"
                                                        >
                                                            <div className="uppercase text-[#9696B4] text-[12px] leading-[12px] font-montserrat font-bold">
                                                                view examples
                                                            </div>
                                                            <div className="h-5 w-5 bg-white rounded-full flex justify-center items-center pl-px">
                                                                <ExternalLinkIcon className="h-2.5 w-2.5 text-[#9696B4]" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:hidden w-full flex-shrink-0 lg:h-full justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] lg:pt-[20px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                            }}
                                            whileInView={
                                                !lg
                                                    ? { scale: [0, 1] }
                                                    : undefined
                                            }
                                            viewport={{
                                                margin: "20px",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "280px",
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
                                                className="max-w-[460px] short:max-w-[430px]"
                                                src="/landing/no-constraints/custom-ui-2.png"
                                            />
                                            <motion.div
                                                className="bg-white text-[22px] leading-[22px] lg:text-[34px] lg:leading-[34px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2A2A42] absolute right-[70px] bottom-[60px]"
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
                                                <motion.p className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] text-[#2A2A42]">
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
                            <div className="mb-24 lg:mb-0 flex lg:hidden w-full flex-shrink-0 lg:h-full justify-center items-center">
                                <div className="flex flex-col lg:flex-row h-auto max-w-screen-xl w-full">
                                    <div className="flex-[3] flex justify-center items-center relative">
                                        <motion.div
                                            className="p-16 lg:p-[50px] lg:pt-[20px] -mx-6 lg:mx-0"
                                            style={{
                                                perspective: "500px",
                                                perspectiveOrigin: "center",
                                            }}
                                            whileInView={
                                                !lg
                                                    ? { scale: [0, 1] }
                                                    : undefined
                                            }
                                            viewport={{
                                                margin: "20px",
                                            }}
                                        >
                                            <motion.img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "280px",
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
                                                className="max-w-[460px] short:max-w-[430px]"
                                                src="/landing/no-constraints/custom-ui-3.png"
                                            />
                                            <motion.div
                                                className="absolute right-[50px] bottom-[50px] flex gap-2 z-10 flex-col"
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
                                                    className="bg-white text-[22px] leading-[22px] lg:text-[28px] lg:leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#2EBBFB]"
                                                    style={{
                                                        boxShadow:
                                                            "6px 8px 16px rgba(42, 42, 66, 0.2)",
                                                    }}
                                                >
                                                    ANT DESIGN
                                                </div>
                                                <div
                                                    className="bg-white text-[22px] leading-[22px] lg:text-[28px] lg:leading-[28px] py-0.5 px-1.5 font-montserrat font-extrabold text-[#247EF8]"
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
                                            <motion.div className="font-montserrat font-normal text-[21px] leading-[30px] max-w-[350px] mb-0 text-[#2A2A42]">
                                                <p className="mb-0 text-[#2A2A42]">
                                                    Not ready for going headless
                                                    yet?
                                                </p>
                                                <p className="text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        No problem.
                                                    </strong>
                                                </p>
                                                <p className="mb-0 text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        refine
                                                    </strong>{" "}
                                                    supports three powerful
                                                </p>
                                                <p className="text-[#2A2A42]">
                                                    <strong className="font-bold">
                                                        UI frameworks
                                                    </strong>{" "}
                                                    out-of-the box:
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    <div className="">
                                                        <Link
                                                            to="/examples"
                                                            className="appearance-none border border-[#F0F2F5] bg-[#F6F6F9] border-solid rounded-[20px] h-7 w-[153px] flex items-center justify-between pl-3 py-1 pr-1 mx-auto"
                                                        >
                                                            <span className="uppercase text-[#9696B4] text-[12px] leading-[12px] font-montserrat font-bold">
                                                                view examples
                                                            </span>
                                                            <div className="h-5 w-5 bg-white rounded-full flex justify-center items-center pl-px">
                                                                <ExternalLinkIcon className="h-2.5 w-2.5 text-[#9696B4]" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block lg:hidden mb-8 w-full flex-shrink-0">
                                <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                                    no constraints
                                </div>
                                <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden short:text-[24px] short:leading-[24px] short:h-6">
                                    <motion.div className="absolute left-0 top-0 w-full">
                                        <div className="w-full h-9 short:h-6 text-center">
                                            on backend
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="mb-24 lg:mb-0 w-full lg:h-full flex-shrink-0 flex justify-center items-center">
                                <div className="flex pt-3 h-auto max-w-screen-xl w-full">
                                    <div className="flex-1 flex flex-col justify-start items-center w-full gap-2">
                                        <div className="font-montserrat text-xl leading-8 font-medium text-[#2A2A42] text-center max-w-[860px] mb-4">
                                            <p className="mb-0">
                                                <strong className="font-bold">
                                                    refine
                                                </strong>{" "}
                                                connects to any custom{" "}
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
                                                popular backend services.{" "}
                                                <Link
                                                    className="no-underline text-[#1890FF] visited:text-[#1890FF]"
                                                    to="/integrations"
                                                >
                                                    (SEE ALL)
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 w-[calc(100vw-32px)] lg:max-w-5xl sm:w-full px-4 pb-5 -mx-4 sm:mx-0 gap-x-2 md:gap-x-4 gap-y-2 md:gap-y-4">
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
                                                        whileInView={
                                                            lg
                                                                ? undefined
                                                                : {
                                                                      opacity: [
                                                                          0, 1,
                                                                      ],
                                                                      scale: [
                                                                          0, 1,
                                                                      ],
                                                                  }
                                                        }
                                                        viewport={{
                                                            margin: "30px",
                                                        }}
                                                        key={name}
                                                        className={`group relative w-full h-16 md:h-20 lg:h-[65px] bg-white rounded-[10px] ${
                                                            index ===
                                                            backendItems.length -
                                                                1
                                                                ? "col-span-2 max-w-[50%] sm:max-w-none sm:col-span-1 mx-auto sm:mx-0"
                                                                : ""
                                                        } ${
                                                            name === "Python"
                                                                ? "pt-1.5"
                                                                : "pt-0"
                                                        }`}
                                                    >
                                                        <div className="group-hover:opacity-0 scale-100 group-hover:scale-0 opacity-100 transition-all duration-300 w-full h-full flex justify-center items-center">
                                                            <AltIcon className="scale-50 lg:scale-75" />
                                                        </div>
                                                        <div
                                                            className={`opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 absolute left-0 ${
                                                                name ===
                                                                "Python"
                                                                    ? "top-1"
                                                                    : "top-0"
                                                            } w-full h-full flex justify-center items-center`}
                                                        >
                                                            <Icon className="scale-50 lg:scale-75" />
                                                        </div>
                                                    </motion.div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block lg:hidden mb-8 w-full flex-shrink-0">
                                <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                                    no constraints
                                </div>
                                <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden short:text-[24px] short:leading-[24px] short:h-6">
                                    <motion.div className="absolute left-0 top-0 w-full">
                                        <div className="w-full h-9 short:h-6 text-center">
                                            on your workflow
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="mb-24 lg:mb-0 w-full flex-shrink-0 lg:h-full flex justify-center items-center">
                                <div className="flex h-auto max-w-screen-xl w-full flex-col lg:flex-row gap-20 md:gap-32 lg:gap-0">
                                    <div className="flex-1 flex relative -mx-6 lg:mx-0 px-[55px] pt-0 pb-4 lg:px-12 lg:pb-12 lg:pt-0 justify-center items-center">
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
                                            whileInView={
                                                !lg
                                                    ? { scale: [0, 1] }
                                                    : undefined
                                            }
                                            viewport={{
                                                margin: "20px",
                                            }}
                                            className="flex relative w-full max-w-[350px] h-full"
                                        >
                                            <motion.div
                                                className="bg-white h-min rounded-[20px]"
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
                                                className="bg-white absolute top-[10%] left-[19%] h-min rounded-[20px]"
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
                                                className="bg-white absolute top-[20%] left-[38%] h-min rounded-[20px]"
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
                                                className="bg-white absolute top-[30%] left-[55%] h-min rounded-[20px]"
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
                            <div className="block lg:hidden mb-8 w-full flex-shrink-0">
                                <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                                    no constraints
                                </div>
                                <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden short:text-[24px] short:leading-[24px] short:h-6">
                                    <motion.div className="absolute left-0 top-0 w-full">
                                        <div className="w-full h-9 short:h-6 text-center">
                                            with open software
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="w-full flex-shrink-0 lg:h-full flex justify-center items-center">
                                <div className="flex h-auto max-w-screen-xl w-full">
                                    <div className="flex-1 flex flex-col justif text-[#2A2A42] text-center max-w-[800px]y-center items-center w-full gap-4 lg:gap-2">
                                        <div className="font-montserrat text-xl pt-[14px] max-w-screen-lg">
                                            <p className="lg:mb-2">
                                                <strong>refine</strong> core is
                                                an open source framework and it
                                                will always{" "}
                                                <strong>stay free</strong>.
                                            </p>
                                            <p className="lg:mb-0">
                                                It has a very strong community
                                                of maintainers, contributers and
                                                and users providing{" "}
                                                <strong>24/7</strong> support on
                                                our GitHub, Twitter and Discord
                                                channels.
                                            </p>
                                        </div>
                                        <div className="overflow-x-hidden overflow-y-hidden pt-5 lg:pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2.5 gap-x-2.5 w-full px-5 pb-5 max-w-[1000px]">
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative group hover:text-[#1890FF] text-[#2A2A42] select-none"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#1890FF] group-hover:!shadow-none flex justify-center items-center pl-px pt-1"
                                                >
                                                    <SmallSocialIcons.GithubIcon className="group-hover:text-white text-[#2A2A42]" />
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center select-none">
                                                    <CountingNumber to={66} />
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center select-none">
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px]flex flex-col justify-center relative group hover:text-[#1890FF] text-[#2A2A42] select-none"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#1890FF] group-hover:!shadow-none flex justify-center items-center pl-px pt-1"
                                                >
                                                    <SmallSocialIcons.GithubIcon className="group-hover:text-white text-[#2A2A42]" />
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center">
                                                    <CountingNumber to={2800} />
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px]flex flex-col justify-center relative group group-hover:text-[#1890FF] text-[#2A2A42] select-none"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#1890FF] group-hover:!shadow-none flex justify-center items-center pl-px pt-1"
                                                >
                                                    <SmallSocialIcons.GithubIcon className="group-hover:text-white text-[#2A2A42]" />
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center group-hover:text-[#1890FF] text-[#2A2A42]">
                                                    <CountingNumber
                                                        to={
                                                            Math.floor(
                                                                (starCount
                                                                    ? starCount
                                                                    : 2800) /
                                                                    100,
                                                            ) * 100
                                                        }
                                                    />
                                                    +
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center group-hover:text-[#1890FF] text-[#2A2A42]">
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px]flex flex-col justify-center relative group"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#5865F2] group-hover:!shadow-none flex justify-center items-center pl-px pt-1"
                                                >
                                                    <SmallSocialIcons.DiscordIcon className="group-hover:text-white text-[#5865F2]" />
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center select-none group-hover:text-[#1890FF] text-[#2A2A42]">
                                                    <CountingNumber to={500} />+
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center select-none group-hover:text-[#1890FF] text-[#2A2A42]">
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px]flex flex-col justify-center relative group"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#00AAEC] group-hover:!shadow-none group flex justify-center items-center pl-px pt-1"
                                                >
                                                    <SmallSocialIcons.TwitterIcon className="text-[#00AAEC] group-hover:text-white" />
                                                </div>
                                                <div className="font-montserrat font-black text-6xl leading-[1.1] text-center select-none group-hover:text-[#1890FF] text-[#2A2A42]">
                                                    <CountingNumber to={850} />+
                                                </div>
                                                <div className="font-montserrat font-medium text-[14px] leading-[18px] text-center select-none group-hover:text-[#1890FF] text-[#2A2A42]">
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
                                                transition={
                                                    !lg
                                                        ? {
                                                              duration: 0.3,
                                                              ease: "easeInOut",
                                                              delay: 0.15,
                                                          }
                                                        : {}
                                                }
                                                whileInView={
                                                    !lg
                                                        ? {
                                                              translateY: [
                                                                  100, 0,
                                                              ],
                                                              opacity: [0, 1],
                                                          }
                                                        : {}
                                                }
                                                viewport={{
                                                    once: true,
                                                    margin: "25px",
                                                }}
                                                className="rounded-[10px] p-2.5 lg:p-0 bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px]flex flex-col justify-center relative group group-hover:text-[#1890FF] text-[#2A2A42]"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="group-hover:hidden absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#1890FF] group-hover:!shadow-none flex justify-center items-center pl-px pt-px"
                                                >
                                                    <SmallSocialIcons.LikeIcon />
                                                </div>
                                                <div
                                                    style={{
                                                        boxShadow:
                                                            "inset 2px 4px 6px 0 rgba(0, 0, 0, 0.3)",
                                                    }}
                                                    className="hidden absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#1890FF] group-hover:!shadow-none group-hover:flex justify-center items-center pl-px pt-px"
                                                >
                                                    <SmallSocialIcons.LikeIconAlt />
                                                </div>
                                                <div className="font-montserrat font-bold leading-[28px] text-[18px] lg:text-[20px] text-center pb-4 pt-1 group-hover:text-[#1890FF] text-[#2A2A42] select-none">
                                                    <span className="inline group-hover:hidden">
                                                        Join the dark side
                                                    </span>
                                                    <span className="group-hover:inline hidden">
                                                        We have cookies
                                                    </span>
                                                </div>
                                                <div className="flex gap-6 justify-center">
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://github.com/pankod/refine"
                                                    >
                                                        <GraySocialIcons.GithubIcon className="h-8 w-8 hover:scale-110 block nested-hover-hidden" />
                                                        <ColoredSocialIcons.GithubIcon className="h-8 w-8 hover:scale-110 hidden nested-hover-visible" />
                                                    </a>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://discord.gg/refine"
                                                    >
                                                        <GraySocialIcons.DiscordIcon className="h-8 w-8 hover:scale-110 block nested-hover-hidden" />
                                                        <ColoredSocialIcons.DiscordIcon className="h-8 w-8 hover:scale-110 hidden nested-hover-visible" />{" "}
                                                    </a>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://reddit.com/r/refine"
                                                    >
                                                        <GraySocialIcons.RedditIcon className="h-8 w-8 hover:scale-110 block nested-hover-hidden" />
                                                        <ColoredSocialIcons.RedditIcon className="h-8 w-8 hover:scale-110 hidden nested-hover-visible" />
                                                    </a>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://twitter.com/refine_dev"
                                                    >
                                                        <GraySocialIcons.TwitterIcon className="h-8 w-8 hover:scale-110 block nested-hover-hidden" />
                                                        <ColoredSocialIcons.TwitterIcon className="h-8 w-8 hover:scale-110 hidden nested-hover-visible" />
                                                    </a>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://www.linkedin.com/company/refine-dev"
                                                    >
                                                        <GraySocialIcons.LinkedinIcon className="h-8 w-8 hover:scale-110 block nested-hover-hidden" />
                                                        <ColoredSocialIcons.LinkedinIcon className="h-8 w-8 hover:scale-110 hidden nested-hover-visible" />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        style={lg ? { opacity: slideOpacity } : {}}
                        className="hidden lg:block flex-shrink-0"
                    >
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
                    </motion.div>
                </motion.div>
                {/* Scroll snap alignment */}
                {Array.from({ length: 5 }, (_, i) => i).map((i) => (
                    <div
                        key={i}
                        className="hidden lg:block snap-start h-screen w-screen max-w-full"
                    />
                ))}
            </motion.div>
        </>
    );
};
