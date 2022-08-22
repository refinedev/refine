import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useAnimationControls,
} from "framer-motion";

const ArrowIcon = (props) => (
    <svg
        width={33}
        height={39}
        viewBox="0 0 33 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M33 19.0526L2.14907e-06 38.1051L3.8147e-06 -1.44248e-06L33 19.0526Z"
            fill="white"
        />
    </svg>
);

const CloudTipIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M0 0h10v10L5 5 0 0Z" fill="#fff" />
    </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.072 0a14.87 14.87 0 0 0-9.767 3.661 15.462 15.462 0 0 0-5.11 9.256 15.654 15.654 0 0 0 1.984 10.431c1.854 3.126 4.737 5.475 8.133 6.627.758.141 1.026-.34 1.026-.746v-2.615c-4.206.934-5.093-2.068-5.093-2.068a4.108 4.108 0 0 0-1.673-2.256c-1.359-.944.111-.944.111-.944a3.13 3.13 0 0 1 1.33.522c.398.275.73.639.971 1.064.205.379.48.712.812.982a3.152 3.152 0 0 0 3.57.302 3.297 3.297 0 0 1 .924-2.058c-3.346-.387-6.858-1.71-6.858-7.553a6.02 6.02 0 0 1 1.543-4.126 5.72 5.72 0 0 1 .148-4.069s1.266-.415 4.14 1.577a13.955 13.955 0 0 1 7.543 0c2.874-1.992 4.131-1.577 4.131-1.577a5.69 5.69 0 0 1 .185 4.041 6.02 6.02 0 0 1 1.544 4.126c0 5.91-3.522 7.203-6.877 7.552.36.37.638.814.815 1.302.177.49.249 1.011.211 1.53v4.22c0 .501.268.888 1.035.737 3.357-1.182 6.197-3.538 8.019-6.651a15.655 15.655 0 0 0 1.934-10.365 15.464 15.464 0 0 0-5.059-9.198A14.873 14.873 0 0 0 15.072 0Z"
            fill="#fff"
        />
    </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={16}
        height={24}
        viewBox="0 0 16 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15.586 11.202.434.054A.277.277 0 0 0 .15.026a.263.263 0 0 0-.11.093.242.242 0 0 0-.04.135V2.7c0 .155.077.304.205.399l12.1 8.9-12.1 8.9a.492.492 0 0 0-.205.399v2.447c0 .212.259.33.434.2l15.152-11.148c.13-.095.233-.216.305-.354a.963.963 0 0 0 0-.888 1.028 1.028 0 0 0-.305-.354Z"
            fill="#fff"
        />
    </svg>
);

const ScrollIcon = (props) => (
    <svg
        width={43}
        height={63}
        viewBox="0 0 43 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask id="path-1-inside-1_612_596" fill="white">
            <path d="M21.9336 0C33.5733 0 43 9.49773 43 21.0664V41.0616C43 52.6301 33.5734 62.128 21.9336 62.128C10.2934 62.128 0.938648 52.6302 0.938648 41.0616V21.0664C0.938648 9.49734 10.3647 0 21.9336 0ZM6.8658 41.0616C6.8658 49.3454 13.6498 56.1294 21.9336 56.1294C30.2175 56.1294 37.0014 49.3454 37.0014 41.0616V21.0664C37.0014 12.7825 30.2175 5.99856 21.9336 5.99856C13.6498 5.99856 6.8658 12.7825 6.8658 21.0664V41.0616Z" />
        </mask>
        <path
            d="M21.9336 -1C34.1278 -1 44 8.94764 44 21.0664H42C42 10.0478 33.0188 1 21.9336 1V-1ZM44 21.0664V41.0616H42V21.0664H44ZM44 41.0616C44 53.1802 34.1279 63.128 21.9336 63.128V61.128C33.0189 61.128 42 52.08 42 41.0616H44ZM21.9336 63.128C9.73451 63.128 -0.0613518 53.1759 -0.0613518 41.0616H1.93865C1.93865 52.0846 10.8523 61.128 21.9336 61.128V63.128ZM-0.0613518 41.0616V21.0664H1.93865V41.0616H-0.0613518ZM-0.0613518 21.0664C-0.0613518 8.94948 9.80801 -1 21.9336 -1V1C10.9214 1 1.93865 10.0452 1.93865 21.0664H-0.0613518ZM7.8658 41.0616C7.8658 48.7932 14.202 55.1294 21.9336 55.1294V57.1294C13.0975 57.1294 5.8658 49.8977 5.8658 41.0616H7.8658ZM21.9336 55.1294C29.6652 55.1294 36.0014 48.7932 36.0014 41.0616H38.0014C38.0014 49.8977 30.7698 57.1294 21.9336 57.1294V55.1294ZM36.0014 41.0616V21.0664H38.0014V41.0616H36.0014ZM36.0014 21.0664C36.0014 13.3348 29.6652 6.99856 21.9336 6.99856V4.99856C30.7698 4.99856 38.0014 12.2302 38.0014 21.0664H36.0014ZM21.9336 6.99856C14.202 6.99856 7.8658 13.3348 7.8658 21.0664H5.8658C5.8658 12.2302 13.0975 4.99856 21.9336 4.99856V6.99856ZM7.8658 21.0664V41.0616H5.8658V21.0664H7.8658Z"
            fill="white"
            mask="url(#path-1-inside-1_612_596)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.9328 15.5676C24.9328 13.9253 23.5759 12.5684 21.9335 12.5684C20.2912 12.5684 19.0055 13.8535 18.9343 15.4964V23.6373C18.9343 25.2796 20.2912 26.6365 21.9335 26.6365C23.5759 26.6365 24.9328 25.2796 24.9328 23.6373V15.5676ZM19.3149 41.8979L18.4377 41.0206C17.4379 39.9497 15.7238 39.9497 14.7958 41.0206C13.7961 42.0917 13.7961 43.7345 14.7958 44.8054L20.1721 50.1817C20.6717 50.6818 21.3143 50.9673 22.0287 50.9673C22.7425 50.9673 23.3851 50.6818 23.8852 50.1817L29.1898 44.7342C30.2608 43.7344 30.2608 42.0916 29.1898 41.0206C28.1901 40.0209 26.5473 39.9497 25.4763 41.0206L24.5991 41.8979V33.7059C24.5991 32.2778 23.3851 31.0638 21.957 31.0638C20.5288 31.0638 19.3149 32.206 19.3149 33.7059V41.8979Z"
            fill="white"
        />
    </svg>
);

export const SectionHero: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scrollButtonControls = useAnimationControls();

    React.useEffect(() => {
        return scrollYProgress.onChange(async () => {
            if (scrollYProgress.get() >= 0.3) {
                await scrollButtonControls.start({
                    y: 40,
                });
                scrollButtonControls.start({
                    y: [40, 46],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            } else {
                await scrollButtonControls.start({ y: 0 });
                scrollButtonControls.start({
                    y: [0, 6],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    },
                });
            }
        });
    });

    const caretPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        ["26%", "0%"],
    );

    const bgPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0.5, 0.9],
        // Into these values:
        ["0%", "100%"],
    );

    const tileTextPosition = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        ["0rem", "-4.5rem"],
    );

    const tileRotateRight = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        [-4, 4],
    );

    const tileRotateLeft = useTransform(
        scrollYProgress,
        // Map x from these values:
        [0, 0.5],
        // Into these values:
        [4, -4],
    );

    const token = "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";
    const repo = "refine";
    const org = "pankod";

    const [githubStarCount, setGithubStarCount] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(
                `https://api.github.com/repos/${org}/${repo}?access_token=${token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    },
                },
            );

            const json = await response.json();

            setGithubStarCount(json.stargazers_count);
        })();
    }, []);

    return (
        // Scroll animated container
        <motion.div
            ref={ref}
            className="h-[200vh]"
            style={{
                backgroundImage:
                    "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(18,105,186,1) 50%, rgba(18,105,186,1) 55%, rgba(24,144,255,1) 100%)",
                backgroundSize: "400vh 400vh",
                backgroundPositionY: bgPosition,
            }}
        >
            {/* Scroll animated section */}
            <motion.div className="h-screen w-screen top-0 left-0 sticky px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col justify-center">
                <div className="flex pt-16 flex-col lg:flex-row">
                    <div className="heading flex flex-[2] gap-6 h-min">
                        <div className="caret-wrapper relative py-2.5 w-[33px]">
                            <motion.div
                                style={{
                                    position: "absolute",
                                    bottom: caretPosition,
                                }}
                            >
                                <ArrowIcon />
                            </motion.div>
                        </div>
                        <div className="line-wrapper text-white font-montserrat tracking-tighter leading-[60px]">
                            <div className="font-extrabold text-[3.75rem]">
                                build your
                            </div>
                            <div className="font-normal text-[3rem]">
                                REACT BASED
                            </div>
                            <div className="font-extrabold text-[3.75rem]">
                                CRUD applications
                            </div>
                            <div className="font-normal text-[3rem]">
                                WITHOUT CONSTRAINTS
                            </div>
                        </div>
                    </div>
                    <div className="tiles flex-[1] flex flex-col uppercase font-montserrat text-2xl tracking-tight font-medium text-[#1890FF]">
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 1,
                            }}
                            style={{
                                rotate: tileRotateLeft,
                                x: -10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    admin panels
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    headless ui
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 0,
                            }}
                            style={{
                                rotate: tileRotateRight,
                                x: 10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    dashboards
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    backend agnostic
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 3,
                            }}
                            style={{
                                rotate: tileRotateLeft,
                                x: -10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    storefronts
                                </span>
                                <span className="absolute block w-full text-center p-[18px] h-[4.5rem]">
                                    custom workflow
                                </span>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ y: -8 }}
                            transition={{
                                yoyo: Infinity,
                                ease: "easeInOut",
                                duration: 3,
                                delay: 1.7,
                            }}
                            style={{
                                rotate: tileRotateRight,
                                x: 10,
                            }}
                            className="tile shadow-tile relative overflow-hidden bg-white w-full md:max-w-[338px] h-[4.5rem]"
                        >
                            <motion.div
                                style={{
                                    y: tileTextPosition,
                                }}
                            >
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    internal tools
                                </span>
                                <span className="block w-full text-center p-[18px] h-[4.5rem]">
                                    open source
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row pt-24 pb-8">
                    <div className="flex flex-col lg:flex-row flex-1 gap-4 px-4 md:px-8 lg:px-12">
                        <a
                            className="flex flex-1 justify-center items-center appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:shadow-xl bg-gradient-to-l from-[#1890FF] to-[#47EBF5]"
                            href=""
                        >
                            Start Tutorial
                        </a>
                        <a
                            className="flex flex-1 justify-center items-center gap-3 appearance-none no-underline font-montserrat font-bold text-xl text-white text-center py-3 px-4 focus:outline-none"
                            href=""
                        >
                            Read the docs <ChevronRight />
                        </a>
                    </div>
                    <div className="flex flex-row flex-1 gap-1 justify-end px-4 md:px-8 lg:px-12 opacity-80">
                        <div>
                            <a
                                href="https://www.producthunt.com/posts/refine-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-refine&#0045;2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=319164&theme=dark"
                                    alt="refine - Open&#0032;Source&#0032;React&#0032;Framework | Product Hunt"
                                    style={{ width: "250px", height: "54px" }}
                                    className="w-[250px] h-[54px] bg-[#211d21] rounded-tl-xl rounded-bl-xl"
                                />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://github.com/pankod/refine"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#211d21] no-underline rounded-tr-xl rounded-br-xl h-[54px] flex gap-2 pl-3.5 py-2.5 pr-2.5 items-center"
                            >
                                <GithubIcon />
                                <div className="font-bold font-montserrat text-base text-white">
                                    Star
                                </div>
                                <div className="flex items-start h-full">
                                    <CloudTipIcon className="mt-2 -mr-px" />
                                    <div className="cloud rounded-md bg-white text-[#211d21] h-full flex items-center justify-center px-1.5 font-montserrat font-bold text-base">
                                        {`${githubStarCount}`.padStart(4, "0")}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <motion.button
                        className="appearance-none border-none bg-none bg-transparent flex w-auto items-center justify-center gap-2.5"
                        animate={scrollButtonControls}
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.scrollTo({
                                    top: window.innerHeight * 2,
                                    behavior: "smooth",
                                });
                            }
                        }}
                    >
                        <span className="uppercase text-xs text-white font-montserrat w-14 text-right">
                            scroll
                        </span>
                        <ScrollIcon />
                        <span className="uppercase text-xs text-white font-montserrat w-14 text-left">
                            down
                        </span>
                    </motion.button>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen w-screen" />
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen w-screen" />
        </motion.div>
    );
};
