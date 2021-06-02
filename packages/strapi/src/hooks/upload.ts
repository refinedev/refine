import { useState } from "react";
import { RcFile, UploadFile } from "@pankod/refine";

interface StrapiUploadParams {
    maxCount: number;
}

type UseStrapiUploadType = {
    (uploadParams: StrapiUploadParams): {
        uploadedFileIds: string[];
        beforeUpload: (_file: RcFile, files: RcFile[]) => boolean;
        fileList: UploadFile<any>[];
        maxCount: number;
    };
};

export const useStrapiUpload: UseStrapiUploadType = ({ maxCount }) => {
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
