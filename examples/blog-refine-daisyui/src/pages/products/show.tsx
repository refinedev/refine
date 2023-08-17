import React from "react";
import {
    useShow,
    useResource,
    useNavigation,
    IResourceComponentsProps,
} from "@refinedev/core";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { edit, list } = useNavigation();
    const { id } = useResource();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <div style={{ padding: "16px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>Product Show</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => list("products")}>Products</button>
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
                    <h5>Is Active</h5>
                    <div>{record?.isActive ? "Yes" : "No"}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Description</h5>
                    <div>{record?.description}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Images</h5>
                    <p>{record?.images?.url}</p>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Created At</h5>
                    <div>
                        {new Date(record?.createdAt).toLocaleString(undefined, {
                            timeZone: "UTC",
                        })}
                    </div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Price</h5>
                    <div>{record?.price ?? ""}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Category</h5>
                    <div>{record?.category?.title}</div>
                </div>
            </div>
        </div>
    );
};
