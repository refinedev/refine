import React from "react";
import { SectionHero } from "./section-hero";
import { SectionFreeStart } from "./section-free-start";
import { SectionBullets } from "./section-bullets";

export const Landing: React.FC = () => {
    return (
        <main id="landing_main">
            <div className="snap-start" />
            <SectionHero />
            <SectionFreeStart />
            <SectionBullets />
            <div className="snap-end" />
        </main>
    );
};
