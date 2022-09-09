import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { IoMdOpen } from "react-icons/io";
import clsx from "clsx";

import { ShowCase } from "../../../types/examples";

type ShowCaseCardProps = {
    showCase: ShowCase;
};

export const ShowCaseCard: React.FC<ShowCaseCardProps> = ({ showCase }) => {
    const { buttons, description, title } = showCase;

    const defaultButton = buttons.find((b) => b.default === true);

    const [selectedButton, setSelectedButton] = useState(defaultButton);

    return (
        <div className="blog-post-item-shadow rounded-[10px] p-4 opacity-70 transition duration-150 hover:opacity-100">
            <h2 className="font-montserrat uppercase">{title}</h2>
            <p className="font-montserrat">{description}</p>
            <Link to={selectedButton.link}>
                <img
                    className="w-full"
                    src={selectedButton.image}
                    alt={title}
                />
            </Link>
            <div className="mt-2 flex items-center justify-end gap-2">
                {buttons.map((b, index) => {
                    const Icon = b?.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedButton(b)}
                            className={clsx(
                                "example-lineer-gradient-button font-montserrat flex cursor-pointer items-center gap-2 rounded-full border border-solid border-[#F0F2F5] bg-[#F6F6F9] px-3 py-2 font-bold uppercase text-[#9696B4] hover:text-white",
                                {
                                    "example-active-lineer-gradient-button":
                                        selectedButton === b,
                                },
                            )}
                        >
                            {Icon && <Icon className=" object-contain" />}
                            {b.text}
                            <Link
                                to={b.link}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-inherit"
                            >
                                <IoMdOpen />
                            </Link>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
