import React from "react";
import { Button, ButtonProps, Upload, UploadProps } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useTranslate } from "@hooks";

type ImportButtonProps = {
    uploadProps: UploadProps;
    buttonProps: ButtonProps;
};

export const ImportButton: React.FC<ImportButtonProps> = ({
    uploadProps,
    buttonProps,
    children,
}) => {
    const translate = useTranslate();

    return (
        <Upload {...uploadProps}>
            <Button icon={<ImportOutlined />} {...buttonProps}>
                {children ?? translate("buttons.import", "Import")}
            </Button>
        </Upload>
    );
};
