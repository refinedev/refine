import React from "react";

import Layout from "../../theme/Layout";
import Card from "../../components/integrations/card";
import LargeCard from "../../components/integrations/large-card";
import data from "../../local-json/inegrations.json";
import styles from "./styles.module.css";
import { Integration, IntegrationsType } from "../../types/integrations";

const Integrations: React.FC = () => {
    const integrations: IntegrationsType = data;
    const integrationFields = Object.keys(integrations);

    const renderIntegration = (integration: Integration, field: string) => {
        switch (field) {
            case "ui-framework-packages":
            case "frameworks":
                return (
                    <LargeCard
                        status={integration.status}
                        title={integration.name}
                        description={integration.description}
                        linkUrl={integration.url}
                        imageUrl={integration.icon}
                    />
                );
            case "community-packages":
                return (
                    <Card
                        status={integration.status}
                        title={integration.name}
                        description={integration.description}
                        linkUrl={integration.url}
                        imageUrl={integration.icon}
                        contributer={integration?.contributors[0]}
                    />
                );
            default:
                return (
                    <Card
                        status={integration.status}
                        title={integration.name}
                        description={integration.description}
                        linkUrl={integration.url}
                        imageUrl={integration.icon}
                    />
                );
        }
    };

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <span>ADD 3rd PARTY MODULES</span>
                        <span className={styles.headerTitleBold}>
                            AND SOLUTIONS
                        </span>
                    </div>
                    <p className={styles.headerText}>
                        Use your source control & CI/CD Pipeline. Deploy to
                        anywhere, including serverless, edge, cloud workers etc.
                    </p>
                </div>
                <div className={styles.integrationsWrapper}>
                    {integrationFields.map((field) => {
                        return (
                            <div key={field}>
                                <div className={styles.integrationTitle}>
                                    {field.replace(/-/g, " ").toUpperCase()}
                                </div>
                                <div className={styles.integrations}>
                                    {integrations[field].map((integration) =>
                                        renderIntegration(integration, field),
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Integrations;
