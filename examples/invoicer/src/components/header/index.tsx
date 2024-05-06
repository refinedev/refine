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
  Skeleton,
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
import { CustomAvatar } from "../avatar";
import { Search } from "./search";
import { IUser } from "../../interfaces";
import { useStyles } from "./styled";
import { Link } from "react-router-dom";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { list, listUrl } = useNavigation();

  const location = useLocation();

  const { token } = theme.useToken();
  const { data: user, isLoading } = useGetIdentity<IUser>();
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
          <Flex align="center" gap={16}>
            <div
              style={{
                width: "114px",
              }}
            >
              <Typography.Text ellipsis className={styles.userName}>
                {isLoading ? (
                  <Skeleton.Input
                    style={{
                      width: "100px",
                      height: "32px",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  user?.username
                )}
              </Typography.Text>
            </div>
            <CustomAvatar
              size={32}
              src={"https://randomuser.me/api/portraits/lego/5.jpg"}
              alt={user?.username}
            />
          </Flex>
        </Flex>
      </Flex>
    </AntdLayout.Header>
  );
};
