// TODO: Use @pankod/refine
// import { UploadedFile } from "@pankod/refine";

interface UploadedFile {
    uid: string;
    name: string;
    url: string;
    type: string;
    size: number;
    percent: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
}

export type StrapiUpload = {
    id: string;
    mime: string;
    name: string;
    size: number;
    url: string;
};

export const initalValueMapper = (
    strapiUploadResponse: StrapiUpload,
    baseUrl: string,
): UploadedFile[] => {
    return [
        {
            uid: strapiUploadResponse.id,
            name: strapiUploadResponse.name,
            url: `${baseUrl}${strapiUploadResponse.url}`,
            type: strapiUploadResponse.mime,
            size: strapiUploadResponse.size,
            percent: 100,
            status: "done",
        },
    ];
};
