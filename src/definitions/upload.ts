import { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
    fileUrl: string;
}

interface Event {
    file: UploadFile<UploadResponse>;
    fileList: Array<UploadFile<UploadResponse>>;
}

export const normalizeFile = (event: Event) => {
    const { fileList } = event;

    return fileList.map((item) => {
        let { url } = item;
        const { uid, name, response, type } = item;

        if (response) {
            url = response.fileUrl;
        }

        return { uid, name, url, type };
    });
};
