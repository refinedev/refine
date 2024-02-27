"use client";

import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow, useTranslate } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export default function CategoryShow() {
  const t = useTranslate();
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{t("ID")}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{t("categories.fields.title")}</Title>
      <TextField value={record?.title} />
    </Show>
  );
}
