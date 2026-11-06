import React from "react";

type StatusType = "published" | "draft" | "rejected" | string;

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<
  string,
  { label: string; dot: string; bg: string; text: string; border: string }
> = {
  published: {
    label: "Published",
    dot: "#10b981",
    bg: "#f0fdf4",
    text: "#166534",
    border: "#dcfce7",
  },
  draft: {
    label: "Draft",
    dot: "#94a3b8",
    bg: "#f8fafc",
    text: "#475569",
    border: "#e2e8f0",
  },
  rejected: {
    label: "Rejected",
    dot: "#f43f5e",
    bg: "#fff1f2",
    text: "#9f1239",
    border: "#ffe4e6",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || {
    label: status,
    dot: "#94a3b8",
    bg: "#f8fafc",
    text: "#475569",
    border: "#e2e8f0",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 8px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 500,
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        lineHeight: "18px",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: config.dot,
        }}
      />
      {config.label}
    </span>
  );
};
