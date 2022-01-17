import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

export const getValueFromEvent = (event: UploadChangeParam): UploadFile[] => {
    const { fileList } = event;

    return [...fileList];
};
