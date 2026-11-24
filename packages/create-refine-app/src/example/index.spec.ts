import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadAndExtract } from "./download-and-extract";
import { existsInRepo } from "./exists-in-repo";
import { gitInit } from "./git-init";
import { installDependencies } from "./install-dependencies";
import { makeDir } from "./make-dir";
import run from "./index";

vi.mock("./exists-in-repo", () => ({
  existsInRepo: vi.fn(async () => true),
}));
vi.mock("./download-and-extract", () => ({
  downloadAndExtract: vi.fn(async () => "success"),
}));
vi.mock("./make-dir", () => ({
  makeDir: vi.fn(async () => "created"),
}));
vi.mock("./git-init", () => ({
  gitInit: vi.fn(() => "success"),
}));
vi.mock("./install-dependencies", () => ({
  findPM: vi.fn(() => "npm"),
  installDependencies: vi.fn(),
}));
// Spinners write through `ora`; stub it so assertions only see the final box.
vi.mock("ora", () => {
  const spinner = {
    start: () => spinner,
    succeed: () => spinner,
    fail: () => spinner,
    warn: () => spinner,
    stop: () => spinner,
  };
  return { default: () => spinner };
});

describe("create-refine-app --example", () => {
  let output: string[];

  beforeEach(() => {
    output = [];
    vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
      output.push(args.join(" "));
    });
    process.exitCode = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.exitCode = undefined;
  });

  it("reports success when dependencies install", async () => {
    vi.mocked(installDependencies).mockResolvedValue(true);

    await run("starter-vite", "test-project");

    const printed = output.join("\n");
    expect(printed).toContain("Success!");
    expect(printed).toContain("npm run dev");
    expect(process.exitCode).toBeUndefined();
  });

  it("does not report success when dependency install fails", async () => {
    vi.mocked(installDependencies).mockResolvedValue(false);

    await run("starter-vite", "test-project");

    const printed = output.join("\n");
    expect(printed).not.toContain("Success!");
    expect(printed).toContain("Incomplete");
    expect(printed).toContain("npm install");
    expect(process.exitCode).toBe(1);
  });
});
