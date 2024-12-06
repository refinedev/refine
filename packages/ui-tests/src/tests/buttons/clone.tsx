import React from "react";
import { Route, Routes } from "react-router";
import {
  type RefineCloneButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";

export const buttonCloneTests = (
  CloneButton: React.ComponentType<RefineCloneButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Clone Button", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<CloneButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Clone").closest("button")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = jest.fn();

      const { getByText } = render(
        <CloneButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Clone").closest("button")).toBeDisabled();

      fireEvent.click(getByText("Clone").closest("button") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<CloneButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Clone")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<CloneButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.CloneButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <CloneButton>refine</CloneButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<CloneButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Clone")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <CloneButton recordItemId="1">Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "create" && params?.id === "1") {
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
                expect(getByText("Clone").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Clone").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CloneButton recordItemId="2">Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "create" && params?.id === "1") {
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
                expect(getByText("Clone").closest("button")).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <CloneButton disabled>Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Clone").closest("button");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <CloneButton>Clone</CloneButton>,
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

            expect(queryByText("Clone")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <CloneButton>Clone</CloneButton>,
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

            expect(getByText("Clone").closest("button")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CloneButton accessControl={{ enabled: false }}>
                  Clone
                </CloneButton>,
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
                expect(getByText("Clone").closest("button")).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <CloneButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Clone
                  </CloneButton>,
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

                expect(queryByText("Clone")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <CloneButton accessControl={{ enabled: true }}>
                  Clone
                </CloneButton>,
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
                expect(getByText("Clone").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Clone").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <CloneButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Clone
                </CloneButton>,
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

              expect(queryByText("Clone")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const clone = jest.fn();

      const { getByText } = render(
        <CloneButton onClick={() => clone()} recordItemId="1" />,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(clone).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource" element={<CloneButton recordItemId="1" />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(window.location.pathname).toBe("/posts/clone/1");
    });

    it("should edit page redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource/:action/:id" element={<CloneButton />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(window.location.pathname).toBe("/posts/clone/1");
    });

    it("should custom resource and recordItemId redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={
              <CloneButton
                resourceNameOrRouteName="categories"
                recordItemId="1"
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }, { name: "categories" }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(window.location.pathname).toBe("/categories/clone/1");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={
              <CloneButton
                resourceNameOrRouteName="custom-route-posts"
                recordItemId="1"
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              {
                name: "posts",
                meta: { route: "custom-route-posts" },
              },
              { name: "posts" },
            ],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(window.location.pathname).toBe("/custom-route-posts/clone/1");
    });
  });
};
