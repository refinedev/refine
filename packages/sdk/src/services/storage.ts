import { Client } from "../client";

class Storage {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getPublicUrl(payload: {
        bucket: string;
        path: string;
    }): Promise<{ url: string }> {
        const { bucket, path } = payload;

        return await this.client.call({
            method: "post",
            url: `/storage/generate-public-url/${bucket}`,
            data: {
                path,
            },
        });
    }

    async upload(payload: {
        bucket: string;
        file:
            | ArrayBuffer
            | ArrayBufferView
            | Blob
            | Buffer
            | File
            | FormData
            | NodeJS.ReadableStream
            | ReadableStream<Uint8Array>
            | URLSearchParams
            | string;
    }): Promise<any> {
        const { bucket, file } = payload;

        let body;
        if (typeof Blob !== "undefined" && file instanceof Blob) {
            body = new FormData();
            body.append("file", file);
        } else if (
            typeof FormData !== "undefined" &&
            file instanceof FormData
        ) {
            body = file;
        } else {
            body = file;
        }

        return await this.client.call({
            method: "post",
            url: `/storage/upload/${bucket}`,
            data: body,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}

export { Storage };
