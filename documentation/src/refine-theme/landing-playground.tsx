import React from "react";
import clsx from "clsx";

export const LandingPlayground = () => {
    return (
        <div className={clsx("mb-12")}>
            <div className={clsx("w-full", "relative", "z-[1]")}>
                <div
                    className={clsx(
                        "-mt-[256px]",
                        "bg-landing-planar-grid",
                        "w-full",
                        "h-[312px]",
                        "max-w-screen-landing-2xl",
                        "bg-[length:1440px_312px]",
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
                        "gap-12",
                    )}
                >
                    <div
                        className={clsx(
                            "bg-landing-text-bg",
                            "bg-clip-text",
                            "text-transparent",
                            "text-[40px]",
                            "leading-[48px]",
                            "font-semibold",
                        )}
                    >
                        Develop with your favorite tech stack
                    </div>
                    <div
                        className={clsx(
                            "w-full",
                            "h-[512px]",
                            "rounded-xl",
                            "bg-gray-300",
                        )}
                    >
                        iframex
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
                            "mt-[250px]",
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
                        "-mb-[240px]",
                        "bg-landing-planar-grid-reversed",
                        "w-full",
                        "h-[312px]",
                        "max-w-screen-landing-2xl",
                        "bg-[length:1440px_312px]",
                        "bg-center bg-no-repeat",
                    )}
                />
            </div>
        </div>
    );
};
