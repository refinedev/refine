import { RcFile, UploadFile } from "antd/lib/upload/interface";

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

export interface Base64File {
    uid: string;
    name: string;
    type: string;
    base64String: string;
}

export function file2Base64(file: RcFile): Promise<Base64File> {
    const { uid, name, type } = file;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result as string;

            return resolve({
                uid,
                name,
                type,
                base64String,
            });
        };
        reader.onerror = (error) => reject(error);
    });
}
