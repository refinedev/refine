import React from "react";
import {
    useNavigation,
    IResourceComponentsProps,
    useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();

    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const productsData = queryResult?.data?.data;

    const { options: categoryOptions } = useSelect({
        resource: "categories",
        defaultValue: productsData?.category?.id,
    });

    React.useEffect(() => {
        setValue("category.id", productsData?.category?.id);
    }, [categoryOptions]);

    return (
        <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Product Edit</h1>
                <div>
                    <button
                        onClick={() => {
                            list("products");
                        }}
                    >
                        Products
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onFinish)}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>
                        <span style={{ marginRight: "8px" }}>Id</span>
                        <input
                            disabled
                            type="number"
                            {...register("id", {
                                required: "This field is required",
                                valueAsNumber: true,
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.id?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Name</span>
                        <input
                            type="text"
                            {...register("name", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.name?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Is Active</span>
                        <input
                            type="checkbox"
                            {...register("isActive", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {errors?.isActive?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Description</span>
                        <input
                            type="text"
                            {...register("description", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.description?.message as string}
                        </span>
                    </label>
                    <>
                        {productsData?.images?.map(
                            (item: any, index: number) => (
                                <label key={index}>
                                    <span style={{ marginRight: "8px" }}>
                                        Images
                                    </span>
                                    <input
                                        {...register(`images.${index}.url`, {
                                            required: "This field is required",
                                        })}
                                    />
                                    <span style={{ color: "red" }}>
                                        {
                                            (errors as any)?.images?.[index]
                                                ?.url?.message as string
                                        }
                                    </span>
                                </label>
                            ),
                        )}
                    </>
                    <label>
                        <span style={{ marginRight: "8px" }}>Created At</span>
                        <input
                            {...register("createdAt", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.createdAt?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Price</span>
                        <input
                            type="number"
                            {...register("price", {
                                required: "This field is required",
                                valueAsNumber: true,
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.price?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Category</span>
                        <select
                            placeholder="Select category"
                            {...register("category.id", {
                                required: "This field is required",
                            })}
                        >
                            {categoryOptions?.map((option) => (
                                <option value={option.value} key={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span style={{ color: "red" }}>
                            {(errors as any)?.category?.id?.message as string}
                        </span>
                    </label>
                    <div>
                        <input type="submit" value="Save" />
                    </div>
                </div>
            </form>
        </div>
    );
};
