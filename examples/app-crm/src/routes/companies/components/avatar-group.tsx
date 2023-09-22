import { FC } from "react";

import { AvatarProps, Space, Tooltip } from "antd";

import { CustomAvatar, Text } from "@/components";

type Props = {
    avatars: {
        name?: string;
        src?: string;
    }[];
    size?: AvatarProps["size"];
    maxCount?: number;
    containerStyle?: React.CSSProperties;
    avatarStyle?: AvatarProps["style"];
    gap?: string;
    overlap?: boolean;
};

export const AvatarGroup: FC<Props> = ({
    avatars,
    size,
    overlap,
    maxCount = 3,
    gap = "8px",
    containerStyle,
    avatarStyle,
}) => {
    const visibleAvatars = avatars.slice(0, maxCount);
    const remainingAvatars = avatars.slice(maxCount);
    const hasRemainingAvatars = remainingAvatars.length > 0;
    const shouldOverlap = overlap && avatars.length > 3;

    const getImageSize = (size: AvatarProps["size"] | number) => {
        if (typeof size === "number") {
            return shouldOverlap ? `${size + 4}px` : `${size}px`;
        }

        switch (size) {
            case "large":
                return shouldOverlap ? "44px" : "40px";
            case "small":
                return shouldOverlap ? "28px" : "24px";
            default:
                return shouldOverlap ? "36px" : "32px";
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: shouldOverlap ? "0" : gap,
                ...containerStyle,
            }}
        >
            {visibleAvatars.map((avatar, index) => {
                const transform = shouldOverlap
                    ? `translateX(-${index * 8}px)`
                    : undefined;

                return (
                    <Tooltip title={avatar.name} key={index}>
                        <CustomAvatar
                            style={{
                                cursor: "pointer",
                                transform,
                                zIndex: index,
                                border: shouldOverlap
                                    ? "2px solid #fff"
                                    : "none",
                                width: getImageSize(size),
                                height: getImageSize(size),
                                ...avatarStyle,
                            }}
                            name={avatar?.name}
                            src={avatar?.src}
                            size={size}
                        />
                    </Tooltip>
                );
            })}

            {hasRemainingAvatars && (
                <Tooltip
                    destroyTooltipOnHide
                    title={
                        <Space direction="vertical">
                            {remainingAvatars.map((avatar, index) => {
                                return (
                                    <Space key={index}>
                                        <CustomAvatar
                                            name={avatar.name}
                                            src={avatar.src}
                                            size="small"
                                        />
                                        <Text
                                            style={{
                                                color: "#fff",
                                            }}
                                            key={avatar.name}
                                        >
                                            {avatar.name}
                                        </Text>
                                    </Space>
                                );
                            })}
                        </Space>
                    }
                >
                    <Text
                        className="tertiary"
                        style={{
                            userSelect: "none",
                            cursor: "pointer",
                            fontSize: "10px",
                            lineHeight: "22px",
                            letterSpacing: "0.5px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            width: getImageSize(size),
                            height: getImageSize(size),
                            transform: shouldOverlap
                                ? `translateX(-${visibleAvatars.length * 8}px)`
                                : undefined,
                            zIndex: shouldOverlap ? visibleAvatars.length : 1,
                            backgroundColor: "#D9D9D9",
                            border: overlap ? "2px solid #fff" : "none",
                        }}
                    >
                        +{remainingAvatars.length}
                    </Text>
                </Tooltip>
            )}
        </div>
    );
};
