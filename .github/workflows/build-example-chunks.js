#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const EXAMPLES_DIR = "./examples";

const ignoredRegexes = [/^monorepo-/, /^with-nx/];

const CHUNK_COUNT = Number(process.env.CHUNKS ? process.env.CHUNKS : 0);

const examples = fs
    .readdirSync(EXAMPLES_DIR)
    .filter((dir) => {
        return fs.statSync(EXAMPLES_DIR + "/" + dir).isDirectory();
    })
    .filter((dir) => {
        return !ignoredRegexes.some((regex) => regex.test(dir));
    });

const chunkSize = Math.ceil(examples.length / CHUNK_COUNT);

const chunks = [];

const examplesWithE2eTests = examples.filter((dir) => {
    return fs.existsSync(path.join("examples", dir, "cypress.config.ts"));
});

const examplesWithoutE2eTests = examples.filter((dir) => {
    return !examplesWithE2eTests.includes(dir);
});

for (let i = 0; i < examples.length; i += chunkSize) {
    const tempChunk = [];

    for (j = 0; j < chunkSize; j++) {
        if (j % (CHUNK_COUNT / 2) === 1) {
            if (examplesWithE2eTests.length > 0) {
                tempChunk.push(examplesWithE2eTests.shift());
            } else {
                tempChunk.push(examplesWithoutE2eTests.shift());
            }
        } else {
            tempChunk.push(examplesWithoutE2eTests.shift());
        }
    }

    if (i + chunkSize >= examples.length) {
        tempChunk.push(...examplesWithE2eTests);

        tempChunk.push(...examplesWithoutE2eTests);
    }

    chunks.push(tempChunk);
}

chunks.forEach((chunk, i) => {
    console.log("::set-output name=CHUNK_" + (i + 1) + "::" + chunk.join(","));
});
