import React from "react";
import { motion, useScroll } from "framer-motion";

export const SectionFreeStart = () => {
    return (
        // Scroll animated container
        <motion.div className="bg-white h-[200vh]">
            {/* Scroll animated section */}
            <div className="h-screen w-screen top-0 left-0 sticky pt-56">
                asdasdasd
            </div>
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen w-screen" />
            {/* Scroll snap alignment */}
            <div className="snap-start h-screen w-screen" />
        </motion.div>
    );
};
