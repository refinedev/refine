import type { ThemeConfig } from "antd";

export const modernTheme: ThemeConfig = {
  token: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Geist", "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    colorPrimary: "#0f172a", // Deep slate for an authoritative, modern tone
    colorInfo: "#3b82f6",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorBgBase: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorBgContainer: "#ffffff",
    colorBorder: "#e2e8f0",
    colorBorderSecondary: "#f1f5f9",
    colorText: "#0f172a",
    colorTextSecondary: "#64748b",
    colorTextTertiary: "#94a3b8",
    colorTextHeading: "#0f172a",
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 10,
    fontSize: 14,
    lineHeight: 1.5714,
    controlHeight: 36,
  },
  components: {
    Layout: {
      colorBgHeader: "#ffffff",
      colorBgBody: "#f8fafc",
      colorBgTrigger: "#f8fafc",
    },
    Menu: {
      itemBorderRadius: 6,
      itemMarginInline: 8,
      itemSelectedBg: "#f1f5f9",
      itemSelectedColor: "#0f172a",
      itemHoverBg: "#f8fafc",
      itemColor: "#64748b",
      fontSize: 13,
    },
    Table: {
      headerBg: "#f8fafc",
      headerColor: "#475569",
      headerSplitColor: "transparent",
      borderColor: "#f1f5f9",
      rowHoverBg: "#f8fafc",
      fontSize: 13,
      padding: 14,
      borderRadius: 8,
    },
    Card: {
      headerBg: "#ffffff",
      headerFontSize: 15,
      paddingLG: 20,
    },
    Button: {
      controlHeight: 36,
      borderRadius: 6,
      defaultBorderColor: "#e2e8f0",
      defaultColor: "#1e293b",
      defaultHoverBg: "#f8fafc",
      defaultHoverBorderColor: "#cbd5e1",
      defaultHoverColor: "#0f172a",
    },
    Input: {
      controlHeight: 36,
      borderRadius: 6,
      colorBorder: "#e2e8f0",
    },
    Select: {
      controlHeight: 36,
      borderRadius: 6,
      colorBorder: "#e2e8f0",
    },
    Tag: {
      borderRadius: 4,
    },
    Pagination: {
      itemSize: 32,
      borderRadius: 6,
    },
  },
};
