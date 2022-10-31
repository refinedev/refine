import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC, useRef } from "react";
import { TWBreakpoints } from "../../../hooks/use-tw-breakpoints";

import {
    BusinessLogic01,
    BusinessLogic02,
    BusinessLogic04,
    BusinessLogic03,
} from "../icons";
import { HeaderMobile } from "./header";

interface Props {
    scrollYProgress: MotionValue<number>;
    twBreakpoints: TWBreakpoints;
}

const OnWorkflow: FC<Props> = ({ scrollYProgress, twBreakpoints }) => {
    const businessLogicAnimationOptions = useRef({
        animate: {
            rotateX: ["5deg", "10deg"],
            rotateY: ["15deg", "20deg"],
        },
        transition: {
            yoyo: Infinity,
            ease: "easeInOut",
            duration: 3,
            delay: 0,
        },
    });

    const opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);

    return (
        <motion.div
            className="relative lg:snap-start flex flex-col h-[600px] lg:h-screen pt-0 lg:pt-[11rem]"
            style={twBreakpoints.lg ? { opacity } : {}}
            whileInView={
                twBreakpoints.lg
                    ? {}
                    : {
                          opacity: 1,
                      }
            }
        >
            {!twBreakpoints.lg && <HeaderMobile>On Workflow</HeaderMobile>}
            <div
                className="grid w-full h-full grid-cols-12 pt-0 lg:pt-6"
                style={{
                    gridTemplateRows: "repeat(8, minmax(0, 1fr))",
                }}
            >
                <motion.div
                    className="relative flex w-full h-[360px] col-start-3 col-end-10 row-start-1 row-end-4 md:col-span-5 md:row-start-2 md:row-end-7 md:flex-col"
                    style={{
                        perspective: "1000px",
                        perspectiveOrigin: "left top",
                    }}
                    whileInView={
                        !twBreakpoints.lg ? { scale: [0, 1] } : undefined
                    }
                    viewport={{
                        margin: "20px",
                    }}
                >
                    <motion.div
                        className="bg-white h-min rounded-[20px]"
                        {...businessLogicAnimationOptions.current}
                        style={{
                            width: "45%",
                            boxShadow:
                                "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                        }}
                    >
                        <BusinessLogic02
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="bg-white absolute top-[10%] left-[22%] h-min rounded-[20px]"
                        {...businessLogicAnimationOptions.current}
                        style={{
                            width: "45%",
                            boxShadow:
                                "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                        }}
                    >
                        <BusinessLogic03
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="bg-white absolute top-[18%] left-[45%] h-min rounded-[20px]"
                        {...businessLogicAnimationOptions.current}
                        style={{
                            width: "45%",
                            boxShadow:
                                "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                        }}
                    >
                        <BusinessLogic04
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="bg-white absolute top-[26%] left-[68%] h-min rounded-[20px]"
                        {...businessLogicAnimationOptions.current}
                        style={{
                            width: "45%",
                            boxShadow:
                                "-12px 16px 28px 0 rgba(120, 120, 168, 0.3)",
                        }}
                    >
                        <BusinessLogic01
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </motion.div>
                </motion.div>
                <div className="flex items-center col-start-2 col-end-12 row-start-4 mt-10 h-min row-end-8 md:col-start-8 md:col-end-12 md:row-start-3 md:row-end-6 lg:mt-0">
                    <div className="max-w-[390px] font-montserrat ml-auto mr-auto lg:mr-0 lg:-ml-5 text-[#2A2A42]">
                        <p className="text-base 2xl:text-xl max-w-[360px]">
                            <strong>refine</strong> gives you and your team{" "}
                            <strong>100% control</strong> over your project and
                            totally prevents vendor lock-in:
                        </p>
                        <p className="text-xs 2xl:text-base">
                            <ul>
                                <li>
                                    Write your code as you are developing a
                                    vanilla React project.
                                </li>
                                <li>
                                    Add unlimited 3rd party modules and
                                    integrations.
                                </li>
                                <li>
                                    Use your own source control, CI & CD
                                    systems.
                                </li>
                                <li>
                                    Deploy your application anywhere, including
                                    edge & cloud workers.
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OnWorkflow;
