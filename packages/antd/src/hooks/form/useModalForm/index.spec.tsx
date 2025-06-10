import { renderHook, waitFor } from "@testing-library/react";

import { act, MockJSONServer, TestWrapper } from "@test";

import { useModalForm } from "./";

describe("useModalForm Hook", () => {
  it("should return correct initial value of 'open'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "create",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(false);
  });

  it("'open' initial value should be set with 'defaultVisible'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "create",
          defaultVisible: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(true);
  });

  it("'open' value should be false when 'onCancel' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          defaultVisible: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(true);

    await act(async () => {
      result.current.modalProps.onCancel?.({} as any);
    });

    expect(result.current.modalProps.open).toBe(false);
  });

  it("'open' value should be true when 'show' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          id: 1,
          action: "edit",
          defaultVisible: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(false);

    await act(async () => {
      result.current.show();
    });

    await waitFor(() => expect(result.current.modalProps.open).toBe(true));
  });

  it("'id' should be updated when 'show' is called with 'id'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    const id = "5";

    await act(async () => {
      result.current.show(id);
    });

    expect(result.current.id).toBe(id);
  });

  it("'title' should be set with 'action' and 'resource'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          resource: "test",
          action: "edit",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.title).toBe("Edit test");
  });

  it("when 'autoSubmitClose' is true, the modal should be closed when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          id: "1",
          resource: "posts",
          autoSubmitClose: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
    });

    await act(async () => {
      result.current.formProps.onFinish?.({});
    });

    await waitFor(() => result.current.mutation.isSuccess);

    await waitFor(() => expect(result.current.modalProps.open).toBe(false));

    expect(result.current.modalProps.open).toBe(false);
  });

  it("when 'autoSubmitClose' is false, 'close' should not be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          id: 1,
          action: "edit",
          resource: "posts",
          autoSubmitClose: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.onFinish?.({});
    });

    expect(result.current.modalProps.open).toBe(true);
  });

  it("autoResetForm is true, 'reset' should be called when the form is submitted", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          resource: "posts",
          action: "edit",
          autoResetForm: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.form?.setFieldsValue({
        test: "test",
        foo: "bar",
      });
      result.current.modalProps.onOk?.({} as any);
    });

    await waitFor(() => result.current.mutation.isSuccess);

    expect(result.current.formProps.form?.getFieldsValue()).toStrictEqual({});
  });

  it("when mutationMode is 'pessimistic', the form should be closed when the mutation is successful", async () => {
    const updateMock = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          resource: "posts",
          id: 1,
          mutationMode: "pessimistic",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            update: updateMock,
          },
        }),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.onFinish?.({});
    });

    expect(result.current.modalProps.open).toBe(true);

    await waitFor(() => expect(result.current.modalProps.open).toBe(false));

    expect(updateMock).toBeCalledTimes(1);
    expect(result.current.modalProps.open).toBe(false);
  });

  it.each(["optimistic", "undoable"] as const)(
    "when mutationMode is '%s', the form should be closed when the mutation is successful",
    async (mutationMode) => {
      const updateMock = jest.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      );

      const { result } = renderHook(
        () =>
          useModalForm({
            action: "edit",
            resource: "posts",
            id: 1,
            mutationMode,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              update: updateMock,
            },
          }),
        },
      );

      await act(async () => {
        result.current.show();
        result.current.formProps.onFinish?.({});
      });

      expect(result.current.modalProps.open).toBe(false);
    },
  );

  it("should `meta[syncWithLocationKey]` overrided by default", async () => {
    const mockGetOne = jest.fn();
    const mockUpdate = jest.fn();

    const { result } = renderHook(
      () =>
        useModalForm({
          syncWithLocation: true,
          id: 5,
          action: "edit",
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getOne: mockGetOne,
            update: mockUpdate,
          },
        }),
      },
    );

    await act(async () => {
      result.current.show();
    });

    await waitFor(() => {
      expect(mockGetOne).toBeCalledTimes(1);
      expect(mockGetOne).toBeCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            "modal-posts-edit": undefined,
          }),
        }),
      );
    });
  });

  it("should not show unsaved changes dialog when saving with warnWhenUnsavedChanges true", async () => {
    const mockDataProvider = {
      ...MockJSONServer,
      getOne: jest.fn(() => Promise.resolve({ data: { id: 1, title: "initial title" } } as any)),
      update: jest.fn(() => Promise.resolve({ data: { id: 1, title: "new title" } } as any)),
    };

    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockReturnValue(true); // Default to user "confirming" to leave, though it shouldn't be called

    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          id: 1,
          resource: "posts",
          // warnWhenUnsavedChanges prop for useModalForm itself
          warnWhenUnsavedChanges: true,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          // Pass options for Refine context directly
          options: {
            warnWhenUnsavedChanges: true, // Ensure global context is also true
          },
        }),
      },
    );

    // Show the modal
    await act(async () => {
      result.current.show(1); // Explicitly pass id to show
    });
    expect(result.current.modalProps.open).toBe(true);

    // Wait for initial data to be loaded if getOne was called.
    // This might not be strictly necessary if form doesn't rely on it for this test's flow.
    await waitFor(() => expect(mockDataProvider.getOne).toHaveBeenCalledWith(expect.objectContaining({ id: 1 })));

    // Simulate form becoming dirty.
    // This should trigger the internal onValuesChange of the underlying useForm,
    // which then calls setWarnWhen(true) from the UnsavedWarnContext.
    await act(async () => {
      if (result.current.formProps.onValuesChange) {
        // Simulate a change event
        result.current.formProps.onValuesChange(
          { title: "new dirty value" }, // changedValues
          { title: "new dirty value" }, // allValues
        );
      } else {
        // Fallback if onValuesChange is not found, though it should be
        console.warn(
          "formProps.onValuesChange is not defined, cannot simulate form dirtiness effectively.",
        );
      }
    });

    // Simulate clicking the modal's OK button (Save)
    // Calling onOk on modalProps calls form.submit() internally.
    // If form.submit() doesn't call onFinish due to validation or other reasons,
    // we can directly call formProps.onFinish to test the hook's logic.
    await act(async () => {
      // result.current.modalProps.onOk?.({} as any);
      // Directly call onFinish to bypass AntD form's own submit() complexities in test
      await result.current.formProps.onFinish?.({ title: "submitted value" });
    });

    // Wait for the mutation (update) to have been called
    await waitFor(() => {
      expect(mockDataProvider.update).toHaveBeenCalled();
    });

    // Due to the setTimeout(0) in the fix, we need to wait for the modal to close
    await waitFor(
      () => {
        expect(result.current.modalProps.open).toBe(false);
      },
      { timeout: 100 }, // Adjust timeout if necessary, setTimeout(0) should be quick
    );

    // Crucially, window.confirm should not have been called during the save process
    expect(mockConfirm).not.toHaveBeenCalled();

    mockConfirm.mockRestore();
  });
});
