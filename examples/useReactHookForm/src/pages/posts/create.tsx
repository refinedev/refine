import React, { useState } from "react";
import {
    Create,
    IResourceComponentsProps,
    useSelect,
    useReactHookForm,
} from "@pankod/refine";

import { Controller } from "react-hook-form";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";
import "./create.css";

import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    const { saveButtonProps, register, formProps, control, setValue } =
        useReactHookForm<IPost>({});

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    console.log({ categorySelectProps });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    React.useEffect(() => {
        register("category.id");
    });

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <form {...formProps}>
                <input {...register("title", { required: true })} />
                <select {...register("status", { required: true })}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    onChange={(e) => {
                        setValue("category.id", parseInt(e.target.value));
                    }}
                >
                    {categorySelectProps.options?.map((category) => (
                        <option value={category.value} key={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <ReactMde
                            {...field}
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
            </form>
        </Create>
    );
};
