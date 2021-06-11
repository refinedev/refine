import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import { useTranslate } from "@hooks";

type SaveButtonProps = ButtonProps & {};

export const SaveButton: FC<SaveButtonProps> = ({ children, ...rest }) => {
    const translate = useTranslate();

    return (
        <Button type="primary" icon={<SaveOutlined />} {...rest}>
            {children ?? translate("buttons.save", "Save")}
        </Button>
    );
};
