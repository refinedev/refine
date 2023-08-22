import React from "react";
import {
    useShow,
    useResource,
    useNavigation,
    IResourceComponentsProps,
} from "@refinedev/core";
import { BackIcon, EditDocIcon } from "../../components/icons";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { edit, list } = useNavigation();
    const { id } = useResource();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="flex justify-start items-center">
                    <button
                        className="mr-2 btn btn-primary btn-sm btn-ghost"
                        onClick={() => list("products")}
                    >
                        <BackIcon />
                    </button>
                    <h1 className="page-title">Product Details</h1>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        className="flex justify-center items-center btn btn-primary btn-sm text-zinc-50 normal-case font-normal"
                        onClick={() => edit("products", id ?? "")}
                    >
                        <EditDocIcon />
                        Edit
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="text-xl font-bold">
                        {record?.name ?? "Loading..."}
                    </div>
                    <div className="divider p-0 m-0"></div>
                    <div className="mb-2">
                        <h5 className="mb-1 font-bold">Price</h5>
                        <div>{record?.price ? `$ ${record?.price}` : "Loading..."}</div>
                    </div>
                    <div className="mb-2">
                        <h5 className="mb-1 font-bold">Category</h5>
                        <div>{record?.category?.title ?? "Loading..."}</div>
                    </div>
                    <div className="mb-2">
                        <h5 className="mb-1 font-bold">Description</h5>
                        <div>{record?.description ?? "Loading..."}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
