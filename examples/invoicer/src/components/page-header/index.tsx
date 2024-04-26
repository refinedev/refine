import { Button, Flex } from "antd";
import { PropsWithChildren } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useStyles } from "./styled";

type Props = {
  backButtonText?: string;
  backButtonHref?: string;
};

export const PageHeader = (props: PropsWithChildren<Props>) => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.container}>
      <Button icon={<LeftOutlined />} className={styles.button}>
        <Link to={props.backButtonHref || ""}>{props.backButtonText}</Link>
      </Button>
    </Flex>
  );
};
