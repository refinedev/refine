import React from "react";
import { RcFile, UploadFile } from "antd/lib/upload/interface";

import { file2Base64, UploadFileWithBase64 } from "@definitions/upload";

interface Base64UploadParams {
    formData: UploadFile[];
    maxCount: number;
}

export const useBase64Upload = (params: Base64UploadParams) => {
    const { formData, maxCount } = params;

    const [uploadedFiles, setUploadedFiles] = React.useState<
        UploadFileWithBase64[]
    >([]);
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const beforeUpload = (_file: RcFile, files: RcFile[]): boolean => {
        const totalFiles = fileList.length;
        const filesCount = files.length;

        if (totalFiles + filesCount > maxCount) {
            const excessFileCount = totalFiles + filesCount - maxCount;
            // convert negative
            const deleteItemCount = excessFileCount - excessFileCount * 2;
            files.splice(deleteItemCount);
        }

        setFileList([...fileList, ...files]);

        return false;
    };

    const onRemove = (file: UploadFile) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    React.useEffect(() => {
        setFileList(formData);
    }, [formData]);

    React.useEffect(() => {
        const files = [];
        (async () => {
            for (const file of fileList) {
                if (file instanceof Blob) {
                    files.push(await file2Base64(file));
                } else {
                    files.push(file);
                }
            }
            setUploadedFiles(files);
        })();
    }, [fileList]);

    return {
        uploadedFiles,
        beforeUpload,
        fileList,
        onRemove,
        maxCount,
    };
};
