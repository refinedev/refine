import { Button, Flex } from "antd";
import { PropsWithChildren } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useStyles } from "./styled";

type Props = {
  backButtonText?: string;
  backButtonHref?: string;
  extra?: React.ReactNode;
};

export const PageHeader = (props: PropsWithChildren<Props>) => {
  const { styles, cx } = useStyles();

  return (
    <Flex
      gap={16}
      align="center"
      justify="space-between"
      className={cx(styles.container, "print-hidden")}
    >
      <Button icon={<LeftOutlined />} className={styles.button}>
        <Link to={props.backButtonHref || ""}>{props.backButtonText}</Link>
      </Button>
      {props.extra}
    </Flex>
  );
};
