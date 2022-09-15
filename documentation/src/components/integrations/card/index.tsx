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
    linkUrl: string;
    contributer?: Contributer;
    status: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    linkUrl,
    contributer,
    status,
    icon: Icon,
}) => {
    return (
        <div className={styles.container}>
            <a
                target="_blank"
                href={linkUrl}
                className={styles.card}
                rel="noreferrer"
            >
                <div className="flex flex-1 flex-row justify-start gap-5 px-3.5 py-6">
                    <div className={styles.imageWrapper}>
                        <Icon className={styles.image} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>{title}</div>
                        {status === "soon" ? (
                            <ComingSoon />
                        ) : (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        )}
                    </div>
                </div>
                {contributer && (
                    <ContributerTag
                        url={contributer.url}
                        name={contributer.name}
                    />
                )}
            </a>
        </div>
    );
};

export default Card;
