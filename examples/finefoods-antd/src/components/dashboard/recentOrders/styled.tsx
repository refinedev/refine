import styled from "@emotion/styled";
import { NumberField, Table, Typography } from "@pankod/refine-antd";
import { IOrder } from "interfaces";

export const RecentOrdersColumn = styled(Table.Column<IOrder>)`
    vertical-align: top;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled(Typography.Text)`
    font-size: 16px;
    word-break: inherit;
`;

export const OrderId = styled(Typography.Text)`
    cursor: pointer;
`;

export const Price = styled(NumberField)`
    white-space: nowrap;
`;
