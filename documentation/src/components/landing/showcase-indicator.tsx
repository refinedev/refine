import React from "react";
import clsx from "clsx";

type Props = {
    x: string | number;
    y: string | number;
    className?: string;
};

export const ShowcaseIndicator = React.memo(function ShowcaseIndicatorBase({
    x,
    y,
    className,
}: Props) {
    return (
        <div
            className={className}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: 40,
                height: 40,
            }}
        >
            <div
                className={clsx(
                    "absolute",
                    "w-10",
                    "h-10",
                    "flex",
                    "items-center",
                    "justify-center",
                    "pointer-events-none",
                )}
            >
                <div
                    className={clsx(
                        "absolute",
                        "w-3",
                        "h-3",
                        "rounded-full",
                        "left-1/2",
                        "top-1/2",
                        "-translate-x-1/2",
                        "-translate-y-1/2",
                        "bg-landing-hero-xray-dot-center-bg",
                        "pointer-events-auto",
                    )}
                />
                {[0, 400, 800].map((d) => (
                    <div
                        key={d}
                        className={clsx(
                            "w-10",
                            "h-10",
                            "absolute",
                            "left-0",
                            "top-0",
                            "right-0",
                            "bottom-0",
                            "flex",
                            "items-center",
                            "justify-center",
                        )}
                    >
                        <div
                            className={clsx(
                                "animate-dot-waves",
                                "rounded-full",
                                "border-2",
                                "border-refine-cyan",
                            )}
                            style={{
                                animationDelay: `${d}ms`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
    // return (
    //     <foreignObject x={x} y={y} width={40} height={40}>
    //         <div
    //             className={clsx(
    //                 "absolute",
    //                 "w-10",
    //                 "h-10",
    //                 "flex",
    //                 "items-center",
    //                 "justify-center",
    //                 "pointer-events-none",
    //             )}
    //         >
    //             <div
    //                 className={clsx(
    //                     "absolute",
    //                     "w-3",
    //                     "h-3",
    //                     "rounded-full",
    //                     "left-1/2",
    //                     "top-1/2",
    //                     "-translate-x-1/2",
    //                     "-translate-y-1/2",
    //                     "bg-landing-hero-xray-dot-center-bg",
    //                 )}
    //             />
    //             {[0, 400, 800].map((d) => (
    //                 <div
    //                     key={d}
    //                     className={clsx(
    //                         "w-10",
    //                         "h-10",
    //                         "absolute",
    //                         "left-0",
    //                         "top-0",
    //                         "right-0",
    //                         "bottom-0",
    //                         "flex",
    //                         "items-center",
    //                         "justify-center",
    //                     )}
    //                 >
    //                     <div
    //                         className={clsx(
    //                             "animate-dot-waves",
    //                             "rounded-full",
    //                             "border-2",
    //                             "border-refine-cyan",
    //                         )}
    //                         style={{
    //                             animationDelay: `${d}ms`,
    //                         }}
    //                     />
    //                 </div>
    //             ))}
    //         </div>
    //     </foreignObject>
    // );
});
