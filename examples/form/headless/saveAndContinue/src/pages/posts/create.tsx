import React, { useState } from "react";
import { useSelect, useForm, useNavigation } from "@pankod/refine-core";
import { v4 as uuidv4 } from "uuid";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
    const [formValues, setFormValues] = useState({
        id: uuidv4(),
        title: "",
        content: "",
        status: "draft",
        category: {
            id: "",
        },
    });
    const { formLoading, onFinish, redirect } = useForm({
        redirect: false,
        id: formValues.id,
    });

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });

    const handleSubmit = async (
        e: React.MouseEvent<HTMLInputElement>,
        redirectTo: "list" | "edit" | "create",
    ) => {
        await onFinish(formValues);

        setFormValues({
            id: uuidv4(),
            title: "",
            content: "",
            status: "draft",
            category: {
                id: "",
            },
        });

        redirect(redirectTo);
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
                    <input
                        onClick={(e) => handleSubmit(e, "list")}
                        type="submit"
                        value="Save"
                    />
                    <input
                        onClick={(e) => handleSubmit(e, "edit")}
                        type="submit"
                        value="Save and continue editing"
                    />
                    <input
                        onClick={(e) => handleSubmit(e, "create")}
                        type="submit"
                        value="Save and add another"
                    />
                </div>
                {formLoading && <p>Loading</p>}
            </form>
        </div>
    );
};
