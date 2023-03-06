import React, { useState } from "react";
import { useSelect, useForm, useNavigation } from "@refinedev/core";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        status: "draft",
        category: {
            id: "",
        },
    });
    const { formLoading, onFinish, redirect } = useForm({
        redirect: false,
    });

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });

    const handleSubmit = async (redirectTo: "list" | "edit" | "create") => {
        const response = await onFinish(formValues);

        setFormValues({
            title: "",
            content: "",
            status: "draft",
            category: {
                id: "",
            },
        });

        redirect(redirectTo, response?.data?.id);
    };

    return (
        <div>
            <button className="back" onClick={() => goBack()}>
                Go Back
            </button>
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
                                    id: e.target.value,
                                },
                            })
                        }
                        value={formValues.category.id}
                    >
                        <option value={""} disabled>
                            Please select
                        </option>
                        {options?.map((category) => (
                            <option key={category.value} value={category.value}>
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
                    <button onClick={() => handleSubmit("list")} type="button">
                        Save
                    </button>
                    <button onClick={() => handleSubmit("edit")} type="button">
                        Save and continue editing
                    </button>
                    <button
                        onClick={() => handleSubmit("create")}
                        type="button"
                    >
                        Save and add another
                    </button>
                </div>
                {formLoading && <p>Loading</p>}
            </form>
        </div>
    );
};
