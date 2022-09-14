import React from "react";
import styles from "./styles.module.css";

type CommunityCardProps = {
    title: string;
    subtitle: string;
    iconPath: string;
    href: string;
};

export const CommunityCard: React.FC<CommunityCardProps> = ({
    title,
    subtitle,
    iconPath,
    href,
}) => {
    return (
        <a href={href} className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    {title}
                    <br />
                    <strong>{subtitle}</strong>
                </div>
                <div className={styles.cardIconWrapper}>
                    <img className={styles.cardIcon} src={iconPath} />
                </div>
            </div>
        </a>
    );
};
