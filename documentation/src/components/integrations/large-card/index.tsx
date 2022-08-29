import React from "react";
import ComingSoon from "../coming-soon";

import styles from "./styles.module.css";

type LargeCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    status: string;
};

const LargeCard: React.FC<LargeCardProps> = ({
    title,
    description,
    imageUrl,
    linkUrl,
    status,
}) => {
    return (
        <a
            target="_blank"
            href={linkUrl}
            className={styles.cardWrapper}
            rel="noreferrer"
        >
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.image} src={imageUrl} />
                    </div>
                    <div>{title}</div>
                </div>
                <div className={styles.cardContent}>
                    {status === "soon" ? (
                        <div>
                            <ComingSoon />
                        </div>
                    ) : (
                        <p className={styles.description}>{description}</p>
                    )}
                </div>
            </div>
        </a>
    );
};

export default LargeCard;
