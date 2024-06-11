import { useResource } from "@refinedev/core";
import { Pagination as AntdPagination, type PaginationProps } from "antd";
import { createStyles } from "antd-style";

export const Pagination = (props: PaginationProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.paginationContainer}>
      <PaginationTotal total={props.total || 0} />
      <AntdPagination {...props} showSizeChanger={false} />
    </div>
  );
};

type PaginationTotalProps = {
  total: number;
};

export const PaginationTotal = ({ total }: PaginationTotalProps) => {
  const { styles } = useStyles();

  const { resource } = useResource();
  const resourceName = resource?.meta?.label || resource?.name;

  return (
    <span className={styles.paginationTotalContainer}>
      <span className={styles.paginationTotalNumber}>{total}</span>{" "}
      <span className={styles.paginationTotalText}>
        {resourceName} in total
      </span>
    </span>
  );
};

export const useStyles = createStyles(({ token }) => {
  return {
    paginationContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    paginationTotalContainer: {
      marginRight: "auto",
    },
    paginationTotalNumber: {
      color: token.colorTextSecondary,
    },
    paginationTotalText: { color: token.colorTextTertiary },
  };
});
