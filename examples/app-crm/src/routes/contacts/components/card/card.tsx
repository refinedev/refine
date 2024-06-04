import React from "react";

import { useDelete, useNavigation } from "@refinedev/core";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  DeleteOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";

import { ContactStatusTag, CustomAvatar, Text } from "@/components";
import type { ContactsListQuery } from "@/graphql/types";

import styles from "./index.module.css";
import { ContactCardSkeleton } from "./skeleton";

type ContactCardProps = {
  contact: GetFieldsFromList<ContactsListQuery>;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { show } = useNavigation();
  const { mutate: deleteMutate } = useDelete();

  if (!contact) return <ContactCardSkeleton />;

  const { name, email, status, jobTitle, company, avatarUrl, id } = contact;
  const items: MenuProps["items"] = [
    {
      label: "Show",
      key: "show",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <EyeOutlined />,
      onClick: () => {
        show("contacts", id, "replace");
      },
    },
    {
      label: "Delete",
      key: "delete",
      danger: true,
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <DeleteOutlined />,
      onClick: () => {
        deleteMutate({
          resource: "contacts",
          id,
        });
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Dropdown
        className={styles.dropdown}
        menu={{ items }}
        trigger={["click"]}
      >
        {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
        <Button type="text" icon={<EllipsisOutlined />} />
      </Dropdown>

      <div className={styles.personal}>
        <CustomAvatar size={64} src={avatarUrl} name={name} />
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
        <Text ellipsis={{ tooltip: true }}>
          {(jobTitle && `${jobTitle} at`) || <span>&nbsp;</span>}
        </Text>
        <div className={styles.companyName}>
          <Text
            strong
            ellipsis={{
              tooltip: true,
            }}
          >
            <CustomAvatar
              src={company.avatarUrl}
              name={company.name}
              shape="square"
              style={{
                display: "inline-flex",
                marginRight: 8,
              }}
            />
            {company.name}
          </Text>
        </div>
      </div>
    </div>
  );
};
