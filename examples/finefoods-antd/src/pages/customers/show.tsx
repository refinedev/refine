import {
    useShow,
    HttpError,
    IResourceComponentsProps,
    useNavigation,
} from "@refinedev/core";
import { CloseOutlined } from "@ant-design/icons";
import { Drawer, Button, theme, Flex } from "antd";
import { IUser } from "../../interfaces";
import {
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
} from "../../components";

export const CustomerShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { token } = theme.useToken();
    const { queryResult } = useShow<IUser>();

    const { data } = queryResult;
    const user = data?.data;

    return (
        <Drawer
            open
            onClose={() => list("users")}
            width={736}
            styles={{
                body: {
                    backgroundColor: token.colorBgLayout,
                    borderLeft: `1px solid ${token.colorBorderSecondary}`,
                    padding: "0",
                },
                header: {
                    display: "none",
                },
            }}
        >
            <div
                style={{
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: token.colorBgElevated,
                }}
            >
                <Button
                    type="text"
                    style={{
                        display: "flex",
                        marginLeft: "auto",
                        alignItems: "center",
                        padding: "16px",
                        color: token.colorTextTertiary,
                    }}
                    icon={<CloseOutlined />}
                    onClick={() => list("users")}
                />
            </div>
            <Flex
                vertical
                gap={32}
                style={{
                    padding: "32px",
                }}
            >
                <CustomerInfoSummary customer={user} />
                <CustomerInfoList customer={user} />
                <CustomerOrderHistory customer={user} />
            </Flex>
        </Drawer>
    );
};
