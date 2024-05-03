import React, { useState } from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import {
  Input,
  Typography,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  Flex,
  Tabs,
  Skeleton,
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
import { CustomAvatar } from "../avatar";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { list } = useNavigation();

  const location = useLocation();

  const { token } = theme.useToken();
  const { data: user, isLoading } = useGetIdentity<IUser>();
  const { mode, setMode } = useColorMode();
  const { styles } = useStyles();

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState([]);

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
        <Flex align="center" gap={32} className={styles.rightSlot}>
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
            <div
              style={{
                width: "112px",
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
