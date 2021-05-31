import { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
    fileUrl: string;
}
interface EventArgs<T = UploadResponse> {
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
}

export const getValueFromEvent = (event: EventArgs) => {
    const { fileList } = event;

    return [...fileList];
};

export interface UploadFileWithBase64 extends UploadFile {
    base64String?: string;
}

export function file2Base64(file: UploadFile): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            if (reader.result) {
                resolve(reader.result as string);
            }
        });

        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onerror = (error) => reject(error);
    });
}
