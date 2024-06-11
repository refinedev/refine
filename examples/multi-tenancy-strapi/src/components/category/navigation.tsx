import { useTenant } from "@/providers/tenant";
import type { Category } from "@/types";
import { useList } from "@refinedev/core";
import { Button } from "antd";
import { createStyles } from "antd-style";

type Props = {
  selectedCategoryId?: number | null;
  onAllClick?: () => void;
  onCategoryClick?: ({ id, title }: Category) => void;
};

export const CategoryNavigation = (props: Props) => {
  const { tenant } = useTenant();

  const { styles, cx } = useStyles();

  const { data } = useList<Category>({
    resource: "categories",
    filters: [
      {
        field: "store.id",
        operator: "eq",
        value: tenant.id,
      },
    ],
    pagination: {
      mode: "off",
    },
  });
  const categories = data?.data || [];

  return (
    <div
      className={cx(
        styles.container,
        categories.length > 8 && styles.overflowIndicator,
      )}
    >
      <Button
        onClick={() => {
          props.onAllClick?.();
        }}
        className={cx(
          styles.categoryItem,
          props.selectedCategoryId ? {} : styles.selectedCategoryItem,
        )}
      >
        🏷️ All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => {
            props.onCategoryClick?.(category);
          }}
          className={cx(
            styles.categoryItem,
            props.selectedCategoryId === category.id &&
              styles.selectedCategoryItem,
          )}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      position: "relative",
      width: "100%",
      padding: "8px 0px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    overflowIndicator: {
      "&:after": {
        content: '""',
        display: "flex",
        width: "140px",
        height: "80px",
        position: "fixed",
        right: 0,
        background:
          "linear-gradient(270deg, #FFFFFF 15%, rgba(255, 255, 255, 0) 100%)",
      },
    },
    categoryItem: {
      display: "flex",
      padding: "12px 16px",
      borderRadius: "32px",
      height: "48px",
    },
    selectedCategoryItem: {
      background: token.colorPrimaryBg,
      border: `1px solid ${token.controlItemBgActiveHover}`,
    },
  };
});
