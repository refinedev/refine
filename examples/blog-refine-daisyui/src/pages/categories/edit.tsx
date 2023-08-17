import React from "react";
import { useNavigation, IResourceComponentsProps } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();

    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const categoriesData = queryResult?.data?.data;

    return (
        <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Category Edit</h1>
                <div>
                    <button
                        onClick={() => {
                            list("categories");
                        }}
                    >
                        Categories
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
                        <span style={{ marginRight: "8px" }}>Title</span>
                        <input
                            type="text"
                            {...register("title", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.title?.message as string}
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
                        <span style={{ marginRight: "8px" }}>Cover</span>
                        <textarea
                            rows={5}
                            cols={33}
                            style={{ verticalAlign: "top" }}
                            {...register("cover", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.cover?.message as string}
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
