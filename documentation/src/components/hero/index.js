import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ReactPlayer from "react-player/lazy";
import clsx from "clsx";
import { IoIosArrowForward } from "react-icons/io";

import styles from "./styles.module.css";

export const Hero = () => {
    const [playing, setPlaying] = useState(true);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row row--justify--center">
                    <div className="col col--6">
                        <h1 className={styles.mainTitle}>
                            <span>A React-based framework</span>
                            <br />
                            for building data-intensive applications in no time.
                        </h1>
                    </div>
                    <div className="col col--8">
                        <p className={styles.description}>
                            Refine offers lots of out-of-the box functionality
                            for rapid development, without compromising extreme
                            customizability. It ships with Ant Design System, an
                            enterprise-level UI toolkit.
                        </p>
                    </div>
                </div>
                <div className={styles.linkButtons}>
                    <Link
                        className={clsx(
                            "button",
                            "button--primary",
                            "button--lg",
                            styles.tutorialButton,
                        )}
                        to={useBaseUrl("docs/")}
                    >
                        Start Tutorial
                    </Link>
                    <Link
                        className={clsx(
                            "button",
                            "button--link",
                            "button--lg",
                            styles.docButton,
                        )}
                        to={useBaseUrl("docs/getting-started/overview")}
                    >
                        Read the docs
                        <IoIosArrowForward />
                    </Link>
                </div>
                <div className="row row--justify--center">
                    <div className="col col--9">
                        <div className={styles.playerContainer}>
                            <ReactPlayer
                                className={styles.reactPlayer}
                                width="100%"
                                height="100%"
                                muted
                                loop
                                playing={playing}
                                controls={false}
                                url="https://www.youtube.com/watch?v=xv8M3ScElv0&ab_channel=PankodTV"
                                onPause={() => setPlaying(false)}
                                onPlay={() => setPlaying(true)}
                            />
                        </div>
                    </div>
                    <div className="col col--8">
                        <p className={styles.description}>
                            Use-cases include, but are not limited to admin
                            panels, B2B applications and dashboards.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
