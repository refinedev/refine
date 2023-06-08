import React from "react";
import clsx from "clsx";

export const LandingPlayground = () => {
    return (
        <div className={clsx("mb-12")}>
            <div className={clsx("w-full", "relative", "z-[1]")}>
                <div
                    className={clsx(
                        "bg-landing-planar-grid-mobile",
                        "landing-lg:bg-landing-planar-grid",
                        "w-full",
                        "h-[156px]",
                        "-mt-[64px]",
                        "-mb-[140px]",
                        "mx-auto",
                        "landing-md:-mb-[112px]",
                        "landing-lg:mb-0",
                        "landing-lg:-mt-[256px]",
                        "landing-lg:h-[312px]",
                        "max-w-screen-landing-2xl",
                        "bg-[length:720px_156px]",
                        "landing-lg:bg-[length:1440px_312px]",
                        "bg-center bg-no-repeat",
                    )}
                />
                <div
                    className={clsx(
                        "my-12",
                        "max-w-screen-landing-content",
                        "w-full",
                        "mx-auto",
                        "flex flex-col items-center justify-center",
                        "gap-6",
                        "landing-lg:gap-12",
                    )}
                >
                    <div
                        className={clsx(
                            "text-[1.5rem]",
                            "leading-[2rem]",
                            "landing-md:text-[2rem]",
                            "landing-md:leading-[2.5rem]",
                            "landing-lg:text-[2.5rem]",
                            "landing-lg:leading-[3rem]",
                            "font-semibold",
                            "text-center",
                        )}
                    >
                        <span
                            className={clsx(
                                "block landing-md:inline",
                                "bg-landing-text-bg",
                                "bg-clip-text",
                                "text-transparent",
                            )}
                        >
                            Develop with your
                        </span>{" "}
                        <span
                            className={clsx(
                                "block landing-md:inline",
                                "bg-landing-text-bg",
                                "bg-clip-text",
                                "text-transparent",
                            )}
                        >
                            favorite tech stack
                        </span>
                    </div>
                    <div
                        className={clsx(
                            "px-2 landing-md:px-0",
                            "mx-auto",
                            "w-full",
                            "max-w-[464px]",
                            "landing-md:max-w-[624px]",
                            "h-[288px]",
                            "landing-lg:max-w-[944px]",
                            "landing-lg:h-[512px]",
                            "rounded-xl",
                            "overflow-hidden",
                            "flex",
                        )}
                    >
                        <div
                            className={clsx(
                                "flex-1",
                                "w-full",
                                "h-full",
                                "flex",
                                "bg-landing-playground-bg",
                                "backdrop-blur-xl",
                                "border",
                                "border-refine-landing-playground-border",
                                "rounded-xl",
                                "overflow-hidden",
                            )}
                        ></div>
                        {/* <iframe
                            className="w-full h-full flex-1 bg-gray-100 rounded-xl"
                            srcDoc="<div>iframe</div>"
                        /> */}
                    </div>
                </div>
                <div
                    className={clsx(
                        "z-[-1]",
                        "absolute",
                        "w-full",
                        "h-full",
                        "left-0",
                        "top-0",
                        "flex items-center justify-center",
                    )}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "max-w-[1440px]",
                            "landing-lg:mt-[250px]",
                            "h-[250px]",
                            "bg-landing-linear-spectrum",
                            "bg-center",
                            "bg-no-repeat",
                            "bg-[length:1200px]",
                            "blur-[100px]",
                            "opacity-50",
                        )}
                    />
                </div>
                <div
                    className={clsx(
                        "bg-landing-planar-grid-reversed-mobile",
                        "landing-lg:bg-landing-planar-grid-reversed",
                        "w-full",
                        "h-[156px]",
                        "-mt-[50px]",
                        "landing-lg:mt-0",
                        "-mb-[140px]",
                        "mx-auto",
                        "landing-lg:-mb-[240px]",
                        "landing-lg:h-[312px]",
                        "max-w-screen-landing-2xl",
                        "bg-[length:720px_156px]",
                        "landing-lg:bg-[length:1440px_312px]",
                        "bg-center bg-no-repeat",
                    )}
                />
            </div>
        </div>
    );
};
