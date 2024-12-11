import React from "react";
import {
  type RefineListButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";
import { Route, Routes } from "react-router";

export const buttonListTests = (
  ListButton: React.ComponentType<RefineListButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / List Button", () => {
    const list = jest.fn();

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<ListButton>List</ListButton>, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("List").closest("button")).not.toBeDisabled();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<ListButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeTruthy();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = jest.fn();

      const { getByText } = render(
        <ListButton disabled onClick={mockOnClick}>
          List
        </ListButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("List").closest("button")).toBeDisabled();

      fireEvent.click(getByText("List").closest("button") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(
        <ListButton disabled hidden>
          List
        </ListButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText("List")).not.toBeInTheDocument();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(<ListButton>refine</ListButton>, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render label as children if specified", async () => {
      const { container, getByText } = render(
        <Routes>
          <Route path="/:resource" element={<ListButton />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { label: "test" } }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      expect(container).toBeTruthy();
      getByText("Tests");
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(<ListButton>refine</ListButton>, {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<ListButton hideText />, {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Posts")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <ListButton>List</ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ action }) => {
                        if (action === "list") {
                          return {
                            can: false,
                            reason: "Access Denied",
                          };
                        }
                        return {
                          can: true,
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(getByText("List").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("List").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <ListButton>List</ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ action }) => {
                        if (action === "list") {
                          return {
                            can: false,
                          };
                        }
                        return {
                          can: true,
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(getByText("List").closest("button")).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <ListButton disabled>List</ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("List").closest("button");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <ListButton>List</ListButton>,
              {
                wrapper: TestWrapper({
                  accessControlProvider: {
                    can: async () => ({ can: false }),
                    options: {
                      buttons: {
                        hideIfUnauthorized: true,
                      },
                    },
                  },
                }),
              },
            );

            expect(container).toBeTruthy();

            expect(queryByText("List")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <ListButton>List</ListButton>,
              {
                wrapper: TestWrapper({
                  accessControlProvider: {
                    can: async () => ({ can: false }),
                    options: {
                      buttons: {
                        enableAccessControl: false,
                        hideIfUnauthorized: true,
                      },
                    },
                  },
                }),
              },
            );

            expect(container).toBeTruthy();

            expect(getByText("List").closest("button")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <ListButton accessControl={{ enabled: false }}>
                  List
                </ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => {
                        return {
                          can: false,
                        };
                      },
                      options: {
                        buttons: {
                          enableAccessControl: true,
                          hideIfUnauthorized: true,
                        },
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(getByText("List").closest("button")).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <ListButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    List
                  </ListButton>,
                  {
                    wrapper: TestWrapper({
                      accessControlProvider: {
                        can: async () => ({
                          can: false,
                        }),
                        options: {
                          buttons: {
                            hideIfUnauthorized: false,
                          },
                        },
                      },
                    }),
                  },
                );

                expect(container).toBeTruthy();

                expect(queryByText("List")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <ListButton accessControl={{ enabled: true }}>List</ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => {
                        return {
                          can: false,
                          reason: "Access Denied",
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(getByText("List").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("List").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <ListButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  List
                </ListButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({
                        can: false,
                      }),
                      options: {
                        buttons: {
                          hideIfUnauthorized: true,
                        },
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              expect(queryByText("List")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(
        <ListButton onClick={() => list()} resourceNameOrRouteName="posts" />,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Posts"));
      });

      expect(list).toHaveBeenCalledTimes(1);
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={
              <ListButton resourceNameOrRouteName="custom-route-posts" />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              {
                name: "posts",
                options: { route: "custom-route-posts" },
              },
              { name: "posts" },
            ],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Posts"));
      });

      expect(window.location.pathname).toBe("/custom-route-posts");
    });
  });
};
