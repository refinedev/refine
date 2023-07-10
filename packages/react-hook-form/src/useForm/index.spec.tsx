import React from "react";

import { useForm } from ".";
import { HttpError } from "@refinedev/core";
import { MockJSONServer, TestWrapper, act, render, waitFor } from "../../test";
import { Route, Routes } from "react-router-dom";

interface IPost {
    title: string;
    content: string;
    slug: string;
    category: { id: number };
    tags: string[];
}

const renderForm = ({ refineCoreProps }: { refineCoreProps?: any }) => {
    const EditPage = () => {
        const {
            refineCore: { formLoading },
            saveButtonProps,
            register,
            formState: { errors },
        } = useForm<IPost, HttpError, IPost>({
            refineCoreProps: {
                resource: "posts",
                ...refineCoreProps,
            },
        });

        return (
            <div>
                {formLoading && <p>loading</p>}
                <input {...register("title")} />
                {errors.title && (
                    <span>{errors?.title?.message?.toString()}</span>
                )}

                <input {...register("content")} />
                {errors.content && (
                    <span>{errors?.content?.message?.toString()}</span>
                )}

                <input {...register("slug")} />
                {errors.slug && (
                    <span>{errors?.slug?.message?.toString()}</span>
                )}

                <select
                    {...register("category.id", {
                        required: true,
                    })}
                >
                    {["1", "2", "3"]?.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <span>{`${errors.category?.id?.message}`}</span>
                )}

                <button
                    {...saveButtonProps}
                    onClick={(e) => {
                        console.log("clicked");
                        saveButtonProps?.onClick(e);
                    }}
                    data-testid="refine-save-button"
                    type="submit"
                >
                    save
                </button>
            </div>
        );
    };

    return render(
        <Routes>
            <Route path="/" element={<EditPage />} />
        </Routes>,
        {
            wrapper: TestWrapper({
                i18nProvider: {
                    changeLocale: () => Promise.resolve(),
                    getLocale: () => "en",
                    translate: (key: string) => {
                        if (key === "form.error.content") {
                            return "Translated content error";
                        }

                        return key;
                    },
                },
                dataProvider: {
                    ...MockJSONServer,
                    update: async () => {
                        const error: HttpError = {
                            message: "Update is not supported in this example.",
                            statusCode: 400,
                            errors: {
                                title: ["Title is required"],
                                "category.id": ["Category is required"],
                                slug: true,
                                content: {
                                    key: "form.error.content",
                                    message: "Content is required",
                                },
                            },
                        };

                        return Promise.reject(error);
                    },
                    create: async () => {
                        const error: HttpError = {
                            message: "Update is not supported in this example.",
                            statusCode: 400,
                            slug: true,
                            errors: {
                                title: ["Title is required"],
                                "category.id": ["Category is required"],
                                slug: true,
                                content: {
                                    key: "form.error.content",
                                    message: "Content is required",
                                },
                            },
                        };

                        return Promise.reject(error);
                    },
                },
            }),
        },
    );
};

describe("useForm hook", () => {
    it("should set edit errors from data provider", async () => {
        const onMutationError = jest.fn();

        const { getByText, getByTestId } = renderForm({
            refineCoreProps: { onMutationError, action: "edit", id: "1" },
        });

        await waitFor(() => {
            expect(document.body).not.toHaveTextContent("loading");
        });

        await act(() => {
            getByTestId("refine-save-button").click();
            return Promise.resolve();
        });

        await waitFor(() => {
            expect(document.body).not.toHaveTextContent("loading");
        });

        expect(onMutationError).toBeCalledTimes(1);

        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Field is not valid.")).toBeInTheDocument();
    });

    it("should set create errors from data provider", async () => {
        const onMutationError = jest.fn();

        const { getByText, getByTestId } = renderForm({
            refineCoreProps: { onMutationError, action: "create" },
        });

        await waitFor(() => {
            expect(document.body).not.toHaveTextContent("loading");
        });

        await act(() => {
            getByTestId("refine-save-button").click();
            return Promise.resolve();
        });

        await waitFor(() => {
            expect(document.body).not.toHaveTextContent("loading");
        });

        expect(onMutationError).toBeCalledTimes(1);

        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Field is not valid.")).toBeInTheDocument();
    });
});
