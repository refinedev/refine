import { useState } from "react";
import { RcFile, UploadFile } from "@pankod/refine";

interface StrapiUploadParams {
    maxCount: number;
}

export const useStrapiUpload = ({ maxCount }: StrapiUploadParams) => {
    const [uploadedFileIds] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const beforeUpload = (_file: RcFile, files: RcFile[]): boolean => {
        const totalFiles = fileList.length;
        const filesCount = files.length;

        if (totalFiles + filesCount > maxCount) {
            const excessFileCount = totalFiles + filesCount - maxCount;
            // convert negative
            const deleteItemCount = excessFileCount - excessFileCount * 2;
            files.splice(deleteItemCount);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        setFileList([...fileList, ...files]);

        return true;
    };

    return {
        uploadedFileIds,
        beforeUpload,
        fileList,
        maxCount,
    };
};
