import { Segmented as AntdSegmented, type SegmentedProps } from "antd";
import { createStyles } from "antd-style";
import { LayoutGrid, List } from "lucide-react";

type Props = {} & Omit<SegmentedProps, "options">;

export const ProductViewToggle = ({ onChange, ...props }: Props) => {
  const { styles } = useStyles();

  return (
    <AntdSegmented
      className={styles.segmented}
      onChange={onChange}
      options={[
        {
          value: "table",
          icon: <List />,
        },
        {
          value: "card",
          icon: <LayoutGrid />,
        },
      ]}
      {...props}
    />
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    segmented: {
      width: "88px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "80px",
      padding: "4px",

      "& .ant-segmented-group": {
        width: "unset",
      },

      "& .ant-segmented-item": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        borderRadius: "80px",
        color: token.colorTextTertiary,
      },

      "& .ant-segmented-item-icon": {
        width: "24px",
        height: "24px",
      },

      "& .ant-segmented-item-label": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px !important",
        minHeight: "24px !important",
        maxHeight: "24px !important",
        fontSize: "20px !important",
      },

      "& .ant-segmented-item-selected": {
        color: "black",
      },

      "& .ant-segmented-thumb": {
        borderRadius: "80px",
      },
    },
  };
});
