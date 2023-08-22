import React from "react";
import {
    useShow,
    useResource,
    useNavigation,
    IResourceComponentsProps,
} from "@refinedev/core";
import { BackIcon, EditDocIcon } from "../../components/icons";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const { edit, list } = useNavigation();
    const { id } = useResource();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="flex justify-between items-center">
                    <button
                        className="mr-2 btn btn-primary btn-sm btn-ghost"
                        onClick={() => list("categories")}
                    >
                        <BackIcon />
                    </button>
                    <h1 className="page-title">Category Details</h1>
                </div>
                <div className="flex justify-start items-center">
                    <button
                        className="flex justify-center items-center btn btn-primary btn-sm text-zinc-50 normal-case font-normal"
                        onClick={() => edit("categories", id ?? "")}
                    >
                        <EditDocIcon />
                        Edit
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="mb-2">
                        <h5 className="text-xl font-bold">Id</h5>
                        <div>{record?.id ?? "Loading..."}</div>
                    </div>
                    <div className="mb-2">
                        <h5 className="text-xl font-bold">Name</h5>
                        <div>{record?.title ?? "Loading..."}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
