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
                        We’ve been using Mirage at Heroku since 2015 on critical
                        customer-facing apps. It&apos;s enabled our team to grow
                        without sacrificing speed in either our development or
                        testing workflows. For me, the real magic of Mirage is
                        that it lets us write tests from the user&apos;s
                        perspective. We take user stories from our product team
                        and translate them 1:1 into tests, without ever having
                        to break flow by stepping outside the front-end
                        toolchain. Mirage is, in short, an essential tool for
                        every UI developer.
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
