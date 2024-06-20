import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Flex, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";

export const StoreCreate = () => {
  const t = useTranslate();

  return (
    <>
      <Flex>
        {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
        <ListButton icon={<LeftOutlined />}>{t("stores.stores")}</ListButton>
      </Flex>
      <Divider />
      <StoreForm action="create" />
    </>
  );
};
