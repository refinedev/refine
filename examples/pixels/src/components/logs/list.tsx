import React from "react";
import { useLogList } from "@pankod/refine-core";
import {
    Avatar,
    AntdList,
    Space,
    Spin,
    Typography,
    List,
} from "@pankod/refine-antd";
import { formattedDate, timeFromNow } from "utility/time";

type TLogListProps = {
    currentCanvas: any;
};

export const LogList = ({ currentCanvas }: TLogListProps) => {
    const { isLoading, data } = useLogList({
        resource: "pixels",
        meta: {
            canvas: currentCanvas,
        },
    });

    return (
        <AntdList
            size="small"
            dataSource={data}
            renderItem={(item: any) => (
                <AntdList.Item>
                    <AntdList.Item.Meta
                        avatar={
                            <Avatar
                                src={
                                    JSON.parse(item?.author)?.user_metadata
                                        ?.avatar_url
                                }
                                size={20}
                            />
                        }
                    />
                    <Typography.Text style={{ fontSize: "12px" }}>
                        <strong>
                            {`${
                                JSON.parse(item?.author)?.user_metadata?.email
                            }`}
                        </strong>
                        {` ${item.action}d a pixel on canvas: `}
                        <strong>{`${item?.meta?.canvas?.name} `}</strong>
                        <span
                            style={{ fontSize: "10px", color: "#9c9c9c" }}
                        >{`${formattedDate(item.created_at)} - ${timeFromNow(
                            item.created_at,
                        )} ago`}</span>
                    </Typography.Text>
                </AntdList.Item>
            )}
        />
    );
};
