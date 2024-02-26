import React, { FC } from "react";
import {
  PageHeader as AntdPageHeader,
  PageHeaderProps as AntdPageHeaderProps,
} from "@ant-design/pro-layout";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export type PageHeaderProps = AntdPageHeaderProps;

export const PageHeader: FC<AntdPageHeaderProps> = ({ children, ...props }) => {
  const backIcon =
    typeof props.backIcon === "undefined" ? (
      <Button type="text" icon={<ArrowLeftOutlined />} />
    ) : (
      props.backIcon
    );

  const title =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.Title}
        level={4}
        style={{ marginBottom: 0 }}
      >
        {props.title}
      </Typography.Title>
    ) : (
      props.title
    );

  const subtitle =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.SubTitle}
        level={5}
        type="secondary"
        style={{ marginBottom: 0 }}
      >
        {props.subTitle}
      </Typography.Title>
    ) : (
      props.subTitle
    );

  return (
    <AntdPageHeader
      {...props}
      backIcon={backIcon}
      title={title}
      subTitle={subtitle}
      style={{ padding: 0, ...props.style }}
    >
      {children}
    </AntdPageHeader>
  );
};
