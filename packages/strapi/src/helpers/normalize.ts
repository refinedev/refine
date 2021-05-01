import { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
    fileUrl: string;
}

interface StrapiUploadResponse {
    url: string;
    id: string | number;
}

interface EventArgs<T = UploadResponse> {
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
}

export const normalizeFileForStrapi = (
    event: EventArgs<StrapiUploadResponse[]>,
    baseUrl: string,
) => {
    const { fileList } = event;

    return fileList.map((item) => {
        let { url, uid } = item;
        const { name, response, type, size, percent, status } = item;

        if (response) {
            url = `${baseUrl}${response[0].url}`;
            uid = `${response[0].id}`;
        }

        return { uid, name, url, type, size, percent, status };
    });
};
