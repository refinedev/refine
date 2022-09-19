import React from "react";
import Link from "@docusaurus/Link";

const DiscordBanner = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 h-auto md:h-[150px] bg-[#5865F2] w-full rounded-2xl py-5 px-5 md:px-12">
            <div className="flex items-center gap-16">
                <img
                    className="hidden md:block"
                    src="/img/blog-static/discord-banner.png"
                    alt="Discord Logo"
                />
                <div className="text-white font-montserrat font-bold max-w-md text-center md:text-left">
                    <h1 className="text-2xl uppercase leading-tight mb-0 font-montserrat">
                        Join to refine discord server
                    </h1>
                    <p className="mb-0 text-base">
                        to get help, share ideas, and discuss the latest news.
                    </p>
                </div>
            </div>
            <Link to="https://discord.gg/refine">
                <button className="bg-transparent text-white font-bold py-2 px-4 rounded-lg h-12 w-44 border-white cursor-pointer font-montserrat uppercase text-xl border-solid active:scale-[0.99]">
                    Join Us
                </button>
            </Link>
        </div>
    );
};

export default DiscordBanner;
