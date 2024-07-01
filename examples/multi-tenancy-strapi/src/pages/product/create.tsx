import { Drawer } from "@/components/drawer";
import { ProductForm } from "@/components/product/product-form";
import { useGo } from "@refinedev/core";

export const ProductCreate = () => {
  const go = useGo();

  const onClose = () => {
    go({
      to: {
        resource: "products",
        action: "list",
      },
      options: { keepQuery: true },
    });
  };

  return (
    <Drawer
      open={true}
      closable={false}
      onClose={onClose}
      title="Create Product"
    >
      <ProductForm onMutationSuccess={onClose} onCancel={onClose} />
    </Drawer>
  );
};
