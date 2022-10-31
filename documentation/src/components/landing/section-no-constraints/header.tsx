import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC, useEffect, useState } from "react";

interface Props {
    scrollYProgress: MotionValue<number>;
}

export const Header: FC<Props> = ({ scrollYProgress }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

    const translateY = useTransform(scrollYProgress, [0.8, 1], [0, -200]);

    const currentSlideMotion = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8],
        [1, 2, 3, 4, 5],
    );

    useEffect(() => {
        return currentSlideMotion.onChange((value) => {
            setCurrentSlide(Math.round(value));
        });
    }, []);

    return (
        <motion.div
            className="sticky z-10 flex items-center justify-end w-full h-24 top-20"
            style={{ translateY, opacity }}
        >
            <div className="flex-shrink-0 w-full">
                <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[64px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                    no constraints
                </div>
                <motion.div className="flex-shrink-0 block">
                    <div className="relative flex justify-center w-full max-w-5xl gap-4 mx-auto">
                        <motion.div
                            style={{
                                color: currentSlide < 3 ? "#1890FF" : "#D8D8DC",
                            }}
                            className="text-xs font-medium text-center uppercase transition-colors duration-200 ease-in-out md:text-base font-montserrat"
                        >
                            on styling
                        </motion.div>
                        <motion.div
                            style={{
                                color:
                                    currentSlide === 3 ? "#1890FF" : "#D8D8DC",
                            }}
                            className="text-xs font-medium text-center uppercase transition-colors duration-200 ease-in-out md:text-base font-montserrat"
                        >
                            on backend
                        </motion.div>
                        <motion.div
                            style={{
                                color:
                                    currentSlide === 4 ? "#1890FF" : "#D8D8DC",
                            }}
                            className="text-xs font-medium text-center uppercase transition-colors duration-200 ease-in-out md:text-base font-montserrat"
                        >
                            on workflow
                        </motion.div>
                        <motion.div
                            style={{
                                color:
                                    currentSlide === 5 ? "#1890FF" : "#D8D8DC",
                            }}
                            className="text-xs font-medium text-center uppercase transition-colors duration-200 ease-in-out md:text-base font-montserrat"
                        >
                            with opensource
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const HeaderMobile: FC = ({ children }) => {
    return (
        <div className="flex-shrink-0 block w-full mb-4 ">
            <div className="w-full text-center font-montserrat text-[36px] md:text-[60px] lg:text-[90px] leading-none font-extrabold text-[#1890FF] short:text-[55px]">
                no constraints
            </div>
            <div className="w-full font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none font-montserrat text-[#1890FF] text-center h-9 relative overflow-hidden short:text-[24px] short:leading-[24px] short:h-6">
                <div className="absolute top-0 left-0 w-full">
                    <div className="w-full text-center h-9 short:h-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
