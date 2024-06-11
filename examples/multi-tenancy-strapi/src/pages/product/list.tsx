import { CategoryNavigation } from "@/components/category";
import { ProductCards, ProductTable } from "@/components/product";
import { ProductViewToggle } from "@/components/product/product-view-toggle";
import { useTenant } from "@/providers/tenant";
import type { Category, Product } from "@/types";
import { CreateButton, useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo, useParsed } from "@refinedev/core";
import { Typography } from "antd";
import { createStyles } from "antd-style";
import { PlusCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

type View = "table" | "card";

type ProductWithCategories = Product & {
  category: Category;
};

const PAGE_SIZE = {
  card: 9,
  table: 10,
} as const;

export const ProductList = ({ children }: PropsWithChildren) => {
  const { styles } = useStyles();
  const { tenant } = useTenant();
  const go = useGo();
  const { params } = useParsed<{
    view?: View;
    categoryId?: string;
  }>();

  const view = params?.view || "card";

  const useTableResult = useTable<ProductWithCategories>({
    sorters: {
      initial: [
        {
          field: "updatedAt",
          order: "desc",
        },
      ],
    },
    pagination: {
      pageSize: PAGE_SIZE[view],
    },
    filters: {
      initial: [{ field: "title", operator: "contains", value: "" }],
      permanent: [
        {
          field: "store.id",
          operator: "eq",
          value: tenant.id,
        },
      ],
    },
    meta: {
      populate: ["image", "category"],
    },
  });

  if (useTableResult.pageSize !== PAGE_SIZE[view]) {
    useTableResult.setPageSize(PAGE_SIZE[view]);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Title level={3} className={styles.title}>
            Products
          </Typography.Title>
          <div className={styles.headerActions}>
            <ProductViewToggle
              value={view}
              onChange={(view) => {
                useTableResult.setPageSize(view === "card" ? 3 : 10);
                useTableResult.setCurrent(1);
                go({
                  query: { view },
                  options: { keepQuery: true },
                });
              }}
            />
            <CreateButton
              className={styles.createButton}
              icon={<PlusCircle />}
              onClick={() => {
                go({
                  to: {
                    resource: "products",
                    action: "create",
                  },
                  options: { keepQuery: true },
                });
              }}
            >
              Add new product
            </CreateButton>
          </div>
        </div>
        {view === "card" ? (
          <>
            <div className={styles.categoryNavigation}>
              <CategoryNavigation
                selectedCategoryId={Number(
                  getDefaultFilter("category.id", useTableResult.filters),
                )}
                onAllClick={() => {
                  useTableResult.setFilters([
                    {
                      field: "category.id",
                      operator: "eq",
                      value: null,
                    },
                  ]);
                  useTableResult.setCurrent(1);
                }}
                onCategoryClick={(category) => {
                  useTableResult.setFilters([
                    {
                      field: "category.id",
                      operator: "eq",
                      value: category.id,
                    },
                  ]);
                  useTableResult.setCurrent(1);
                }}
              />
            </div>
            <ProductCards useTableResult={useTableResult} />
          </>
        ) : (
          <ProductTable useTableResult={useTableResult} />
        )}
      </div>
      {children}
    </>
  );
};

const useStyles = createStyles(() => {
  return {
    container: {
      width: "100%",
    },
    header: {
      height: "56px",
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      justifyContent: "space-between",
      alignItems: "center",

      "@media (max-width: 768px)": {
        height: "max-content",
      },
    },
    headerActions: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "24px",
      marginLeft: "auto",
    },
    title: {
      margin: "0 !important",
      textTransform: "capitalize",
    },
    categoryNavigation: {
      width: "100%",
      overflowX: "auto",
      paddingTop: "16px",
      paddingBottom: "16px",
      marginTop: "16px",
      marginBottom: "24px",
      borderTop: "1px solid #F5F5F5",
      borderBottom: "1px solid #F5F5F5",
    },
    createButton: {
      height: "48px",
      borderRadius: "80px",
      fontSize: "16px",
    },
  };
});
