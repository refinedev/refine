import React from "react";
import {
    useShow,
    useResource,
    useNavigation,
    useOne,
} from "@pankod/refine-core";

export const ProductShow = () => {
    const { edit, list } = useNavigation();
    const { id } = useResource();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <div style={{ padding: "16px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>Product</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => list("products")}>
                        Products List
                    </button>
                    <button onClick={() => edit("products", id ?? "")}>
                        Edit
                    </button>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Id</h5>
                    <div>{record?.id ?? ""}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Name</h5>
                    <div>{record?.name}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Material</h5>
                    <div>{record?.material}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Description</h5>
                    <p>{record?.description}</p>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Price</h5>
                    <div>{record?.price}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Category</h5>
                    <div>
                        {categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            <>{categoryData?.data?.title}</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
