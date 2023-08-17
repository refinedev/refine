import React from "react";
import {
    useShow,
    useResource,
    useNavigation,
    IResourceComponentsProps,
} from "@refinedev/core";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
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
                <h1>Category Show</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => list("categories")}>
                        Categories
                    </button>
                    <button onClick={() => edit("categories", id ?? "")}>
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
                    <h5>Title</h5>
                    <div>{record?.title}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Is Active</h5>
                    <div>{record?.isActive ? "Yes" : "No"}</div>
                </div>
                <div style={{ marginTop: "6px" }}>
                    <h5>Cover</h5>
                    <p>{record?.cover}</p>
                </div>
            </div>
        </div>
    );
};
