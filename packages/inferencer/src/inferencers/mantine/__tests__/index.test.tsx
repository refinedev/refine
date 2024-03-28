import React from "react";
import { Route, Routes } from "react-router-dom";

import { render, act, TestWrapper } from "@test";
import { MantineInferencer } from "../index";
import { MantineProvider } from "@mantine/core";

describe("MantineInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/custom-page"],
    });

    const renderingList = render(
      <MantineProvider>
        <Wrapper>
          <Routes>
            <Route
              path="/custom-page"
              element={<MantineInferencer resource="posts" action="list" />}
            />
          </Routes>
        </Wrapper>
      </MantineProvider>,
    );

    const renderingCreate = render(
      <MantineProvider>
        <Wrapper>
          <Routes>
            <Route
              path="/custom-page"
              element={<MantineInferencer resource="posts" action="create" />}
            />
          </Routes>
        </Wrapper>
      </MantineProvider>,
    );

    const renderingEdit = render(
      <MantineProvider>
        <Wrapper>
          <Routes>
            <Route
              path="/custom-page"
              element={
                <MantineInferencer resource="posts" action="edit" id="11" />
              }
            />
          </Routes>
        </Wrapper>
      </MantineProvider>,
    );

    const renderingShow = render(
      <MantineProvider>
        <Wrapper>
          <Routes>
            <Route
              path="/custom-page"
              element={
                <MantineInferencer resource="posts" action="show" id="21" />
              }
            />
          </Routes>
        </Wrapper>
      </MantineProvider>,
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const nodeList = renderingList.asFragment();
    const nodeCreate = renderingCreate.asFragment();
    const nodeEdit = renderingEdit.asFragment();
    const nodeShow = renderingShow.asFragment();

    expect(nodeList).toMatchSnapshot();
    expect(nodeCreate).toMatchSnapshot();
    expect(nodeEdit).toMatchSnapshot();
    expect(nodeShow).toMatchSnapshot();
  });
});
