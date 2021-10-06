import React from "react";
import Image from "next/image";

import styles from "./index.module.css";

export const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <a
                href="https://github.com/pankod"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src="/icons/pankod-icon.svg"
                    alt="pankod"
                    width="140"
                    height="28"
                />
            </a>
            <div className={styles.icons}>
                <a
                    href="https://github.com/pankod"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/icons/github-icon.svg"
                        alt="github"
                        width="28"
                        height="29"
                    />
                </a>
                <a
                    href="https://twitter.com/PankodDev"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/icons/twitter-icon.svg"
                        alt="twitter"
                        width="28"
                        height="28"
                    />
                </a>
                <a
                    href="https://www.youtube.com/channel/UCBGOeQkv1XW3ptryLWlQbAQ"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/icons/youtube-icon.svg"
                        alt="youtube"
                        width="28"
                        height="29"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/company/pankod-yazilim-ve-danismanlik/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/icons/linkedin-icon.svg"
                        alt="linkedin"
                        width="28"
                        height="32"
                    />
                </a>
            </div>
        </div>
    );
};
