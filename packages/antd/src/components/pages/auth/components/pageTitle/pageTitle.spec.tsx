import React from "react";
import { render } from "@testing-library/react";
import { AuthPageTitle } from ".";

describe("Auth Page Title", () => {
    test("should render default text", () => {
        const { getByText } = render(<AuthPageTitle />);
        expect(getByText("Refine Project")).toBeInTheDocument();
    });

    test("should render custom text", () => {
        const { getByText } = render(<AuthPageTitle text="Custom Title" />);
        expect(getByText("Custom Title")).toBeInTheDocument();
    });

    test("should not render text if text is null", () => {
        const { queryByText } = render(<AuthPageTitle text={null} />);

        expect(queryByText("Refine Project")).not.toBeInTheDocument();
    });

    test("should render default icon", () => {
        const { getByTestId } = render(<AuthPageTitle />);
        expect(getByTestId("auth-page-title-icon")).toBeInTheDocument();
    });

    test("should render custom icon", () => {
        const { getByTestId } = render(
            <AuthPageTitle icon={<div data-testid="custom-icon" />} />,
        );
        expect(getByTestId("custom-icon")).toBeInTheDocument();
    });

    test("should not render icon if icon is null", () => {
        const { queryByTestId } = render(<AuthPageTitle icon={null} />);
        expect(queryByTestId("auth-page-title-icon")).not.toBeInTheDocument();
    });

    test("should not render when icon and text is null ", () => {
        const { container } = render(<AuthPageTitle icon={null} text={null} />);
        expect(container).toBeEmptyDOMElement();
    });
});
