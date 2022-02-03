import React, { useState } from "react";
import { IResourceComponentsProps, useSelect } from "@pankod/refine-core";
import { useForm, Controller } from "@pankod/refine-react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Create } from "@pankod/refine-antd";
// import Select from "react-select";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const {
        refineCore: { onFinish, formLoading, queryResult: queryResultForm },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IPost>({
        defaultValues: {
            title: "",
            category: { id: undefined },
            status: "draft",
            content: "",
        },
        refineCoreProps: {
            // warnWhenUnsavedChanges: true,
            // redirect: false,
        },
    });

    const { queryResult, defaultValueQueryResult, options } =
        useSelect<ICategory>({
            resource: "categories",
            defaultValue: queryResultForm?.data?.data.category.id,
            onSearch: (value) => [
                {
                    field: "title",
                    operator: "containss",
                    value,
                },
            ],
        });

    return (
        <Create
            saveButtonProps={{
                onClick: handleSubmit(onFinish),
                loading: formLoading,
            }}
        >
            <form onSubmit={handleSubmit(onFinish)}>
                {/* <Select
                    defaultValue={null}
                    options={options}
                    onChange={(value) => onSearch(() => {})}
                /> */}

                <br />
                <label
                    htmlFor="title"
                    className="mb-2 inline-block font-bold text-gray-700"
                >
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    className="w-full rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-green-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    {...register("title", { required: "Title is required" })}
                />
                <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                        <p className="text-red-500">{message}</p>
                    )}
                />

                <label
                    htmlFor="category"
                    className="mb-2 mt-4 inline-block font-bold text-gray-700"
                >
                    Category
                </label>
                {!queryResult.isLoading && !defaultValueQueryResult.isLoading && (
                    <select
                        id="category"
                        className="w-full appearance-none rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-green-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                        aria-label="Category select"
                        {...register("category.id", {
                            required: "Category is required",
                            valueAsNumber: true,
                        })}
                    >
                        {options?.map((category) => (
                            <option
                                key={category.value}
                                value={category.value || undefined}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                )}
                <ErrorMessage
                    errors={errors}
                    name="category"
                    render={({ message }) => (
                        <p className="text-red-500">{message}</p>
                    )}
                />

                <label
                    htmlFor="status"
                    className="mb-2 mt-4 inline-block font-bold text-gray-700"
                >
                    Status
                </label>
                <select
                    id="status"
                    className="w-full appearance-none rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-green-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    aria-label="Status select"
                    {...register("status", { required: "Status is required" })}
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="rejected">Rejected</option>
                </select>
                <ErrorMessage
                    errors={errors}
                    name="status"
                    render={({ message }) => (
                        <p className="text-red-500">{message}</p>
                    )}
                />

                <label className="mb-2 mt-4 inline-block font-bold text-gray-700">
                    Content
                </label>
                <Controller
                    control={control}
                    name="content"
                    rules={{ required: "Content is required" }}
                    render={({ field: { onChange, ref, value } }) => (
                        <ReactMde
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={(markdown) =>
                                Promise.resolve(
                                    <ReactMarkdown>{markdown}</ReactMarkdown>,
                                )
                            }
                        />
                    )}
                />
                <ErrorMessage
                    errors={errors}
                    name="content"
                    render={({ message }) => (
                        <p className="text-red-500">{message}</p>
                    )}
                />
            </form>
        </Create>
    );
};
