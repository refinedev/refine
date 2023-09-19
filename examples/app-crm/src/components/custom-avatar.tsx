import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";

import { getNameInitials, getRandomColorFromString } from "../utilities";
import { memo } from "react";

type Props = AvatarProps & {
    name?: string;
};

const CustomAvatarComponent = ({ name = "", style, ...rest }: Props) => {
    return (
        <AntdAvatar
            alt={name}
            size="small"
            style={{
                backgroundColor: rest?.src
                    ? "transparent"
                    : getRandomColorFromString(name),
                display: "flex",
                alignItems: "center",
                border: "none",
                ...style,
            }}
            {...rest}
        >
            {getNameInitials(name)}
        </AntdAvatar>
    );
};

export const CustomAvatar = memo(
    CustomAvatarComponent,
    (prevProps, nextProps) => {
        return (
            prevProps.name === nextProps.name && prevProps.src === nextProps.src
        );
    },
);
