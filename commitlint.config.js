module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "body-max-line-length": [1, "always", 100],
    },
    ignores: [
        (commit) =>
            commit.includes("Optimised images with calibre/image-actions"),
    ],
};
