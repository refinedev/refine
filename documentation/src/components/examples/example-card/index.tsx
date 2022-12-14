import React from "react";
import Link from "@docusaurus/Link";
import { useReward } from "react-rewards";
import clsx from "clsx";
import { IoMdOpen, IoMdHeart } from "react-icons/io";
import { AiOutlineCode } from "react-icons/ai";

import { Example } from "../../../types/examples";

type ExampleCardProps = {
    example: Example;
};

export const ExampleCard: React.FC<ExampleCardProps> = ({ example }) => {
    const { button, description, image, title, isExternal, source } = example;

    const { reward: leftReward, isAnimating: leftIsAnimating } = useReward(
        "leftReward",
        "emoji",
        {
            emoji: ["🔥", "⭐", "❤️"],
            angle: 45,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );
    const { reward: rightReward, isAnimating: rightIsAnimating } = useReward(
        "rightReward",
        "emoji",
        {
            emoji: ["💙", "💜", "🧡", "💖"],
            angle: 135,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );

    return (
        <div className="example-card flex flex-col justify-between rounded-[10px] p-4 transition duration-150">
            <div>
                <Link className="text-inherit" to={button.link}>
                    <h2 className="font-montserrat mb-2 text-base text-[#2A2A42]">
                        {title}
                    </h2>
                </Link>
                <p
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                    className="font-montserrat mb-4 text-xs text-[#2A2A42]"
                />
            </div>
            <div>
                <Link to={button.link}>
                    <img
                        className="w-full transition duration-150"
                        src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${image}`}
                        alt={title}
                    />
                </Link>
                <div
                    className={clsx(
                        "mt-2 flex items-center justify-end gap-2",
                        {
                            "justify-between": isExternal,
                        },
                    )}
                >
                    {isExternal && (
                        <button
                            disabled={leftIsAnimating || rightIsAnimating}
                            onClick={(e) => {
                                e.preventDefault();
                                leftReward();
                                rightReward();
                            }}
                            className="flex border-none bg-transparent"
                        >
                            <IoMdHeart className="h-6 w-6 transition duration-150 hover:text-red-500" />
                        </button>
                    )}
                    <div className="flex items-center gap-2">
                        {source && (
                            <Link to={source} className="no-underline">
                                <button className="gradient-button color-[#9696B4] text-[#9696B4] font-montserrat flex cursor-pointer items-center gap-2 rounded-full border border-solid border-[#F0F2F5] bg-[#F6F6F9] p-[9px] text-xs font-bold transition duration-150 hover:text-white ">
                                    <AiOutlineCode className="text-[21px]" />
                                </button>
                            </Link>
                        )}
                        <Link to={button.link} className="no-underline">
                            <button className="gradient-button color-[#9696B4] text-[#9696B4] font-montserrat flex cursor-pointer items-center gap-2 rounded-full border border-solid border-[#F0F2F5] bg-[#F6F6F9] px-3 py-2 text-xs font-bold transition duration-150 hover:text-white ">
                                {button.text}
                                <div className="export-icon flex h-6 w-6 items-center justify-center rounded-full bg-white text-inherit">
                                    <IoMdOpen className="text-[#9696B4]" />
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
