import React, { useEffect, useState } from "react";
import {
    Create,
    IResourceComponentsProps,
    useSelect,
    useWarnAboutChange,
    useForm as useFormCore,
} from "@pankod/refine-core";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const { warnWhenUnsavedChanges, setWarnWhen } = useWarnAboutChange();

    const { queryResult } = useSelect<ICategory>({
        resource: "categories",
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm();

    const { formLoading, onFinish } = useFormCore<IPost>({
        warnWhenUnsavedChanges: true,
        onMutationSuccess: () => {
            reset();
        },
    });

    useEffect(() => {
        const subscription = watch((values) => onValuesChange(values));
        return () => subscription.unsubscribe();
    }, [watch]);

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const onValuesChange = (changeValues: Record<string, any>) => {
        if (
            Object.keys(changeValues).filter(
                (key) => changeValues[key] !== undefined,
            ).length !== 0 &&
            warnWhenUnsavedChanges
        ) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    return (
        <Create
            saveButtonProps={{
                onClick: handleSubmit(onFinish),
                loading: formLoading,
            }}
        >
            <form onSubmit={handleSubmit(onFinish)}>
                <label
                    htmlFor="title"
                    className="inline-block mb-2 text-gray-700 font-bold"
                >
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    className="w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
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
                    className="inline-block mb-2 text-gray-700 font-bold mt-4"
                >
                    Category
                </label>
                {!queryResult.isLoading && (
                    <select
                        id="category"
                        className="appearance-none w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                        aria-label="Category select"
                        {...register("category.id", {
                            required: "Category is required",
                            valueAsNumber: true,
                        })}
                    >
                        {queryResult.data?.data.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
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
                    className="inline-block mb-2 text-gray-700 font-bold mt-4"
                >
                    Status
                </label>
                <select
                    id="status"
                    className="appearance-none w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
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

                <label className="inline-block mb-2 text-gray-700 font-bold mt-4">
                    Content
                </label>
                <Controller
                    control={control}
                    name="content"
                    defaultValue=""
                    rules={{ required: "Content is required" }}
                    render={({ field: { onChange, ref } }) => (
                        <ReactMde
                            ref={ref}
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
