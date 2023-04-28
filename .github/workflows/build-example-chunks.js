#!/usr/bin/env node

const fs = require("fs");

const EXAMPLES_DIR = "./examples";

const ignoredRegexes = [
    /^monorepo-/,
    /^with-nx/,
]

const CHUNK_COUNT = Number(process.env.CHUNKS ? process.env.CHUNKS : 0);

const examples = fs.readdirSync(EXAMPLES_DIR).filter((dir) => {
    return fs.statSync(EXAMPLES_DIR + "/" + dir).isDirectory();
}).filter((dir) => {
    return !ignoredRegexes.some((regex) => regex.test(dir));
});

const chunkSize = Math.ceil(examples.length / CHUNK_COUNT);

const chunks = [];

for (let i = 0; i < examples.length; i += chunkSize) {
    chunks.push(examples.slice(i, i + chunkSize));
}

chunks.forEach((chunk, i) => {
    console.log("::set-output name=CHUNK_" + (i + 1) + "::" + chunk.join(","));
});
