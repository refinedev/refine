import { useForm } from "@refinedev/core";
import { IPost } from "interfaces";
import { useEffect, useState } from "react";

type FormValues = Omit<IPost, "id">;

export const PostEdit: React.FC = () => {
    const { formLoading, onFinish, queryResult } = useForm<FormValues>();
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Content"
                        rows={10}
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" disabled={formLoading}>
                    {formLoading && <div>Loading...</div>}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};
