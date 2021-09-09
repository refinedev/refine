import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import styles from "./styles.module.css";

export const Comments = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.relative}>
                    <FaQuoteLeft className={styles.leftQuote} />
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <FaQuoteRight className={styles.rightQuote} />
                </div>
                <div className={styles.authorContainer}>
                    <img
                        className={styles.avatar}
                        src="https://i.pravatar.cc/80"
                        alt="Avatar"
                    />
                    <div className={styles.authorInfo}>
                        <p className={styles.authorTitle}>Lorem Pala</p>
                        <p className={styles.authorPosition}>
                            Software Engineer at Pankod
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
