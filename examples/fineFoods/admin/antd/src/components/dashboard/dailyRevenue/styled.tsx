import styled from "@emotion/styled";
import { DatePicker } from "@pankod/refine-antd";

export const DailyRevenueWrapper = styled.div`
    height: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const TitleArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const TitleAreaAmount = styled.div`
    display: flex;
    flex-direction: column;

    h3,
    span {
        color: #ffffff !important;
        margin-bottom: 0 !important;
    }

    @media screen and (max-width: 576px) {
        span {
            font-size: 16px !important;
            line-height: 1.2;
        }
    }
`;

export const TitleAreNumber = styled.div`
    display: flex;
    align-items: center;
    line-height: 1;

    img {
        margin-left: 5px;
    }

    @media screen and (max-width: 576px) {
        span {
            font-size: 30px !important;
            line-height: 0.9;
        }
    }
`;

export const RangePicker = styled(DatePicker.RangePicker)`
    height: 35px;
    float: "right";
    color: "#fffff !important";
    background: "rgba(255, 255, 255, 0.3)";

    .ant-picker-input > input {
        color: #ffffff !important;
    }

    &.ant-picker-focused {
        .ant-picker-separator {
            color: #ffffff;
        }
    }

    .ant-picker-separator,
    .ant-picker-suffix {
        color: #ffffff;
    }
`;
