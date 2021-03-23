import React from "react";
import { RcFile, UploadFile } from "antd/lib/upload/interface";

import { file2Base64, UploadFileWithBase64 } from "@definitions/upload";

export const useBase64Upload = (formData: UploadFile[]) => {
    const [uploadedFiles, setUploadedFiles] = React.useState<
        UploadFileWithBase64[]
    >([]);
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const beforeUpload = (file: RcFile): boolean => {
        setFileList([...fileList, file]);
        return false;
    };

    React.useEffect(() => {
        if (formData) {
            setFileList(formData);
        }
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
    };
};
