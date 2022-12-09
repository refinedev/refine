import got from "got";
import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";
import { join } from "path";
import { tmpdir } from "os";
import { createWriteStream, promises as fs } from "fs";

const pipeline = promisify(Stream.pipeline);

const TEMP_PREFIX = "refine-example.temp";

async function downloadTar(url: string) {
    const tempFile = join(tmpdir(), `${TEMP_PREFIX}-${Date.now()}`);
    await pipeline(got.stream(url), createWriteStream(tempFile));
    return tempFile;
}

export async function downloadAndExtract({
    root,
    name,
    branch,
    repo,
    org,
}: {
    root: string;
    name: string;
    branch: string;
    repo: string;
    org: string;
}) {
    const tempFile = await downloadTar(
        `https://codeload.github.com/${org}/${repo}/tar.gz/${branch}`,
    );

    await tar.x({
        file: tempFile,
        cwd: root,
        strip: 3,
        filter: (p) => p.includes(`${repo}-${branch}/examples/${name}/`),
    });

    await fs.unlink(tempFile);
}
