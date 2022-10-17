import useIsBrowser from "@docusaurus/useIsBrowser";
import React, { FC, memo, useState } from "react";
import { useGithubContext } from "../../context/GithubContext";
import { GithubIcon, CancelIcon } from "../landing/icons";

const GithubFloatingCta: FC = () => {
    const isBrowser = useIsBrowser();

    const [isClosed, setIsClosed] = useState(() =>
        isBrowser ? localStorage.getItem("github-float-cta") === "true" : false,
    );

    const { starCount, loading } = useGithubContext();

    const handleClose = () => {
        if (isBrowser) {
            localStorage.setItem("github-float-cta", "true");
        }

        setIsClosed(true);
    };

    const formattedStarCount = new Intl.NumberFormat().format(starCount);

    if (isClosed) return null;

    return (
        <div className="font-montserrat  flex px-3 items-center sticky bottom-[32px] mx-auto bg-[#2A2A42] w-[350px] h-[48px] shadow-githubFloatingCta rounded-3xl text-xs font-bold">
            <div className="ml-4">Star us on Github</div>
            <a
                className="flex items-center gap-2 mx-auto text-white text--no-decoration"
                href="https://github.com/pankod/refine"
                target="_blank"
                rel="noreferrer"
            >
                <GithubIcon />
                <span>Star</span>
                <div className=" bg-white text-[#2A2A42] p-2 rounded-md flex items-center justify-center min-w-[58px]">
                    <span>{loading ? "-" : formattedStarCount}</span>
                </div>
            </a>

            <button
                className="text-[#9797A2] bg-transparent border-none hover:scale-125 cursor-pointer flex items-center justify-center"
                onClick={handleClose}
            >
                <CancelIcon />
            </button>
        </div>
    );
};

export default memo(GithubFloatingCta);
