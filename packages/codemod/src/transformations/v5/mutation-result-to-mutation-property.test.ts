import mutationResultToMutationPropertyTransform from "./mutation-result-to-mutation-property";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");

  return mutationResultToMutationPropertyTransform(
    { source },
    { jscodeshift: j },
  );
};

describe("mutation-result-to-mutation-property", () => {
  it("should handle destructuring mutation properties from useUpdate", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const { mutate, isPending, isError, data } = useUpdate();
      
      if (isPending) {
        return <div>Loading...</div>;
      }
      
      if (isError) {
        return <div>Error occurred</div>;
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle destructuring with renamed variables from useCreate", () => {
    const source = `
      import { useCreate } from "@refinedev/core";
      
      const { mutate, isPending: isCreating, error: createError } = useCreate();
      
      if (isCreating) {
        return <div>Creating...</div>;
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle multiple mutation hooks", () => {
    const source = `
      import { useUpdate, useDelete } from "@refinedev/core";
      
      const { mutate: updateMutate, isPending: updatePending } = useUpdate();
      const { mutate: deleteMutate, isPending: deletePending } = useDelete();
      
      if (updatePending || deletePending) {
        return <div>Loading...</div>;
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle direct variable assignment and property access", () => {
    const source = `
      import { useCustomMutation } from "@refinedev/core";
      
      const mutation = useCustomMutation();
      
      if (mutation.isPending) {
        return <div>Loading...</div>;
      }
      
      const error = mutation.error;
      const data = mutation.data;
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle optional chaining", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const updateMutation = useUpdate();
      
      const isPending = updateMutation?.isPending;
      const errorMessage = updateMutation?.error?.message;
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should not affect properties that remain at the top level", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const { mutate, mutateAsync, overtime } = useUpdate();
      
      mutate({ id: 1, values: { name: "Test" } });
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle mixed properties (top-level and mutation)", () => {
    const source = `
      import { useCreateMany } from "@refinedev/core";
      
      const { mutate, mutateAsync, isPending, error, overtime } = useCreateMany();
      
      if (isPending) {
        return <div>Creating records...</div>;
      }
      
      if (error) {
        console.error(error);
      }
      
      const handleCreate = () => {
        mutate({ values: [{ name: "Item 1" }, { name: "Item 2" }] });
      };
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle all affected mutation hooks", () => {
    const source = `
      import { 
        useCreate, 
        useUpdate, 
        useDelete, 
        useCreateMany, 
        useUpdateMany, 
        useDeleteMany, 
        useCustomMutation 
      } from "@refinedev/core";
      
      const { isPending: createPending } = useCreate();
      const { isPending: updatePending } = useUpdate();
      const { isPending: deletePending } = useDelete();
      const { isPending: createManyPending } = useCreateMany();
      const { isPending: updateManyPending } = useUpdateMany();
      const { isPending: deleteManyPending } = useDeleteMany();
      const { isPending: customPending } = useCustomMutation();
      
      const isAnyPending = createPending || updatePending || deletePending || 
                           createManyPending || updateManyPending || deleteManyPending || customPending;
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle complex component example", () => {
    const source = /* tsx */ `
      import { useUpdate, useDelete } from "@refinedev/core";

      export const ProductEdit = () => {
        const { mutate: updateMutate, isPending: updatePending, error: updateError } = useUpdate();
        const { mutate: deleteMutate, isPending: deletePending } = useDelete();
        
        const deleteProduct = useDelete();

        if (updatePending || deletePending) {
          return <div>Processing...</div>;
        }

        if (updateError) {
          return <div>Update failed: {updateError.message}</div>;
        }

        if (deleteProduct.isPending) {
          return <div>Deleting...</div>;
        }

        return (
          <div>
            <button onClick={() => updateMutate({ id: 1, values: { name: "Updated" } })}>
              Update Product
            </button>
            <button onClick={() => deleteMutate({ id: 1 })}>
              Delete Product
            </button>
          </div>
        );
      };
    `;
    expect(transform(source)).toMatchSnapshot();
  });
});
