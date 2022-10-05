import React from "react";
import { SectionHero } from "./section-hero";
import { SectionFreeStart } from "./section-free-start";
import { SectionBullets } from "./section-bullets";
import { SectionNoConstraints } from "./section-no-constraints";
import { SectionUseCase } from "./section-use-case";

export const Landing: React.FC = () => {
    const [githubStarCount, setGithubStarCount] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(`https://stargate.refine.dev/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            setGithubStarCount(json.stargazers_count);
        })();
    }, []);

    return (
        <main id="landing_main">
            <SectionHero starCount={githubStarCount} />
            <SectionFreeStart />
            <SectionBullets />
            <SectionNoConstraints starCount={githubStarCount} />
            <SectionUseCase />
        </main>
    );
};
