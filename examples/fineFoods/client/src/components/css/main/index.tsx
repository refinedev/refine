import React from "react";
import styles from "./index.module.css";
import { Button } from "@components/css";

export const Main: React.FC = () => {
    return (
        <div className={styles.main}>
            <h1>superplate</h1>
            <p>The frontend boilerplate with superpowers!</p>
            <Button>Docs</Button>
        </div>
    );
};
