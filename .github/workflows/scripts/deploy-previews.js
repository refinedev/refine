#!/usr/bin/env node

const fs = require("fs");

const COMMENT_BODY = process.env.COMMENT_BODY || false;

const setOutput = (output) =>
  console.log(`::set-output name=EXAMPLES::${output}`);

const getPublishDir = (exampleName) => {
  if (fs.existsSync(`./examples/${exampleName}/next-env.d.ts`))
    return "./.next";

  if (fs.existsSync(`./examples/${exampleName}/remix.config.js`))
    return "./build";

  return "./dist";
};

const getNetlifyConfigPath = (exampleName) => {
  const configPath = `./examples/${exampleName}/netlify.toml`;

  if (fs.existsSync(configPath)) return configPath;

  return "";
};

const buildExamplesOutput = (comment) => {
  if (!COMMENT_BODY) {
    setOutput("[]");
    return;
  }

  const re = /(?:\/deploy\s{1})((?:[\w-]*(?:,|, {1}| {1})?)*)(?:\n)?/g;

  const match = re.exec(comment);

  const examples = match?.[1]
    ?.split(",")
    .filter((m) => m.length > 1)
    .map((e) => e.trim())
    .filter((e) => fs.existsSync(`./examples/${e}/package.json`));

  if (!examples?.length) {
    setOutput("[]");

    return;
  }

  const output = examples.map((e) => {
    return {
      name: e,
      publish_dir: getPublishDir(e),
      netlify_config_path: getNetlifyConfigPath(e),
    };
  });

  setOutput(JSON.stringify(output));
};

buildExamplesOutput(COMMENT_BODY);
