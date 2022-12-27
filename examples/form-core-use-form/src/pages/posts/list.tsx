import React, { useState } from "react";
import { useList, useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";
import {
    EditIcon,
    ShowIcon,
    CreateIcon,
    ChevronsRightIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronsLeftIcon,
} from "icons";

const PAGE_SIZE = 10;

export const PostList: React.FC = () => {
    const [page, setPage] = useState(1);
    const { edit, create, show } = useNavigation();

    const { data } = useList<IPost>({
        resource: "posts",
        config: {
            pagination: {
                current: page,
                pageSize: PAGE_SIZE,
            },
        },
    });

    const posts = data?.data || [];
    const toalCount = data?.total || 0;

    const pageCount = Math.ceil(toalCount / PAGE_SIZE);
    const hasNext = page * PAGE_SIZE < toalCount;
    const hasPrev = page > 1;

    return (
        <div className="container mx-auto pb-4">
            <div className="container mx-auto pb-4">
                <button
                    className="ml-auto flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
                    onClick={() => create("posts")}
                >
                    {CreateIcon}
                    <span>Create Post</span>
                </button>
            </div>

            <table className="min-w-full table-fixed divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>ID</div>
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>Title</div>
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>Content</div>
                        </th>

                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                            <div>Action</div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {posts.map((post) => (
                        <tr
                            key={post.id}
                            className="transition hover:bg-gray-100"
                        >
                            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900">
                                {post.id}
                            </td>
                            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900">
                                {post.title}
                            </td>
                            <td className=" py-2 px-6 text-sm font-medium text-gray-900">
                                {post.content}
                            </td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                        onClick={() => edit("posts", post.id)}
                                    >
                                        {EditIcon}
                                    </button>
                                    <button
                                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                        onClick={() => show("posts", post.id)}
                                    >
                                        {ShowIcon}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-2 flex items-center justify-end gap-4">
                <div className="flex gap-1">
                    <button
                        onClick={() => setPage(1)}
                        disabled={!hasPrev}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsLeftIcon}
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={!hasPrev}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronLeftIcon}
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!hasNext}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronRightIcon}
                    </button>
                    <button
                        onClick={() => setPage(pageCount)}
                        disabled={!hasNext}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsRightIcon}
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {page} of {pageCount}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={page + 1}
                        onChange={(e) => {
                            const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                            setPage(value);
                        }}
                        className="w-12 rounded border border-gray-200 p-1 text-gray-700"
                    />
                </span>
            </div>
        </div>
    );
};
