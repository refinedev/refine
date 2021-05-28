import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import { useTranslate } from "@hooks";

type SaveButtonProps = ButtonProps & {};

export const SaveButton: FC<SaveButtonProps> = ({ ...rest }) => {
    const translate = useTranslate();

    return (
        <Button type="primary" icon={<SaveOutlined />} {...rest}>
            {translate("buttons.save", "Save")}
        </Button>
    );
};
