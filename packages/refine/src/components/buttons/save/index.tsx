import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import { useTranslate } from "@hooks";

type SaveButtonProps = ButtonProps & {
    hideText?: boolean;
};

/**
 * `<SaveButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/save-button} for more details.
 */
export const SaveButton: FC<SaveButtonProps> = ({
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <Button type="primary" icon={<SaveOutlined />} {...rest}>
            {!hideText && (children ?? translate("buttons.save", "Save"))}
        </Button>
    );
};
