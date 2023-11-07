import clsx from "clsx";
import React, { FC } from "react";
import { LandingSectionCtaButton } from "./landing-section-cta-button";

type Props = {
    className?: string;
};

export const LandingPureReactCode: FC<Props> = ({ className }) => {
    return (
        <div className={clsx(className)}>
            <div
                className={clsx(
                    "not-prose",
                    "flex-shrink-0",
                    "p-2 landing-sm:p-4",
                    "rounded-3xl",
                    "dark:bg-landing-noise",
                    "dark:bg-gray-800 bg-gray-50",
                )}
            >
                <div
                    className={clsx(
                        "relative",
                        "flex",
                        "flex-col",
                        "rounded-lg",
                        "dark:bg-landing-component-dark bg-landing-component",
                    )}
                >
                    <CodeSlide />
                </div>
                <div
                    className={clsx(
                        "not-prose",
                        "mt-4 landing-sm:mt-6 landing-lg:mt-10",
                        "px-4 landing-sm:px-6",
                    )}
                >
                    <h6
                        className={clsx(
                            "p-0",
                            "font-semibold",
                            "text-base landing-sm:text-2xl",
                            "dark:text-gray-300 text-gray-900",
                        )}
                    >
                        100% Pure React code
                    </h6>
                    <div
                        className={clsx(
                            "not-prose",
                            "flex",
                            "items-center",
                            "justify-between",
                            "flex-wrap",
                            "gap-4 landing-sm:gap-8",
                            "mb-4 landing-sm:mb-6",
                        )}
                    >
                        <p
                            className={clsx(
                                "p-0",
                                "mt-2 landing-sm:mt-4",
                                "text-base",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            Don’t get locked-in to proprietary, black-box
                            solutions. With refine you have always 100% control
                            over your project.
                        </p>
                        <LandingSectionCtaButton to="https://github.com/refinedev/refine">
                            refine on GitHub
                        </LandingSectionCtaButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CodeSlide = () => {
    return (
        <div className={clsx("rounded-lg", "dark:bg-gray-900 bg-gray-0")}>
            <div
                className={clsx(
                    "text-[10px] leading-[16px]",
                    "h-[240px] landing-md:h-[293px]",
                    "font-jetBrains-mono",
                    "select-none",
                    "overflow-hidden",
                    "relative",
                    "z-[1px]",
                    "dark:text-[#d6deeb] text-gray-900",
                    "dark:landing-react-code-mask-dark landing-react-code-mask",
                )}
            >
                <div
                    className={clsx(
                        "will-change-transform animate-code-scroll p-2",
                    )}
                >
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            1
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span>React</span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;react&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            2
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                        &nbsp;
                        <span>renderHook, waitFor</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;@testing&minus;library/react&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            3
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            4
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            5
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>MockJSONServer</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            6
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>TestWrapper</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            7
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>act</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            8
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>mockLegacyRouterProvider</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            9
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;@test&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            10
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            11
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            12
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>assertList</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            13
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>assertOne</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            14
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseList</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            15
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseMany</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            16
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseOne</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            17
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            {"@test/mutation-helpers"}
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            18
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            19
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                        &nbsp;
                        <span>useForm</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            {"@refinedev/core"}
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            20
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            21
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                        &nbsp;
                        <span>posts</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            {"@test/dataMocks"}
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            22
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                        &nbsp;
                        <span>mockRouterBindings</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            {"@test"}
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            23
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            24
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            const
                        </span>
                        &nbsp;
                        <span>SimpleWrapper</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            =
                        </span>
                        &nbsp;
                        <span>TestWrapper</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"({});"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            25
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            26
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            const
                        </span>
                        &nbsp;
                        <span>EditWrapper</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            =
                        </span>
                        &nbsp;
                        <span>TestWrapper</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"({"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            27
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>dataProvider</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span>MockJSONServer</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            28
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>routerProvider</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span className={"text-[#ffcb8b]"}>
                            mockRouterBindings
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"("}
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            29
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>resource</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            30
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>name</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;posts&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            31
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"},
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            32
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>action</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;edit&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            33
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"blue"}>id</span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            :
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;1&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            34
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"})"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            35
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"})"}
                        </span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className={clsx("line spacing")}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            1
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span>React</span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;react&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            2
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                        &nbsp;
                        <span>renderHook,&nbsp;waitFor</span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;@testing&minus;library/react&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            3
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            4
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            5
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>MockJSONServer</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            6
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>TestWrapper</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            7
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>act</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            8
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>mockLegacyRouterProvider</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            9
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            &quot;@test&quot;
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            10
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            11
                        </span>
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            import
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"{"}
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            12
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>assertList</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            13
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>assertOne</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            14
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseList</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            15
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseMany</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            16
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>renderUseOne</span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ,
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            17
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            {"}"}
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#7fdbca] text-[#a62948]"}>
                            from
                        </span>
                        &nbsp;
                        <span className={"dark:text-[#addb67] text-[#6600cc]"}>
                            {"@test/mutation-helpers"}
                        </span>
                        <span className={"dark:text-[#addb67] text-[#82aaff]"}>
                            ;
                        </span>
                    </div>
                    <div className={"whitespace-nowrap"}>
                        <span
                            className={
                                "w-[24px] pr-[6px] text-right dark:text-gray-600 text-gray-500"
                            }
                        >
                            18
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
