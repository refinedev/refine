import React from "react";
import Link from "@docusaurus/Link";

import { CloudTipIcon, GithubIcon } from "../../landing/icons";

const token = "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";
const repo = "refine";
const org = "pankod";

const GithubBanner = () => {
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

            setGithubStarCount(json.stargazers_count ?? 2000);
        })();
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 h-auto md:h-[150px] w-full rounded-2xl py-5 px-5 md:px-12 github-banner-bg">
            <div className="flex items-center gap-16">
                <img
                    className="hidden md:block"
                    src="/img/blog-static/github-banner-icon.png"
                    alt="Github Logo"
                />
                <div className="font-montserrat max-w-md text-center md:text-left">
                    <h1 className="text-2xl uppercase leading-tight mb-0 font-montserrat font-bold">
                        Star us on github
                    </h1>
                    <p className="mb-0 text-base leading-tight">
                        <b>refine</b> is an{" "}
                        <b>open-source React-based framework</b>
                        for building <b>CRUD applications</b> without
                        constraints. Please show us your <b>support</b> with a
                        shining <b>GitHub star</b>.
                    </p>
                </div>
            </div>
            {/* eslint-disable react/jsx-no-target-blank */}
            <Link
                to="https://github.com/refinedev/refine"
                rel="noopener"
                className="bg-[#211d21] no-underline rounded-xl h-[54px] flex gap-2 pl-3.5 py-2.5 pr-2.5 items-center"
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
            </Link>
        </div>
    );
};

export default GithubBanner;
