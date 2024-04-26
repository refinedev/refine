import React, { useState } from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import {
  Input,
  Avatar,
  Typography,
  Grid,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  Flex,
  Tabs,
} from "antd";
import debounce from "lodash/debounce";
import {
  SearchOutlined,
  BankOutlined,
  ShopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { useColorMode } from "../../providers/color-mode";
import { useStyles } from "./styled";
import { IconMoon } from "../icons/icon-moon";
import { IconSun } from "../icons/icon-sun";
import { IconInvoicerLogo } from "../icons/icon-invoicer";
import { IUser } from "../../interfaces";
import { useLocation } from "react-router-dom";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { list } = useNavigation();

  const location = useLocation();

  const { token } = theme.useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useColorMode();
  const { styles } = useStyles();

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState([]);

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 16px",
        height: "48px",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <Flex align="center" gap={24}>
          <Flex
            align="center"
            gap={12}
            style={{
              width: "200px",
              height: "48px",
            }}
          >
            <IconInvoicerLogo />
            <div>
              <Typography.Text className={styles.headerTitleRefine}>
                Refine{" "}
              </Typography.Text>
              <Typography.Text className={styles.headerTitleInvoicer}>
                Invoicer
              </Typography.Text>
            </div>
          </Flex>
          <Tabs
            className={styles.tabs}
            activeKey={location.pathname.split("/")[1]}
            onChange={(key) => {
              list(key);
            }}
            items={[
              {
                key: "accounts",
                label: "Accounts",
                icon: <BankOutlined />,
              },
              {
                key: "clients",
                label: "Clients",
                icon: <ShopOutlined />,
              },
              {
                key: "invoices",
                label: "Invoices",
                icon: <ContainerOutlined />,
              },
            ]}
          />
        </Flex>
        <Flex align="center" gap={32}>
          <AutoComplete
            style={{
              width: "100%",
              maxWidth: "256px",
            }}
            filterOption={false}
            options={options}
            value={value}
            onSearch={debounce((value: string) => setValue(value), 300)}
          >
            <Input
              size="middle"
              placeholder="Search"
              suffix={<div className={styles.inputSuffix}>/</div>}
              prefix={<SearchOutlined className={styles.inputPrefix} />}
            />
          </AutoComplete>
          <Button
            className={styles.themeSwitch}
            type="text"
            icon={mode === "light" ? <IconMoon /> : <IconSun />}
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          />
          <Flex align="center" gap={16}>
            <Typography.Text ellipsis className={styles.userName}>
              {user?.name || "James Sullivan"}
            </Typography.Text>
            <Avatar
              size={32}
              src={
                user?.avatar || "https://randomuser.me/api/portraits/men/0.jpg"
              }
              alt={user?.name}
            />
          </Flex>
        </Flex>
      </Flex>
    </AntdLayout.Header>
  );
};
