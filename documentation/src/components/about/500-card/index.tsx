import React from "react";
import styles from "./styles.module.css";

export const Card500: React.FC = () => {
    return (
        <a href="https://ee.500.co/" className={styles.container}>
            <div className={styles.card}>
                <img className={styles.icon} src="/icons/500.svg" />
                <p className={styles.text}>
                    500
                    <br />
                    <div className={styles.emerging}>Emerging Europe</div>
                </p>
            </div>
        </a>
    );
};
