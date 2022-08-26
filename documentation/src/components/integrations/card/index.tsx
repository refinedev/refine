import React from "react";

import styles from "./styles.module.css";

type CardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    linkUrl,
}) => {
    return (
        <a href={linkUrl} className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src={imageUrl} alt={title} />
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{title}</div>
                    <p className={styles.cardDescription}>{description}</p>
                </div>
            </div>
        </a>
    );
};

export default Card;
