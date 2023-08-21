import React from "react";
import { Avatar, Card } from "antd";

import { Text } from "../../text";
import { ContactStatusTag } from "../status-tag";

import { Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type ContactCardProps = {
    contact: Contact;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const { name, email, status, jobTitle, company } = contact;
    return (
        <div className={styles.container}>
            <div className={styles.personal}>
                <Avatar className={styles.avatar} size={64}>
                    {name[0]}
                </Avatar>
                <Text
                    className={styles.name}
                    strong
                    ellipsis={{
                        tooltip: true,
                    }}
                >
                    {name}
                </Text>
                <Text
                    ellipsis={{
                        tooltip: true,
                    }}
                    className={styles.email}
                >
                    {email}
                </Text>
                <ContactStatusTag status={status} />
            </div>

            <div className={styles.company}>
                <Text
                    ellipsis={{
                        tooltip: true,
                    }}
                >
                    {jobTitle}
                </Text>
                <div className={styles.companyName}>
                    <Text
                        strong
                        ellipsis={{
                            tooltip: true,
                        }}
                    >
                        {company.name}
                    </Text>
                </div>
            </div>
        </div>
    );
};
