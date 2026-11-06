import React from "react";

import { render } from "@test";

export type EmptyTestsProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const emptyTests = (
  Empty: React.ComponentType<EmptyTestsProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Empty", () => {
    it("renders title when provided", () => {
      const { getByText } = render(<Empty title="No records" />);

      getByText("No records");
    });

    it("renders description when provided", () => {
      const { getByText } = render(
        <Empty description="There is no data to display yet." />,
      );

      getByText("There is no data to display yet.");
    });

    it("renders action when provided", () => {
      const { getByText } = render(
        <Empty action={<button type="button">Create</button>} />,
      );

      getByText("Create");
    });

    it("does not leak any default textual content when title, description, and action are omitted", () => {
      const { container } = render(<Empty />);

      // Decorative icons may carry hidden text (e.g. an SVG <title>), so ignore aria-hidden nodes.
      const contentContainer = container.cloneNode(true) as HTMLElement;
      contentContainer
        .querySelectorAll('[aria-hidden="true"]')
        .forEach((decorativeNode) => decorativeNode.remove());

      expect(contentContainer.textContent?.trim()).toBe("");
    });

    it("renders a default icon when no custom icon is supplied", () => {
      const { container } = render(<Empty title="No records" />);

      expect(container.querySelector("svg")).not.toBeNull();
    });

    it("renders the custom icon instead of the default icon", () => {
      const { getByTestId, container } = render(
        <Empty icon={<span data-testid="custom-icon">icon</span>} />,
      );

      getByTestId("custom-icon");
      expect(container.querySelectorAll("svg").length).toBe(0);
    });

    it("forwards className to the root element", () => {
      const { container } = render(<Empty className="custom-empty" />);

      expect(container.querySelector(".custom-empty")).not.toBeNull();
    });

    it("forwards style to the root element", () => {
      const { container } = render(
        <Empty style={{ backgroundColor: "rgb(255, 0, 0)" }} />,
      );

      const element = container.querySelector(
        '[style*="background-color"]',
      ) as HTMLElement | null;

      expect(element).not.toBeNull();
      expect(element?.style.backgroundColor).toBe("rgb(255, 0, 0)");
    });

    it("marks the icon as decorative so it is hidden from assistive technologies", () => {
      const { container } = render(<Empty title="No records" />);

      expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    });
  });
};
