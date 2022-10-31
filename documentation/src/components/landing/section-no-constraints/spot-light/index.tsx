import React, { FC } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

import GradientCyan from "./gradient-svg-cyan";
import GradientBlue from "./gradient-svg-blue";
import GradientPurple from "./gradient-svg-purple";

interface Props {
    scrollYProgress: MotionValue<number>;
}

const SpotLight: FC<Props> = ({ scrollYProgress }) => {
    const spotlightCyanX = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [285, 285, 150, -80, 360, 1],
    );

    const spotlightCyanY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [300, 300, 135, 1, 1, 1],
    );

    const spotlightBlueX = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [350, 350, 300, -430, 90, 1],
    );

    const spotlightBlueY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [24, 24, 0, 80, -35, 1],
    );

    const spotlightPurpleX = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [-30, -30, -70, -190, 100, 125],
    );

    const spotlightPurpleY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 0.9],
        [-80, -80, -30, 220, 60, 1],
    );

    return (
        <motion.div
            className="sticky w-auto xl:w-[1024px] 2xl:w-[1280px] mx-auto top-0 h-screen flex flex-col items-center justify-center"
            whileInView={{
                opacity: [0, 1],
            }}
        >
            <motion.div
                style={{
                    x: spotlightCyanX,
                    y: spotlightCyanY,
                    position: "absolute",
                }}
            >
                <GradientCyan />
            </motion.div>
            <motion.div
                style={{
                    x: spotlightBlueX,
                    y: spotlightBlueY,
                    position: "absolute",
                }}
            >
                <GradientBlue />
            </motion.div>
            <motion.div
                style={{
                    x: spotlightPurpleX,
                    y: spotlightPurpleY,
                    position: "absolute",
                }}
            >
                <GradientPurple />
            </motion.div>
        </motion.div>
    );
};

export default SpotLight;
