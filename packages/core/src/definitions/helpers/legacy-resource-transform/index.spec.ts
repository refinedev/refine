import { legacyResourceTransform } from ".";

describe("legacyResourceTransform", () => {
  it("should return the legacy resource", () => {
    expect(
      legacyResourceTransform([
        {
          name: "posts",
          meta: {
            label: "Custom Post Label",
          },
        },
        {
          name: "categories",
          options: {
            label: "Custom Category Label",
          },
        },
      ]),
    ).toEqual([
      {
        name: "posts",
        meta: { label: "Custom Post Label" },
        label: "Custom Post Label",
        route: "/posts",
        canCreate: false,
        canEdit: false,
        canShow: false,
        canDelete: undefined,
      },
      {
        name: "categories",
        options: { label: "Custom Category Label" },
        label: "Custom Category Label",
        route: "/categories",
        canCreate: false,
        canEdit: false,
        canShow: false,
        canDelete: undefined,
      },
    ]);
  });
});
