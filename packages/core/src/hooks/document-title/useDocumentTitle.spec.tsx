import React from "react";
import { renderHook } from "@testing-library/react";
import { useDocumentTitle } from "./useDocumentTitle";
import { DocumentTitleContext } from "@contexts/document-title";
import { ITestWrapperProps, TestWrapper } from "@test/index";

const updateTitleMock = jest.fn();

const renderWrapper = (
    { title, ...wrapperProps }: ITestWrapperProps & { title: string } = {
        title: "test",
    },
) => {
    const Wrapper = TestWrapper(wrapperProps);

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
        children,
    }) => (
        <Wrapper>
            <DocumentTitleContext.Provider
                value={{ title, updateTitle: updateTitleMock }}
            >
                {children}
            </DocumentTitleContext.Provider>
        </Wrapper>
    );

    return WrapperWith;
};

describe("useDocumentTitle", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should retrieve title from context", () => {
        const { result } = renderHook(useDocumentTitle, {
            wrapper: renderWrapper(),
        });
        expect(result.current.title).toEqual("test");
    });

    it("should update title when updateTitle is called", () => {
        const { result } = renderHook(useDocumentTitle, {
            wrapper: renderWrapper(),
        });
        result.current.updateTitle("test2");
        expect(updateTitleMock).toHaveBeenCalledWith("test2", "", 1);
    });

    it("should update title if it's provided from hook arguments", () => {
        const { result } = renderHook(useDocumentTitle, {
            wrapper: renderWrapper(),
            initialProps: "test2",
        });
        expect(result.current.title).toEqual("test2");
    });
});
