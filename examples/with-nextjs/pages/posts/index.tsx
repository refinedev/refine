import { Authenticated } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";

export default function PostList() {
    return (
        <Authenticated redirectOnFail="/login">
            <AntdListInferencer />
        </Authenticated>
    );
}
