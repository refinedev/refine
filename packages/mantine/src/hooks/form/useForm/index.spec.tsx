import React from "react";
import { MockJSONServer, TestWrapper, render, waitFor } from "@test";
import { Routes, Route } from "react-router-dom";
import { useForm } from ".";
import { Select, TextInput } from "@mantine/core";
import { useSelect } from "@hooks/useSelect";
import { Edit } from "@components/crud";
import { HttpError } from "@refinedev/core";
import { act } from "react-dom/test-utils";

const renderForm = ({
    action,
    refineCoreProps,
}: {
    action: "edit" | "create";
    refineCoreProps?: any;
}) => {
    const EditPage = () => {
        const {
            saveButtonProps,
            getInputProps,
            refineCore: { queryResult, formLoading },
        } = useForm({
            refineCoreProps: {
                resource: "posts",
                id: action === "edit" ? "1" : undefined,
                action: action,
                ...refineCoreProps,
            },
            initialValues: {
                title: "",
                content: "",
                category: {
                    id: "",
                },
                tags: [],
            },
        });

        const { selectProps, queryResult: categoriesQueryResult } = useSelect({
            resource: "categories",
            defaultValue: queryResult?.data?.data?.category?.id,
        });

        if (formLoading || categoriesQueryResult.isLoading) {
            return <div>loading</div>;
        }

        return (
            <Edit saveButtonProps={saveButtonProps}>
                <form>
                    <TextInput
                        mt={8}
                        id="title"
                        label="Title"
                        placeholder="Title"
                        {...getInputProps("title")}
                    />
                    <TextInput
                        mt={8}
                        id="content"
                        label="Content"
                        placeholder="Content"
                        {...getInputProps("content")}
                    />
                    <Select
                        mt={8}
                        id="categoryId"
                        label="Category"
                        placeholder="Pick one"
                        {...getInputProps("category.id")}
                        {...selectProps}
                    />
                    <TextInput
                        placeholder="Tag 1"
                        {...getInputProps(`tags.${0}`)}
                    />
                    <TextInput
                        placeholder="Tag 2"
                        {...getInputProps(`tags.${1}`)}
                    />
                </form>
            </Edit>
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
                    create: async () => {
                        const error: HttpError = {
                            message: "Update is not supported in this example.",
                            statusCode: 400,
                            errors: {
                                title: ["Title is required"],
                                "category.id": ["Category is required"],
                                content: {
                                    key: "form.error.content",
                                    message: "Content is required",
                                },
                                "tags.0": ["Tag 0 is required"],
                                "tags.1": ["Tag 1 is required"],
                            },
                        };
                        return Promise.reject(error);
                    },
                    update: async () => {
                        const error: HttpError = {
                            message: "Update is not supported in this example.",
                            statusCode: 400,
                            errors: {
                                title: ["Title is required"],
                                "category.id": ["Category is required"],
                                content: {
                                    key: "form.error.content",
                                    message: "Content is required",
                                },
                                "tags.0": ["Tag 0 is required"],
                                "tags.1": ["Tag 1 is required"],
                            },
                        };
                        return Promise.reject(error);
                    },
                    getMany: async () => {
                        return Promise.resolve([
                            {
                                id: 1,
                                name: "lorem ipsum dolor",
                            },
                            {
                                id: 2,
                                name: "Sit amet consectetur",
                            },
                        ]);
                    },
                },
            }),
        },
    );
};

describe("useForm hook", () => {
    it("should edit form render formErrros from data provider", async () => {
        const { getByTestId, getByText } = renderForm({ action: "edit" });

        await act(() => Promise.resolve());

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

        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Tag 0 is required")).toBeInTheDocument();
        expect(getByText("Tag 1 is required")).toBeInTheDocument();
    });

    it("should create form render formErrros from data provider", async () => {
        const { getByTestId, getByText } = renderForm({ action: "create" });

        await act(() => Promise.resolve());

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

        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Tag 0 is required")).toBeInTheDocument();
        expect(getByText("Tag 1 is required")).toBeInTheDocument();
    });

    it("should onMutationError called after field errors set ", async () => {
        const onMutationError = jest.fn();
        const { getByTestId, getByText } = renderForm({
            action: "create",
            refineCoreProps: { onMutationError },
        });

        await act(() => Promise.resolve());

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

        expect(onMutationError).toBeCalledWith(
            {
                message: "Update is not supported in this example.",
                statusCode: 400,
                errors: {
                    "category.id": ["Category is required"],
                    content: {
                        key: "form.error.content",
                        message: "Content is required",
                    },
                    "tags.0": ["Tag 0 is required"],
                    "tags.1": ["Tag 1 is required"],
                    title: ["Title is required"],
                },
            },
            { category: { id: "" }, content: "", tags: [], title: "" },
            undefined,
        );

        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Tag 0 is required")).toBeInTheDocument();
        expect(getByText("Tag 1 is required")).toBeInTheDocument();
    });
});
