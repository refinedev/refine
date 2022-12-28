import { HttpError, useForm } from "@pankod/refine-core";

import { LoadingIcon } from "icons";
import { IPost } from "interfaces";
import { useState } from "react";

type FormValues = Omit<IPost, "id">;

export const PostCreate: React.FC = () => {
    const { formLoading, onFinish } = useForm<IPost, HttpError, FormValues>();

    const [formValues, seFormValues] = useState<FormValues>({
        title: "",
        content: "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};
