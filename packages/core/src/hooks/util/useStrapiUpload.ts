import React from "react";
import {
    RcFile,
    UploadChangeParam,
    UploadFile,
} from "antd/lib/upload/interface";

interface StrapiUploadParams {
    formData?: UploadFile[];
    maxCount: number;
}

export const useStrapiUpload = ({
    formData = [],
    maxCount,
}: StrapiUploadParams) => {
    const [uploadedFileIds, setUploadedFileIds] = React.useState<string[]>([]);
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        setFileList([...fileList, ...files]);

        return true;
    };

    // React.useEffect(() => {
    //     if (formData.length > 0) {
    //         setFileList(formData);
    //     }
    // }, [formData]);

    const onChange = (info: UploadChangeParam) => {
        const ids = [];
        for (const file of info.fileList) {
            if (file.response) {
                ids.push(`${file.response[0].id}`);
                break;
            }

            ids.push(file.uid);
        }

        setUploadedFileIds(ids);
    };

    return {
        uploadedFileIds,
        beforeUpload,
        fileList,
        // onRemove,
        maxCount,
        onChange,
    };
};
