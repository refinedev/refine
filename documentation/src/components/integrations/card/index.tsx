import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";
import ContributerTag from "../contributer-tag";
import ComingSoon from "../coming-soon";

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
    status: string;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    linkUrl,
    contributer,
    status,
}) => {
    return (
        <div className={clsx(styles.container, contributer && "mb-10")}>
            <a
                target="_blank"
                href={linkUrl}
                className={clsx(styles.card, contributer && "rounded-b-none")}
                rel="noreferrer"
            >
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={imageUrl} alt={title} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    {status === "soon" ? (
                        <ComingSoon />
                    ) : (
                        <div className={styles.description}>{description}</div>
                    )}
                </div>
            </a>
            {contributer && (
                <ContributerTag url={contributer.url} name={contributer.name} />
            )}
        </div>
    );
};

export default Card;
