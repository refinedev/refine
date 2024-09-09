import { MoreOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

export const TableActionButton = ({ onClick }: Props) => {
  const { styles } = useStyles();
  return (
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    <MoreOutlined
      role="button"
      className={styles.button}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    />
  );
};
