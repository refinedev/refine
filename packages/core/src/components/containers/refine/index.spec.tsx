import React from "react";

import { MockJSONServer, TestWrapper, mockRouterProvider, render } from "@test";

import { Refine } from "./index";

describe("Refine Container", () => {
  it("should render resource prop list page", async () => {
    const PostList = () => {
      return (
        <>
          <h1>Posts</h1>
          <table>
            <tbody>
              <tr>
                <td>foo</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    };

    const { container, getByText } = render(<PostList />, {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts", list: "/posts" }],
      }),
    });

    expect(container).toBeDefined();
    getByText("Posts");
  });

  it("should render the children", async () => {
    const { getByTestId } = render(
      <Refine
        dataProvider={MockJSONServer}
        routerProvider={mockRouterProvider()}
      >
        <div data-testid="children">Children</div>
      </Refine>,
    );

    expect(getByTestId("children")).toBeTruthy();
  });
});
