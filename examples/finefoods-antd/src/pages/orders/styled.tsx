import styled from "@emotion/styled";
import { Col, PageHeader as AntdPageHeader } from "@pankod/refine-antd";

export const Courier = styled.div`
    display: flex;
    align-items: center;
`;

export const CourierInfoText = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;

    @media screen and (max-width: 768px) {
        margin-bottom: 25px;
    }
`;

export const CourierInfoBox = styled.div`
    display: flex;
    background-color: #67be23;
    align-items: center;
    padding: 10px 13px;
    margin-left: 20px;
    border-radius: 10px;

    @media screen and (max-width: 1199px) {
        margin-right: 12px;
        margin-left: 0;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 15px;
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 15px;
        width: 100%;
    }
`;

export const CourierInfoBoxText = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        margin-bottom: 25px;
    }
`;

export const CourierBoxContainer = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: white;

    svg {
        margin-right: 10px;
    }

    @media screen and (max-width: 768px) {
        margin-top: 35px;
        flex-direction: column;
    }
`;

export const Product = styled.div`
    display: flex;
    align-items: center;
`;

export const ProductText = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    white-space: nowrap;
`;

export const ProductFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    font-weight: 800;

    & > span:first-child {
        margin-right: 10px;
        color: #67be23;
    }

    & > span:nth-child(2) {
        margin-right: 20px;
    }
`;

export const PageHeader = styled(AntdPageHeader)`
    @media screen and (max-width: 576px) {
        padding: 16px 16px;

        .pageHeader .ant-page-header-heading-title {
            font-size: 16px;
        }

        .courier-infoBox {
            margin-left: 0;
        }
        .courier {
            flex-direction: column;
        }

        .courier .info-text {
            text-align: center;
            margin-left: 0;
            margin-top: 10px;
        }
        .courier-box-container {
            margin-top: 20px;
        }
    }
`;
