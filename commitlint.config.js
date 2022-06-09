module.exports = {
    extends: ["@commitlint/config-conventional"],
    ignores: [
        (commit) => commit === "Optimised images with calibre/image-actions",
    ],
};
