import React from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useList, useNavigation } from "@refinedev/core";
import {
  Typography,
  Layout as AntdLayout,
  Button,
  theme,
  Flex,
  Tabs,
} from "antd";
import {
  BankOutlined,
  ShopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useColorMode } from "../../providers/color-mode";
import { IconMoon } from "../icons/icon-moon";
import { IconSun } from "../icons/icon-sun";
import { IconInvoicerLogo } from "../icons/icon-invoicer";
import { Search } from "./search";
import { Link } from "react-router-dom";
import { User } from "./user";
import { useStyles } from "./styled";
import { Logo } from "../logo";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { list, listUrl } = useNavigation();

  const location = useLocation();

  const { token } = theme.useToken();
  const { mode, setMode } = useColorMode();
  const { styles } = useStyles();

  return (
    <AntdLayout.Header
      className="print-hidden"
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 16px",
        minHeight: "48px",
        height: "max-content",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <Flex align="center" wrap="wrap">
          <Link to={listUrl("accounts")}>
            <Logo
              style={{
                width: "200px",
              }}
            />
          </Link>
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
        <Flex align="center" gap={32} className={styles.rightSlot}>
          <Search />
          <Button
            className={styles.themeSwitch}
            type="text"
            icon={mode === "light" ? <IconMoon /> : <IconSun />}
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          />
          <User />
        </Flex>
      </Flex>
    </AntdLayout.Header>
  );
};
