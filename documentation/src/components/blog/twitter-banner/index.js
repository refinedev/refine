import React from "react";
import Link from "@docusaurus/Link";

const TwitterBanner = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row items-center twitter-banner-bg px-5 md:px-10 py-5 rounded-xl gap-2">
            <div className="flex flex-col justify-center items-center md:items-start gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-white font-montserrat text-2xl leading-tight mb-0">
                        WANT TO HEAR THE LATEST DEVELOPMENTS ABOUT refine?
                    </h1>
                    <p className="mb-0 uppercase font-montserrat text-white">
                        Follow us on Twitter.
                    </p>
                </div>
                <Link to="https://twitter.com/refine_dev">
                    <button className="bg-transparent text-white font-bold py-2 px-8 rounded-lg border-white cursor-pointer font-montserrat uppercase text-xl border-solid active:scale-[0.99]">
                        Follow Us
                    </button>
                </Link>
            </div>
            <div className="w-[350px]">
                {children ? (
                    children
                ) : (
                    <blockquote className="twitter-tweet" data-cards="hidden">
                        <p lang="en" dir="ltr">
                            💥New Blog Post!
                            <br />
                            <br />
                            Animations in React with Framer Motion
                            <a href="https://t.co/7kWU1ROPYd">
                                https://t.co/7kWU1ROPYd
                            </a>
                            <a href="https://twitter.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">
                                #opensource
                            </a>{" "}
                            <a href="https://twitter.com/hashtag/ReactJS?src=hash&amp;ref_src=twsrc%5Etfw">
                                #ReactJS
                            </a>
                        </p>
                        &mdash; refine (@refine_dev){" "}
                        <a href="https://twitter.com/refine_dev/status/1565321477628510208?ref_src=twsrc%5Etfw">
                            September 1, 2022
                        </a>
                    </blockquote>
                )}
            </div>
        </div>
    );
};

export default TwitterBanner;
