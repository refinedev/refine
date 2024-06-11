import { Tag, Typography } from "antd";
import { createStyles } from "antd-style";
import type { ReactNode } from "react";
import { AvailableIcon } from "../icons/available";
import { UnavailableIcon } from "../icons/unavailable";

type Props = {
  status: boolean;
  texts?: {
    true: ReactNode;
    false: ReactNode;
  };
  icons?: {
    true: ReactNode;
    false: ReactNode;
  };
};

export const StatusTag = (props: Props) => {
  const { styles, cx } = useStyles();

  const texts = props.texts || {
    true: "Available",
    false: "Unavailable",
  };

  const icon = props.icons || {
    true: <AvailableIcon />,
    false: <UnavailableIcon />,
  };

  return (
    <Tag
      className={cx(
        styles.tag,
        props.status ? styles.tagTextTrue : styles.tagTextFalse,
      )}
      color={props.status ? "success" : "default"}
      icon={props.status ? icon.true : icon.false}
    >
      <Typography.Text
        className={props.status ? styles.tagTextTrue : styles.tagTextFalse}
      >
        {props.status ? texts.true : texts.false}
      </Typography.Text>
    </Tag>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    tag: {
      maxWidth: "max-content",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      borderRadius: "40px",
      padding: "0px 8px 0px 4px",
    },
    tagTextTrue: {
      fontSize: "12px",
      color: "#3C8618",
    },
    tagTextFalse: { fontSize: "12px", color: token.colorTextTertiary },
  };
});
