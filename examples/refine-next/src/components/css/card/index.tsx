import React from "react";
import styles from "./index.module.css";

type CardProps = {
    title: string;
    children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>{title}</div>
            <div>{children}</div>
        </div>
    );
};
