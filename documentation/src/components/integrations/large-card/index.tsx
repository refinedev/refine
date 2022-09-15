import React from "react";
import ComingSoon from "../coming-soon";

import styles from "./styles.module.css";

type LargeCardProps = {
    title: string;
    description: string;
    linkUrl: string;
    status: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const LargeCard: React.FC<LargeCardProps> = ({
    title,
    description,
    icon: Icon,
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
                <div className={styles.header}>
                    <div className={styles.imageWrapper}>
                        <Icon className={styles.image} />
                    </div>
                    <div className={styles.title}>{title}</div>
                </div>
                <div className={styles.content}>
                    {status === "soon" ? (
                        <div className={styles.coming}>
                            <ComingSoon />
                        </div>
                    ) : (
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </div>
            </div>
        </a>
    );
};

export default LargeCard;
