import React, { useState, useRef } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ReactPlayer from "react-player/lazy";
import clsx from "clsx";
import {
    IoMdPlay,
    IoMdPause,
    IoMdRefresh,
    IoIosArrowForward,
} from "react-icons/io";

import styles from "./styles.module.css";

export const Hero = () => {
    const playerRef = useRef();
    const [playing, setPlaying] = useState(true);
    const [played, setPlayed] = useState(0);

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
                    <span className={styles.indexCtasGitHubButtonWrapper}>
                        <iframe
                            className={styles.indexCtasGitHubButton}
                            src="https://ghbtns.com/github-btn.html?user=pankod&amp;repo=refine&amp;type=star&amp;count=true&amp;size=large"
                            width={160}
                            height={30}
                            title="GitHub Stars"
                        />
                    </span>
                </div>
                <div className="row row--justify--center">
                    <div className="col col--9">
                        <div className={styles.playerContainer}>
                            <ReactPlayer
                                ref={playerRef}
                                className={styles.reactPlayer}
                                width="100%"
                                height="100%"
                                muted
                                loop
                                playing={playing}
                                controls={false}
                                url="https://www.youtube.com/watch?v=T1WrdAFsM7M&ab_channel=PankodTV"
                                progressInterval={500}
                                onProgress={(value) => setPlayed(value.played)}
                                onPause={() => setPlaying(false)}
                                onPlay={() => setPlaying(true)}
                            />
                        </div>
                        <div className={styles.playerButtons}>
                            <div className={styles.playerButton}>
                                <progress max={1} value={played} />
                                <div className={styles.controlsContainer}>
                                    <IoMdRefresh
                                        onClick={() =>
                                            playerRef.current.seekTo(0)
                                        }
                                        className={styles.icon}
                                    />
                                    {playing ? (
                                        <IoMdPause
                                            onClick={() =>
                                                setPlaying((prev) => !prev)
                                            }
                                            className={styles.icon}
                                        />
                                    ) : (
                                        <IoMdPlay
                                            onClick={() =>
                                                setPlaying((prev) => !prev)
                                            }
                                            className={styles.icon}
                                        />
                                    )}
                                </div>
                            </div>
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
