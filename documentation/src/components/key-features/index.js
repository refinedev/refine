import React from "react";

import styles from "./styles.module.css";

export const KeyFeatures = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.mainTitle}>Backend Agnostic</h2>
                <p className={styles.description}>
                    <strong>Connects to any custom backend.</strong> <br />
                    Built-in support for REST API, Strapi, NextJS and Airtable.
                </p>
                <div className="row row--justify--center">
                    <div className="col col--8">
                        <div className={styles.supportContainer}>
                            <img src="/icons/nodejs.png" alt="nodejs" />
                            <img src="/icons/java.png" alt="java" />
                            <img src="/icons/dotnet.png" alt="dotnet" />
                            <img src="/icons/strapi.png" alt="strapi" />
                            <img src="/icons/airtable.png" alt="airtable" />
                            <img src="/icons/json-api.png" alt="json-api" />
                            <img src="/icons/nest.png" alt="nest" />
                            <img src="/icons/pyhton.png" alt="pyhton" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
