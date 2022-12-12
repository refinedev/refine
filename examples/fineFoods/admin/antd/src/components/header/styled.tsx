import styled from "@emotion/styled";
import { AntdLayout } from "@pankod/refine-antd";

export const AntdHeader = styled(AntdLayout.Header)`
    padding: "0px 24px";
    height: "64px";
    color: #ffffff;

    .ant-select-selection-search-input,
    .ant-input {
        color: #ffffff;
        background-color: #000000;
        border-color: #303030;
    }

    .ant-input::placeholder {
        color: #424242;
    }
`;

export const HeaderTitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px;
`;
