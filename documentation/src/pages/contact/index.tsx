import React from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./styles.module.css";

const Contact: React.FC = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className="container">
                    <div className={clsx("row", "row--justify--center")}>
                        <div className="col col--6">
                            <img src="/contact-page/contact_rise.png" />
                        </div>
                        <div className={clsx("col", "col--6")}>
                            <p className={styles.descriptionTitle}>
                                refine for <br /> <span>Enterprise</span>
                            </p>
                            <p className={styles.descriptionBody}>
                                Your business may require{" "}
                                <span>a tailor-made solution. </span>
                                <br />
                                Our team is <span>ready to help you. </span>
                                <br />
                                <span>Let us hear about some details.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
