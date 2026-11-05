import type { ComponentType } from "react";
import { loadRemote, registerRemotes } from "@module-federation/enhanced/runtime";
import type { ExtendedWindow } from "./types";

declare let window: ExtendedWindow;

let categoriesRegistered = false;

// The `categories` remote is resolved at runtime from `window.categoriesUrl`
// (set in App.tsx from VITE_CATEGORIES_URL), so it is registered on first use
// instead of being declared in vite.config.ts.
export const loadCategories = async (
  expose: string,
): Promise<{ default: ComponentType }> => {
  if (!categoriesRegistered) {
    if (!window.categoriesUrl) {
      throw new Error("window.categoriesUrl is not set");
    }
    registerRemotes([
      { name: "categories", entry: window.categoriesUrl, type: "module" },
    ]);
    categoriesRegistered = true;
  }

  const module = await loadRemote<{ default: ComponentType }>(
    `categories/${expose}`,
  );
  if (!module) {
    throw new Error(`Failed to load categories/${expose}`);
  }
  return module;
};
