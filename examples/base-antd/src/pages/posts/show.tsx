import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";
import { Typography, Space, Card, Divider } from "antd";
import type { IPost, ICategory } from "../../interfaces";
import { StatusBadge } from "../../components/StatusBadge";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<ICategory>({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record?.category?.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <div style={{ maxWidth: 860 }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space align="center" size="middle">
            <span
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                fontSize: 13,
                color: "#94a3b8",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              #{record?.id}
            </span>
            {record?.status && <StatusBadge status={record.status} />}
            <span
              style={{
                fontSize: 12,
                color: "#64748b",
                backgroundColor: "#f1f5f9",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              {categoryIsLoading
                ? "Loading category..."
                : categoryData?.title || "Uncategorized"}
            </span>
          </Space>

          <Title
            level={3}
            style={{
              margin: "12px 0 4px 0",
              color: "#0f172a",
              fontWeight: 600,
            }}
          >
            {record?.title}
          </Title>
        </Space>

        <Divider style={{ margin: "20px 0" }} />

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: 8,
            border: "1px solid #f1f5f9",
            lineHeight: 1.7,
          }}
        >
          <Text
            type="secondary"
            style={{
              display: "block",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Body Content
          </Text>
          <MarkdownField value={record?.content} />
        </div>
      </div>
    </Show>
  );
};
