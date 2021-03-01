import { useCallback, useMemo, useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";

export const useFileUploadState = () => {
    const [isLoading, setIsloading] = useState(false);

    const onChange = useCallback((info: UploadChangeParam) => {
        const fileListLoadings = mapStatusToLoading(info.fileList);

        if (fileListLoadings.includes(true)) {
            setIsloading(true);
        } else {
            setIsloading(false);
        }
    }, []);

    return useMemo(() => ({ isLoading, onChange }), [isLoading]);
};

const mapStatusToLoading = (files: UploadChangeParam["fileList"]) => {
    return files.map((file) => {
        switch (file.status) {
            case "done":
            case "removed":
            case "success":
                return false;
            case "uploading":
            case "error":
                return true;
            default:
                return false;
        }
    });
};
