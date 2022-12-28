import { useForm } from "@pankod/refine-core";
import { Toggle } from "components";
import { LoadingIcon } from "icons";
import { IPost } from "interfaces";
import { useEffect, useState } from "react";

type FormValues = Omit<IPost, "id">;

export const PostEdit: React.FC = () => {
    const [action, setAction] = useState<"edit" | "clone">("clone");

    const { formLoading, onFinish, queryResult } = useForm<FormValues>({
        action,
    });
    const defaultValues = queryResult?.data?.data;

    const [formValues, seFormValues] = useState<FormValues>({
        title: defaultValues?.title || "",
        content: defaultValues?.content || "",
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

    useEffect(() => {
        seFormValues({
            title: defaultValues?.title || "",
            content: defaultValues?.content || "",
        });
    }, [defaultValues]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <Toggle
                    checkedLabel="Clone"
                    uncheckedLabel="Clone"
                    checked={action === "clone"}
                    onChange={(checked) =>
                        setAction(checked ? "clone" : "edit")
                    }
                />
            </div>
            <br />
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
                        rows={10}
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
