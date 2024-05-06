import { FC, memo } from "react";

import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar, Typography } from "antd";
import { getRandomColorFromString } from "../../utils/get-random-color";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatarComponent: FC<Props> = ({ name = "", style, ...rest }) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: getRandomColorFromString(name),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      <Typography.Text>{name?.[0]?.toUpperCase()}</Typography.Text>
    </AntdAvatar>
  );
};

export const CustomAvatar = memo(
  CustomAvatarComponent,
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name && prevProps.src === nextProps.src;
  },
);
