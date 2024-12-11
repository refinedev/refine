import React from "react";
import { Route, Routes } from "react-router";
import {
  type RefineCreateButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, render, TestWrapper, fireEvent, waitFor } from "@test";

export const buttonCreateTests = (
  CreateButton: React.ComponentType<RefineCreateButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Create Button", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    const create = jest.fn();

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<CreateButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Create").closest("button")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = jest.fn();

      const { getByText } = render(
        <CreateButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Create").closest("button")).toBeDisabled();

      fireEvent.click(getByText("Create").closest("button") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not trigger onClick when disabled prop is true", async () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CreateButton disabled onClick={handleClick}>
          Create
        </CreateButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      const button = getByText("Create").closest("button");
      await act(async () => {
        fireEvent.click(button!);
      });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<CreateButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Create")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<CreateButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeTruthy();
    });
    it("should render text by children", async () => {
      const { container, getByText } = render(
        <CreateButton>refine</CreateButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<CreateButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
      expect(queryByText("Create")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <CreateButton disabled>Create</CreateButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ action }) => {
                        if (action === "create") {
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
                expect(getByText("Create").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Create").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CreateButton>Create</CreateButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ action }) => {
                        if (action === "create") {
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
                expect(
                  getByText("Create").closest("button"),
                ).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <CreateButton disabled>Create</CreateButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Create").closest("button");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <CreateButton>Create</CreateButton>,
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

            expect(queryByText("Create")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <CreateButton>Create</CreateButton>,
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

            expect(getByText("Create").closest("button")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CreateButton accessControl={{ enabled: false }}>
                  Create
                </CreateButton>,
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
                expect(
                  getByText("Create").closest("button"),
                ).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <CreateButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Create
                  </CreateButton>,
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

                expect(queryByText("Create")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with text", async () => {
              const { container, getByText } = render(
                <CreateButton accessControl={{ enabled: true }}>
                  Create
                </CreateButton>,
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
                expect(getByText("Create").closest("button")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Create").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <CreateButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Create
                </CreateButton>,
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

              expect(queryByText("Create")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(<CreateButton onClick={() => create()} />, {
        wrapper: TestWrapper({}),
      });

      await act(async () => {
        fireEvent.click(getByText("Create"));
      });

      expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect custom resource route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<CreateButton resourceNameOrRouteName="categories" />}
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
        fireEvent.click(getByText("Create"));
      });

      expect(window.location.pathname).toBe("/categories/create");
    });

    it("should redirect create route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource" element={<CreateButton />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Create"));
      });

      expect(window.location.pathname).toBe("/posts/create");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={
              <CreateButton resourceNameOrRouteName="custom-route-posts" />
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
        fireEvent.click(getByText("Create"));
      });

      expect(window.location.pathname).toBe("/custom-route-posts/create");
    });
  });
};
