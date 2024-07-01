import { ConfigProvider } from "@/providers/config";
import { useTenant } from "@/providers/tenant";
import { useLogout, useMenu } from "@refinedev/core";
import { Button, Drawer, Typography, theme } from "antd";
import { createStyles } from "antd-style";
import { Menu, PowerCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  mode: "fixed" | "drawer";
};

export const Sider = (props: Props) => {
  const { styles, cx } = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const Wrapper = props.mode === "fixed" ? "div" : Drawer;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Wrapper
        className={cx(props.mode === "fixed" ? styles.fixed : styles.drawer)}
        open={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
        placement="left"
      >
        <TenantList />
        <ResourceList />
      </Wrapper>
      {props.mode === "drawer" && (
        <Button
          className={styles.drawerButton}
          onClick={() => setDrawerIsOpen((prev) => !prev)}
          icon={<Menu />}
        />
      )}
    </ConfigProvider>
  );
};

const TenantList = () => {
  const { styles, cx } = useStyles();

  const { tenants, tenant: tenantCurrent } = useTenant();
  const { selectedKey } = useMenu({
    hideOnMissingParameter: false,
  });

  const { mutate: logout, isLoading } = useLogout();

  return (
    <div className={styles.tenantContainer}>
      <div className={styles.tenantList}>
        {tenants.map((tenant) => {
          return (
            <Link
              to={`/${tenant.id}${selectedKey}`}
              key={tenant.id}
              className={cx(
                styles.tenantItem,
                tenant.id === tenantCurrent.id && styles.tenantItemSelected,
              )}
            >
              <img
                src={tenant.icon.url}
                alt={tenant.icon.name}
                className={styles.tenantIcon}
              />
            </Link>
          );
        })}
      </div>
      <Button
        type="text"
        className={styles.logout}
        onClick={() => logout()}
        disabled={isLoading}
        icon={<PowerCircle />}
      />
    </div>
  );
};

const ResourceList = () => {
  const { styles, cx } = useStyles();

  const { selectedKey, menuItems } = useMenu({
    hideOnMissingParameter: false,
  });

  const { tenant } = useTenant();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className={styles.resourceContainer}>
        <div className={styles.tenantTitleContainer}>
          <img
            className={styles.tenantImage}
            src={tenant.image.url}
            alt={tenant.title}
          />
          <Typography.Title level={1} className={styles.tenantTitle}>
            {tenant.title.split(" ")[0]}
          </Typography.Title>
        </div>
        <div className={styles.resourceList}>
          {menuItems.map((item) => {
            const isSelected = item.key === selectedKey;
            return (
              <Link
                to={item.route || ""}
                key={item.name}
                className={cx(
                  styles.resourceItem,
                  isSelected && styles.resourceItemSelected,
                )}
              >
                <div className={styles.resourceIcon}>{item.icon}</div>
                <Typography.Text className={styles.resourceLabel}>
                  {item.label}
                </Typography.Text>
              </Link>
            );
          })}
        </div>
      </div>
    </ConfigProvider>
  );
};

export const useStyles = createStyles(({ token }) => {
  return {
    fixed: {
      position: "fixed",
      zIndex: 10,
      top: 0,
      left: 0,
      display: "flex",
      height: "100%",
      width: "312px",
    },
    drawer: {
      "& .ant-drawer-content-wrapper": {
        width: "312px !important",
      },

      "& .ant-drawer-body": {
        display: "flex",
        padding: 0,
      },
    },
    drawerButton: {
      position: "fixed",
      top: "24px",
      left: "0px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      zIndex: 10,
    },
    tenantContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "160px 0px 12px 0px",
      width: "72px",
      height: "100%",
      backgroundColor: "black",
    },
    tenantList: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    tenantItem: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "48px",
      width: "48px",
      borderRadius: "64px",
      color: "#bfbfbf",
      backgroundColor: token.colorBgElevated,

      "&:hover": {
        color: token.colorPrimaryTextHover,
        fill: token.colorPrimaryTextHover,
      },
    },
    tenantIcon: {},
    tenantItemSelected: {
      color: "white",
      backgroundColor: token.colorPrimaryBorderHover,

      "&:hover": {
        color: "white",
        backgroundColor: token.colorPrimaryBorderHover,
      },
    },
    tenantTitleContainer: {
      position: "relative",
    },
    tenantImage: {
      width: "100%",
      objectFit: "cover",
      aspectRatio: "240/136",
    },
    tenantTitle: {
      position: "absolute",
      bottom: "16px",
      left: "50%",
      whiteSpace: "nowrap",
      transform: "translateX(-50%)",
      fontSize: "24px !important",
      lineHeight: "24px !important",
      margin: "0 !important",
      fontWeight: "900 !important",
      textTransform: "uppercase",
      textShadow: "0px 4px 0 rgba(17, 26, 44, 1)",
    },
    resourceContainer: {
      backgroundColor: token.controlItemBgActiveHover,
      height: "100dvh",
      width: "100%",
      flex: 1,
    },
    resourceList: {
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    resourceItem: {
      cursor: "pointer",
      width: "100%",
      display: "flex",
      borderRadius: "80px",
      alignItems: "center",
      gap: "12px",
      height: "48px",
      paddingLeft: "16px",
      color: "#bfbfbf",

      "&:hover": {
        color: token.colorPrimaryTextHover,
      },
    },
    resourceItemSelected: {
      color: "white",
      backgroundColor: token.colorPrimaryBorderHover,

      "&:hover": {
        color: "white",
        backgroundColor: token.colorPrimaryBorderHover,
      },
    },
    resourceIcon: {
      height: "24px",
      width: "24px",
    },
    resourceLabel: {
      fontSize: "16px",
      color: "inherit",
    },
    logout: {
      cursor: "pointer",
      color: "#595959",
      backgroundColor: token.colorBgContainer,
      height: "48px !important",
      width: "48px !important",
      borderRadius: "64px",
      flexShrink: 0,
    },
  };
});
