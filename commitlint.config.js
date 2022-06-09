module.exports = {
    extends: ["@commitlint/config-conventional"],
    ignores: [
        (commit) =>
            commit.includes("Optimised images with calibre/image-actions"),
    ],
};
