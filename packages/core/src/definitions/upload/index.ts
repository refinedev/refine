import { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
    fileUrl: string;
}
interface EventArgs<T = UploadResponse> {
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
}

export const getValueFromEvent = (event: EventArgs): UploadFile[] => {
    const { fileList } = event;

    return [...fileList];
};

export interface UploadFileWithBase64 extends UploadFile {
    base64String?: string;
}

export function file2Base64(file: UploadFile): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        const resultHandler = () => {
            if (reader.result) {
                reader.removeEventListener("load", resultHandler, false);

                resolve(reader.result as string);
            }
        };

        reader.addEventListener("load", resultHandler, false);

        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onerror = (error) => {
            reader.removeEventListener("load", resultHandler, false);
            return reject(error);
        };
    });
}
