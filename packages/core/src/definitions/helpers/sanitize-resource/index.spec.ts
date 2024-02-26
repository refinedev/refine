import { sanitizeResource } from ".";

describe("sanitizeResource", () => {
  it("should remove icon property", () => {
    expect(
      sanitizeResource({
        name: "posts",
        icon: "icon",
      }),
    ).toEqual({
      name: "posts",
    });
  });
  it("should remove meta.icon property", () => {
    expect(
      sanitizeResource({
        name: "posts",
        meta: {
          icon: "meta-icon",
          label: "meta-label",
        },
      }),
    ).toEqual({
      name: "posts",
      meta: {
        label: "meta-label",
      },
    });
  });
  it("should remove options.icon property", () => {
    expect(
      sanitizeResource({
        name: "posts",
        options: {
          icon: "options-icon",
          label: "options-label",
        },
      }),
    ).toEqual({
      name: "posts",
      options: {
        label: "options-label",
      },
    });
  });
  it("should return undefined if resource is not passed", () => {
    expect(sanitizeResource()).toEqual(undefined);
  });
});
