import React from "react";

import styles from "./styles.module.css";

type LargeCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
};

const LargeCard: React.FC<LargeCardProps> = ({
    title,
    description,
    imageUrl,
    linkUrl,
}) => {
    return (
        <a href={linkUrl} className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.image} src={imageUrl} />
                    </div>
                    <div>{title}</div>
                </div>
                <div className={styles.cardContent}>{description}</div>
            </div>
        </a>
    );
};

export default LargeCard;
