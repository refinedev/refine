import React, { useEffect, useState } from "react";
import { useSelect, useForm, useNavigation } from "@pankod/refine-core";
import { IPost } from "interfaces";
import { v4 as uuidv4 } from "uuid";

export const PostEdit: React.FC = () => {
    const { formLoading, onFinish, redirect, queryResult } = useForm<IPost>();

    const result = queryResult?.data?.data;

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    const [formValues, setFormValues] = useState({
        id: result?.id.toString(),
        title: result?.title,
        content: result?.content,
        status: result?.status,
        category: {
            id: result?.category.id,
        },
    });

    useEffect(() => {
        setFormValues({
            id: result?.id.toString(),
            title: result?.title,
            content: result?.content,
            status: result?.status,
            category: {
                id: result?.category.id,
            },
        });
    }, [result]);

    const { goBack } = useNavigation();

    const handleSubmit = async (
        e: React.MouseEvent<HTMLInputElement>,
        redirectTo: "list" | "edit" | "create",
    ) => {
        e.preventDefault();
        await onFinish(formValues);

        setFormValues({
            id: uuidv4(),
            title: "",
            content: "",
            status: "draft",
            category: {
                id: 1,
            },
        });

        redirect(redirectTo);
    };

    return (
        <div>
            <button className="back" onClick={() => goBack()}>
                Go Back
            </button>
            {result && (
                <form className="form-wrapper">
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    title: e.target.value,
                                })
                            }
                            value={formValues.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    status: e.target.value as IPost["status"],
                                })
                            }
                            value={formValues.status}
                        >
                            <option value="published">published</option>
                            <option value="draft">draft</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <select
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    category: {
                                        id: Number(e.target.value),
                                    },
                                })
                            }
                            value={formValues.category.id}
                        >
                            <option value={""} disabled>
                                Please select
                            </option>
                            {options?.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    content: e.target.value,
                                })
                            }
                            rows={10}
                            cols={50}
                            value={formValues.content}
                        />
                    </div>
                    <div className="saveActions">
                        <input
                            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                handleSubmit(e, "list")
                            }
                            type="submit"
                            value="Save"
                        />
                        <input
                            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                handleSubmit(e, "edit")
                            }
                            type="submit"
                            value="Save and continue editing"
                        />
                        <input
                            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                handleSubmit(e, "create")
                            }
                            type="submit"
                            value="Save and add another"
                        />
                    </div>
                    {formLoading && <p>Loading</p>}
                </form>
            )}
        </div>
    );
};
