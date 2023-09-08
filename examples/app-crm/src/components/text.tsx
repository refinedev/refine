import { Breakpoint, ConfigProvider, Grid, Typography } from "antd";

export type TextProps = {
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "xxl"
        | "xxxl"
        | "huge"
        | "xhuge"
        | "xxhuge";
    hideOnSizes?: Breakpoint[];
    xs?: React.ComponentProps<typeof Typography.Text>;
} & React.ComponentProps<typeof Typography.Text>;

const sizes = {
    xs: {
        fontSize: 12,
        lineHeight: 20 / 12,
    },
    sm: {
        fontSize: 14,
        lineHeight: 22 / 14,
    },
    md: {
        fontSize: 16,
        lineHeight: 24 / 16,
    },
    lg: {
        fontSize: 20,
        lineHeight: 28 / 20,
    },
    xl: {
        fontSize: 24,
        lineHeight: 32 / 24,
    },
    xxl: {
        fontSize: 30,
        lineHeight: 38 / 30,
    },
    xxxl: {
        fontSize: 38,
        lineHeight: 46 / 38,
    },
    huge: {
        fontSize: 46,
        lineHeight: 54 / 46,
    },
    xhuge: {
        fontSize: 56,
        lineHeight: 64 / 56,
    },
    xxhuge: {
        fontSize: 68,
        lineHeight: 76 / 68,
    },
};

export const Text: React.FC<TextProps> = ({
    size = "sm",
    children,
    hideOnSizes = [],
    ...rest
}) => {
    const screens = Grid.useBreakpoint();

    const renderContent = () => (
        <ConfigProvider
            theme={{
                token: {
                    ...sizes[size],
                },
            }}
        >
            <Typography.Text {...rest}>{children}</Typography.Text>
        </ConfigProvider>
    );

    if (hideOnSizes.length === 0) {
        return renderContent();
    }

    return Object.entries<boolean>(screens).find(
        ([k, v]) => hideOnSizes.includes(k as Breakpoint) && v,
    )
        ? renderContent()
        : null;
};
