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
        const { uid, name, response, type, size, percent, status } = item;

        if (response) {
            url = response.fileUrl;
        }

        return { uid, name, url, type, size, percent, status };
    });
};

export interface UploadFileWithBase64 extends UploadFile {
    base64String?: string;
}

export function file2Base64(file: UploadFile): Promise<UploadFileWithBase64> {
    const { uid, name, size, type, lastModified, lastModifiedDate } = file;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        if (file instanceof Blob) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                return resolve({
                    ...file,
                    uid,
                    name,
                    size,
                    type,
                    lastModified,
                    lastModifiedDate,
                    base64String: reader.result as string,
                });
            };
        }

        reader.onerror = (error) => reject(error);
    });
}
