import styles from "./index.module.css";

export const Banner = () => {
    return (
        <div className={styles.banner}>
            <a
                className={styles.ghLink}
                href="https://github.com/refinedev/refine/tree/master/examples/app-crm"
                target="_blank"
                rel="noreferrer"
            >
                <div className={styles.content}>
                    <span className={styles.icon}>💡</span>
                    <span className={styles.text}>
                        This example app is Open Source! Get the complete
                        project code.
                    </span>
                </div>
            </a>
        </div>
    );
};
