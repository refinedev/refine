module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "body-max-line-length": [1, "always", 100],
    },
    helpUrl:
        "https://refine.dev/docs/guides-concepts/contributing/#committing-your-work-and-preparing-a-pull-request",
    ignores: [
        (commit) =>
            commit.includes("Optimised images with calibre/image-actions"),
    ],
};
