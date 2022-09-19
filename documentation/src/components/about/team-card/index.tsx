import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

type TeamCardProps = {
    fullName: string;
    role1: string;
    role2?: string;
    image: string;
    href: string;
    srcSet: string;
};

export const TeamCard: React.FC<TeamCardProps> = ({
    fullName,
    role1,
    role2,
    image,
    href,
    srcSet,
}) => {
    return (
        <a
            href={href}
            target="_blank"
            className={styles.container}
            rel="noreferrer"
        >
            <div className={clsx(styles.card, "example-card")}>
                <div className={styles.imageContainer}>
                    <img
                        srcSet={srcSet}
                        src={image}
                        alt={fullName}
                        className={styles.image}
                    />
                </div>
                <div className={styles.textContainer}>
                    <h3 className={styles.fullName}>{fullName}</h3>
                    <p className={styles.role}>{role1}</p>
                    {role2 && <p className={styles.role}>{role2}</p>}
                </div>
            </div>
        </a>
    );
};
