const clgh = require("@changesets/changelog-github");

const changelogFunctions = {
  getDependencyReleaseLine: clgh.default.getDependencyReleaseLine,
  getReleaseLine: async (changeset, tag, options) => {
    const defaultChangeset = await clgh.default.getReleaseLine(
      changeset,
      tag,
      options,
    );

    const isValid = ["community", "enterprise"].includes(
      process.env.REFINE_RELEASE_TYPE,
    );

    if (!isValid) {
      console.error(
        "❌ REFINE_RELEASE_TYPE must be either community or enterprise",
      );

      process.exit(1);
    }

    let title = "";

    if (process.env.REFINE_RELEASE_TYPE === "community") {
      title = "\n\n📢 **Refine Community Release** 📢";
    }

    if (process.env.REFINE_RELEASE_TYPE === "enterprise") {
      title = "\n\n⚡ **Refine Enterprise Release** ⚡";
    }

    const result = title + defaultChangeset;

    return result;
  },
};

exports.default = changelogFunctions;
