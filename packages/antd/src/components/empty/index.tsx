import React from "react";
import { Empty as AntdEmpty, Typography } from "antd";

export interface EmptyProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * `<Empty>` is a presentational component you can render when a table, list, or grid has
 * no data to display. It does not detect *why* the data is empty (no records at all, no
 * search results, no results after filtering) - pass the `title`, `description`, and
 * `action` that fit your context.
 *
 * It uses Ant Design's {@link https://ant.design/components/empty `<Empty>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/empty} for more details.
 */
export const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  action,
  icon,
  className,
  style,
}) => {
  return (
    <AntdEmpty
      className={className}
      style={style}
      image={
        <span aria-hidden="true">
          {icon ?? AntdEmpty.PRESENTED_IMAGE_DEFAULT}
        </span>
      }
      description={
        title || description ? (
          <>
            {title && <Typography.Title level={3}>{title}</Typography.Title>}
            {description && (
              <Typography.Text type="secondary">{description}</Typography.Text>
            )}
          </>
        ) : null
      }
    >
      {action}
    </AntdEmpty>
  );
};
