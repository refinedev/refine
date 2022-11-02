import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC, PropsWithChildren } from "react";
import {
    GraySocialIcons,
    SmallSocialIcons,
    ColoredSocialIcons,
} from "../icons";
import { CountingNumber } from "../counting-number";
import { useGithubContext } from "../../../context/GithubContext";
import { TWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import { HeaderMobile } from "./header";

const Badge: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`transition-colors absolute top-[1px] right-2 flex items-center justify-center w-[42px] h-[28px] text-[#EDEDEF] group-hover:text-white ${className}`}
        >
            <svg
                className="absolute top-[-8px] bottom-0 right-[-18px]"
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="56"
                fill="none"
            >
                <g filter="url(#badge)">
                    <path
                        fill="currentColor"
                        d="M11 7c3.866 0 7 3.1339 7 7v15.75c0 2.8995 2.3505 5.25 5.25 5.25h17.5c2.8995 0 5.25-2.3505 5.25-5.25V14c0-3.8661 3.134-7 7-7H11Z"
                    />
                </g>
                <defs>
                    <filter
                        id="badge"
                        width="71"
                        height="56"
                        x=".5"
                        y="0"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dx="3.5" dy="7" />
                        <feGaussianBlur stdDeviation="7" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix values="0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 0 0.258824 0 0 0 0.16 0" />
                        <feBlend
                            in2="BackgroundImageFix"
                            mode="multiply"
                            result="effect1_dropShadow_750_475"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_750_475"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
            <div className="absolute items-center justify-center w-4 h-4 top-[2px] bottom-0 right-0 left-[13px]">
                {children}
            </div>
        </div>
    );
};

interface Props {
    scrollYProgress: MotionValue<number>;
    twBreakpoints: TWBreakpoints;
}

const WithOpenSource: FC<Props> = ({ scrollYProgress, twBreakpoints }) => {
    const { starCount } = useGithubContext();

    const opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 0]);

    return (
        <div className="lg:snap-start flex flex-col items-center justify-center h-auto lg:h-screen pt-0 lg:pt-[11rem] lg:pb-20">
            {!twBreakpoints.lg && <HeaderMobile>With Opensource</HeaderMobile>}
            <motion.div
                className="flex flex-col w-full h-full items-center justify-center text-[#2A2A42] text-center"
                style={twBreakpoints.lg ? { opacity } : {}}
                whileInView={
                    twBreakpoints.lg
                        ? {}
                        : {
                              opacity: [0, 1],
                          }
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full  max-w-[688px]">
                    <motion.div className="transition-colors group border border-solid border-[#ededef] rounded-[10px] bg-[#ffffffb3] hover:bg-white p-2.5 lg:p-0  min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative select-none shadow-startTiles">
                        <Badge>
                            <SmallSocialIcons.GithubIcon className="group-hover:text-[#2A2A42] text-[#ACACB6]" />
                        </Badge>
                        <div className="transition-[colors,transform] font-montserrat text-4xl font-black text-center group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            <CountingNumber to={100} />+
                        </div>
                        <div className="transition-[colors,transform] font-montserrat text-xs font-medium text-center mt-2 group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            Contributors
                        </div>
                    </motion.div>
                    <motion.div className="group border border-solid border-[#ededef] rounded-[10px] bg-[#ffffffb3] hover:bg-white p-2.5 lg:p-0  min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative select-none shadow-startTiles">
                        <Badge>
                            <SmallSocialIcons.GithubIcon className="group-hover:text-[#2A2A42] text-[#ACACB6]" />
                        </Badge>
                        <div className="transition-[colors,transform] font-montserrat text-4xl font-black text-center group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            <CountingNumber to={3500} />+
                        </div>
                        <div className="transition-[colors,transform] font-montserrat text-xs font-medium text-center mt-2 group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            Commits
                        </div>
                    </motion.div>
                    <motion.div className="transition-colors group border border-solid border-[#ededef] rounded-[10px] bg-[#ffffffb3] hover:bg-white p-2.5 lg:p-0  min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative select-none shadow-startTiles">
                        <Badge>
                            <SmallSocialIcons.GithubIcon className="group-hover:text-[#2A2A42] text-[#ACACB6]" />
                        </Badge>
                        <div className="transition-[colors,transform] ease-in-out font-montserrat text-4xl font-black text-center group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            <CountingNumber
                                to={
                                    Math.floor(
                                        (starCount ? starCount : 2800) / 100,
                                    ) * 100
                                }
                            />
                            +
                        </div>
                        <div className="transition-[colors,transform] ease-in-out font-montserrat text-xs font-medium text-center mt-2 group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            GitHub Stars
                        </div>
                    </motion.div>
                    <motion.div className="transition-colors group border border-solid border-[#ededef] rounded-[10px] bg-[#ffffffb3] hover:bg-white p-2.5 lg:p-0 min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative select-none shadow-startTiles">
                        <Badge>
                            <SmallSocialIcons.DiscordIcon className="group-hover:text-discord text-[#9797A2]" />
                        </Badge>
                        <div className="font-montserrat text-4xl font-black text-center group-hover:text-[#1890FF] text-[#6B6B7C]">
                            <CountingNumber to={600} />+
                        </div>
                        <div className="ttransition-[colors,transform] ease-in-out font-montserrat text-xs font-medium text-center mt-2 group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            Discord Members
                        </div>
                    </motion.div>
                    <motion.div className="transition-colors group border border-solid border-[#ededef] rounded-[10px] bg-[#ffffffb3] hover:bg-white p-2.5 lg:p-0  min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative select-none shadow-startTiles">
                        <Badge>
                            <SmallSocialIcons.TwitterIcon className="group-hover:text-twitter text-[#9797A2]" />
                        </Badge>
                        <div className="transition-[colors,transform] ease-in-out font-montserrat text-4xl font-black text-center group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            <CountingNumber to={1000} />+
                        </div>
                        <div className="transition-[colors,transform] ease-in-out font-montserrat text-xs font-medium text-center mt-2 group-hover:text-[#1890FF] text-[#6B6B7C] group-hover:scale-110">
                            Twitter Followers
                        </div>
                    </motion.div>
                    <motion.div className="transition-colors group rounded-[10px] p-2.5 lg:p-0 bg-[#ffffffb3] hover:bg-white shadow-tile min-h-[106px] short:min-h-[95px] short:max-h-[95px] flex flex-col justify-center relative group group-hover:text-[#1890FF] text-[#2A2A42]">
                        <div className="transition-[colors,transform] ease-in-out font-montserrat font-[900] uppercase text-base text-center group-hover:text-[#1890FF] text-[#6B6B7C] select-none group-hover:scale-125">
                            <div className="group-hover:hidden">Come to</div>
                            <div className="group-hover:hidden">dark side</div>
                            <div className="hidden group-hover:block">
                                We have
                            </div>
                            <div className="hidden group-hover:block">
                                cookies
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://reddit.com/r/refine"
                            >
                                <GraySocialIcons.RedditIcon className="block w-6 h-6 hover:scale-110 nested-hover-hidden" />
                                <ColoredSocialIcons.RedditIcon className="hidden w-6 h-6 hover:scale-110 nested-hover-visible" />
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/refinedev/refine"
                            >
                                <GraySocialIcons.GithubIcon className="block w-6 h-6 hover:scale-110 nested-hover-hidden" />
                                <ColoredSocialIcons.GithubIcon className="hidden w-6 h-6 hover:scale-110 nested-hover-visible" />
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://discord.gg/refine"
                            >
                                <GraySocialIcons.DiscordIcon className="block w-6 h-6 hover:scale-110 nested-hover-hidden" />
                                <ColoredSocialIcons.DiscordIcon className="hidden w-6 h-6 hover:scale-110 nested-hover-visible" />{" "}
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://twitter.com/refine_dev"
                            >
                                <GraySocialIcons.TwitterIcon className="block w-6 h-6 hover:scale-110 nested-hover-hidden" />
                                <ColoredSocialIcons.TwitterIcon className="hidden w-6 h-6 hover:scale-110 nested-hover-visible" />
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/company/refine-dev"
                            >
                                <GraySocialIcons.LinkedinIcon className="block w-6 h-6 hover:scale-110 nested-hover-hidden" />
                                <ColoredSocialIcons.LinkedinIcon className="hidden w-6 h-6 hover:scale-110 nested-hover-visible" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-[591px] mx-auto mt-8 lg:mt-16 text-base 2xl:text-xl text-center font-montserrat tracking-tight">
                    <p className="mb-1 lg:mb-2">
                        <strong>refine</strong> core is an open source framework
                        and it will always <strong>stay free</strong>.
                    </p>
                    <p className="mb-0">
                        It has a very strong community of maintainers,
                        contributers and and users providing{" "}
                        <strong>7/24 support</strong> on our{" "}
                        <a
                            className="underline text-inherit"
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/refinedev/refine"
                        >
                            GitHub
                        </a>
                        ,{" "}
                        <a
                            className="underline text-inherit"
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/refine_dev"
                        >
                            Twitter
                        </a>{" "}
                        and{" "}
                        <a
                            className="underline text-inherit"
                            target="_blank"
                            rel="noreferrer"
                            href="https://discord.gg/refine"
                        >
                            Discord
                        </a>{" "}
                        server.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default WithOpenSource;
