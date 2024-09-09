import React from "react";
import { render, TestWrapper } from "@test";
import { ThemedHeader } from "./index";
import type { AuthProvider, LegacyAuthProvider } from "@refinedev/core";

const mockLegacyAuthProvider: LegacyAuthProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(["admin"]),
  getUserIdentity: () =>
    Promise.resolve({ name: "John Doe", avatar: "localhost:3000" }),
};

const mockAuthProvider: AuthProvider = {
  login: () =>
    Promise.resolve({
      success: true,
    }),
  logout: () =>
    Promise.resolve({
      success: true,
    }),
  onError: () => Promise.resolve({}),
  check: () =>
    Promise.resolve({
      authenticated: true,
    }),
  getIdentity: () =>
    Promise.resolve({ name: "John Doe", avatar: "localhost:3000" }),
};

describe("Header", () => {
  it("should render successfull user name and avatar fallback in header", async () => {
    const { findByText, getByText } = render(<ThemedHeader />, {
      wrapper: TestWrapper({
        authProvider: mockAuthProvider,
      }),
    });

    await findByText("John Doe");
    getByText("JD");
  });
});

// NOTE: Will be removed in the refine v5
describe("Header with legacyAuthProvider", () => {
  it("should render successfull user name and avatar fallback in header", async () => {
    const { findByText, getByText } = render(<ThemedHeader />, {
      wrapper: TestWrapper({
        legacyAuthProvider: mockLegacyAuthProvider,
      }),
    });

    await findByText("John Doe");
    getByText("JD");
  });
});
