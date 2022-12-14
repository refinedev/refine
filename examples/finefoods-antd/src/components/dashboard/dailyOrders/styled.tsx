import styled from "@emotion/styled";

export const DailyOrderWrapper = styled.div`
    height: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 576px) {
        height: 192px;
    }
`;

export const TitleArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

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
    line-height: 1.1;

    span {
        font-size: 28px;
        margin-right: 5px;
    }

    @media screen and (max-width: 576px) {
        span {
            font-size: 30px !important;
            line-height: 0.9;
        }
    }
`;
