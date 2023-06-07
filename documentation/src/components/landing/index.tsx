import React from "react";
import { SectionHero } from "./section-hero";
import { SectionFreeStart } from "./section-free-start";
import { SectionBullets } from "./section-bullets";
import { SectionNoConstraints } from "./section-no-constraints";
import { SectionUseCase } from "./section-use-case";
import SectionReady from "./section-ready";
import { LandingHeader } from "@site/src/refine-theme/landing-header";

export const Landing: React.FC = () => {
    return (
        <main id="landing_main">
            <LandingHeader />
            {/* <SectionHero />
            <SectionFreeStart />
            <SectionBullets />
            <SectionNoConstraints />
            <SectionUseCase />
            <SectionReady /> */}
        </main>
    );
};
