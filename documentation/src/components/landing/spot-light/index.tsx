import React, { FC } from "react";
import { motion, MotionProps } from "framer-motion";

import GradientCyan from "./gradient-svg-cyan";
import GradientBlue from "./gradient-svg-blue";
import GradientPurple from "./gradient-svg-purple";

const gradients = {
    cyan: (props) => <GradientCyan {...props} />,
    blue: (props) => <GradientBlue {...props} />,
    purple: (props) => <GradientPurple {...props} />,
};

interface SpotLightProps extends MotionProps {
    variant: keyof typeof gradients;
    size?: {
        width: number;
        height: number;
    };
}

const SpotLight: FC<SpotLightProps> = ({ variant, size, style, ...props }) => {
    return (
        <motion.div
            {...props}
            style={{
                ...style,
                position: "absolute",
            }}
        >
            {gradients[variant](size)}
        </motion.div>
    );
};

export default SpotLight;
