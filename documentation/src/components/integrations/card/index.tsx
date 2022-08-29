import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";
import ContributerTag from "../contributer-tag";

type Contributer = {
    name: string;
    url: string;
};

type CardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    contributer?: Contributer;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    linkUrl,
    contributer,
}) => {
    return (
        <div className={clsx(contributer && "mb-10")}>
            {contributer && (
                <ContributerTag
                    className={styles.tag}
                    url={contributer.url}
                    name={contributer.name}
                />
            )}
            <a
                target="_blank"
                href={linkUrl}
                className={clsx(styles.card, contributer && "rounded-tl-none")}
                rel="noreferrer"
            >
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={imageUrl} alt={title} />
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{title}</div>
                    <p className={styles.cardDescription}>{description}</p>
                </div>
            </a>
        </div>
    );
};

export default Card;
