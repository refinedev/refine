module.exports = {
  // Extend rules from conventional commits preset
  extends: ["@commitlint/config-conventional"],

  // Define custom rules
  rules: {
    // Enforce a maximum line length for commit message body
    "body-max-line-length": [1, "always", 100],
  },

  // Provide a helpful link for contributors
  helpUrl: "https://refine.dev/docs/guides-concepts/contributing/#committing-your-work-and-preparing-a-pull-request",

  // Exclude specific commit messages from linting
  ignores: [
    (commitMessage) =>
      commitMessage.includes("Optimised images with calibre/image-actions"),
  ],
};
