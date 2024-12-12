import React from "react";

import { useForm } from ".";
import type { IRefineOptions, HttpError } from "@refinedev/core";
import { MockJSONServer, TestWrapper, act, render, waitFor } from "../../test";
import { Route, Routes } from "react-router";

interface IPost {
  title: string;
  content: string;
  slug: string;
  category: { id: number };
  tags: string[];
}

const renderForm = ({
  refineCoreProps,
  refineOptions,
  useFormProps,
}: {
  useFormProps?: any;
  refineCoreProps?: any;
  refineOptions?: IRefineOptions;
}) => {
  const EditPage = () => {
    const {
      refineCore: { formLoading },
      saveButtonProps,
      register,
      formState: { errors },
    } = useForm<IPost, HttpError, IPost>({
      ...useFormProps,
      refineCoreProps: {
        resource: "posts",
        ...refineCoreProps,
      },
    });

    return (
      <div>
        {formLoading && <p>loading</p>}
        <input {...register("title")} />
        {errors.title && <span>{errors?.title?.message?.toString()}</span>}

        <input {...register("content")} />
        {errors.content && <span>{errors?.content?.message?.toString()}</span>}

        <input {...register("slug")} />
        {errors.slug && <span>{errors?.slug?.message?.toString()}</span>}

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
        {errors.category && <span>{`${errors.category?.id?.message}`}</span>}

        <button
          {...saveButtonProps}
          onClick={(e) => {
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
        options: refineOptions,
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
              message: "An error occurred while updating the record.",
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
              message: "An error occurred while creating the record.",
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
  it.each(["edit", "create"] as const)(
    "should set %s-form errors from data provider",
    async (action) => {
      const onMutationError = jest.fn();

      const { getByText, getByTestId } = renderForm({
        refineCoreProps: {
          onMutationError,
          action: action,
          id: action === "edit" ? "1" : undefined,
        },
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
    },
  );

  it.each([
    {
      action: "edit",
      disableFromRefineOption: false,
      disableFromHook: true,
    },
    {
      action: "edit",
      disableFromRefineOption: true,
      disableFromHook: false,
    },
    {
      action: "create",
      disableFromRefineOption: false,
      disableFromHook: true,
    },
    {
      action: "create",
      disableFromRefineOption: true,
      disableFromHook: false,
    },
  ] as const)("should disable server-side validation", async (testCase) => {
    const onMutationErrorMock = jest.fn();

    const { getByTestId, queryByText } = renderForm({
      refineOptions: {
        disableServerSideValidation: testCase.disableFromRefineOption,
      },
      useFormProps: {
        disableServerSideValidation: testCase.disableFromHook,
      },

      refineCoreProps: {
        action: testCase.action,
        onMutationError: onMutationErrorMock,
        id: testCase.action === "edit" ? "1" : undefined,
      },
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
      expect(onMutationErrorMock).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(queryByText("Title is required")).not.toBeInTheDocument();
      expect(queryByText("Category is required")).not.toBeInTheDocument();
      expect(queryByText("Translated content error")).not.toBeInTheDocument();
      expect(queryByText("Field is not valid.")).not.toBeInTheDocument();
    });
  });
});
