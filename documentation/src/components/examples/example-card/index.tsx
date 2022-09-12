import React from "react";
import Link from "@docusaurus/Link";
import { IoMdOpen } from "react-icons/io";

import { Example } from "../../../types/examples";

type ExampleCardProps = {
    example: Example;
};

export const ExampleCard: React.FC<ExampleCardProps> = ({ example }) => {
    const { button, description, image, title } = example;

    return (
        <div className="example-card flex flex-col justify-between rounded-[10px] p-4 transition duration-150">
            <div>
                <Link className="text-inherit" to={button.link}>
                    <h2 className="font-montserrat uppercase">{title}</h2>
                </Link>
                <p
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                    className="font-montserrat"
                />
            </div>
            <div>
                <Link to={button.link}>
                    <img
                        className="w-full transition duration-150"
                        src={image}
                        alt={title}
                    />
                </Link>
                <div className="mt-2 flex items-center justify-end gap-2">
                    <Link to={button.link} className="no-underline">
                        <button className="gradient-button color-[#9696B4] font-montserrat flex cursor-pointer items-center gap-2 rounded-full border border-solid border-[#F0F2F5] bg-[#F6F6F9] px-3 py-2 font-bold uppercase transition duration-150 hover:text-white">
                            {button.text}
                            <div className="export-icon flex h-6 w-6 items-center justify-center rounded-full bg-white text-inherit">
                                <IoMdOpen />
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
