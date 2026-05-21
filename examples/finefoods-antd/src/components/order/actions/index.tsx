import { useTranslate, useUpdate } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, type MenuProps } from "antd";
import { TableActionButton } from "../../tableActionButton";
import type { IOrder } from "../../../interfaces";

type OrderActionProps = {
  record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
  const t = useTranslate();
  const { mutate } = useUpdate({ resource: "orders", id: record.id });

  const moreMenuItems = (record: IOrder): MenuProps["items"] => [
    {
      key: "accept",
      label: t("buttons.accept"),
      style: {
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
      },
      disabled: record.status.text !== "Pending",
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#52c41a",
            fontSize: 17,
            fontWeight: 500,
          }}
        />
      ),
      onClick: () => {
        mutate({
          values: {
            status: {
              id: 2,
              text: "Ready",
            },
          },
        });
      },
    },
    {
      key: "reject",
      label: t("buttons.reject"),
      style: {
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
      },
      icon: (
        <CloseCircleOutlined
          style={{
            color: "#EE2A1E",
            fontSize: 17,
          }}
        />
      ),
      disabled:
        record.status.text === "Delivered" ||
        record.status.text === "Cancelled",
      onClick: () =>
        mutate({
          values: {
            status: {
              id: 5,
              text: "Cancelled",
            },
          },
        }),
    },
  ];

  return (
    <Dropdown
      menu={{
        mode: "vertical",
        onClick: ({ domEvent }) => domEvent.stopPropagation(),
        items: moreMenuItems(record),
      }}
      trigger={["click"]}
    >
      <TableActionButton />
    </Dropdown>
  );
};
