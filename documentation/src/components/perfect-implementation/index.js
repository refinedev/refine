import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

export const PerfectImplementation = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div
                    className={clsx(
                        "row",
                        "row--no-gutters",
                        "row--justify--center",
                        styles.row,
                    )}
                >
                    <iframe
                        src="https://codesandbox.io/embed/tutorial-ov79u?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
                        style={{
                            width: "100%",
                            height: "70vh",
                            border: "0px",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                        title="refine-tutorial"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></iframe>
                </div>
                {/*  <div className="row row--justify--center">
                    <div className="col col--9">
                        <h2 className={styles.title}>Perfect Implementation</h2>
                        <p className={styles.description}>
                            <strong>
                                Refine&apos;s strongly opinionated about three
                                parts of your application:
                            </strong>
                        </p>
                        <div className={styles.listContainer}>
                            <ol className={styles.orderList}>
                                <li>API Networking</li>
                                <li>State Management</li>
                                <li>Authentication & Authorization</li>
                            </ol>
                            <div className={styles.box}>
                                <p>
                                    Refine guarantees you a perfect
                                    implementation of these building blocks in
                                    your project, so you can focus on your
                                    development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};
