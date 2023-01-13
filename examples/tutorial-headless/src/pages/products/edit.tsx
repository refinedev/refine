import React from "react";
import { useNavigation, useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const ProductEdit = () => {
    const { list } = useNavigation();

    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    const productsData = queryResult?.data?.data;

    const { options: categoryOptions } = useSelect({
        resource: "categories",
        defaultValue: productsData?.category?.id,
    });

    React.useEffect(() => {
        resetField("category.id");
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
                        Products List
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
                        <span style={{ marginRight: "8px" }}>Material</span>
                        <input
                            type="text"
                            {...register("material", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.material?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Description</span>
                        <textarea
                            rows={5}
                            cols={33}
                            style={{ verticalAlign: "top" }}
                            {...register("description", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.description?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Price</span>
                        <input
                            type="text"
                            {...register("price", {
                                required: "This field is required",
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
