import React, { type ReactNode } from "react";

import { Route, Routes } from "react-router-dom";

import { render, TestWrapper } from "@test";
import { Create } from "./";
import { crudCreateTests } from "@refinedev/ui-tests";
import { SaveButton } from "@components/buttons";
import { RefineButtonTestIds } from "@refinedev/ui-types";

const renderCreate = (create: ReactNode) => {
  return render(
    <Routes>
      <Route path="/:resource/create" element={create} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts/create"],
      }),
    },
  );
};

describe("Create", () => {
  crudCreateTests.bind(this)(Create);

  it("should render breadcrumb", async () => {
    const { getAllByLabelText } = render(
      <Routes>
        <Route
          path="/:resource/:action"
          element={<Create resource="posts" />}
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
        }),
      },
    );

    expect(getAllByLabelText("breadcrumb")).not.toBeNull();
  });
  it("should not render breadcrumb", async () => {
    const { queryByLabelText } = render(
      <Routes>
        <Route
          path="/:resource/:action"
          element={<Create resource="posts" breadcrumb={null} />}
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
        }),
      },
    );

    expect(queryByLabelText("breadcrumb")).not.toBeInTheDocument();
  });

  it("should customize default buttons with default props", async () => {
    const { queryByTestId } = renderCreate(
      <Create
        saveButtonProps={{ className: "customize-test" }}
        footerButtons={({ saveButtonProps }) => {
          expect(saveButtonProps).toBeDefined();

          return (
            <>
              <SaveButton {...saveButtonProps} />
            </>
          );
        }}
      />,
    );

    expect(queryByTestId(RefineButtonTestIds.SaveButton)).toHaveClass(
      "customize-test",
    );
  });
});
