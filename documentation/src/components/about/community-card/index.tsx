import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

type CommunityCardProps = {
    title: string;
    subtitle: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href: string;
};

export const CommunityCard: React.FC<CommunityCardProps> = ({
    title,
    subtitle,
    icon: Icon,
    href,
}) => {
    return (
        <a
            href={href}
            target="_blank"
            className={styles.container}
            rel="noreferrer"
        >
            <div className={clsx(styles.card, "example-card")}>
                <div className={styles.cardTitle}>
                    {title}
                    <br />
                    <strong>{subtitle}</strong>
                </div>
                <div className={styles.cardIconWrapper}>
                    <Icon className={styles.cardIcon} />
                </div>
            </div>
        </a>
    );
};
