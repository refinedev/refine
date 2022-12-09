import styled from "@emotion/styled";
import { Typography } from "@pankod/refine-antd";

export const TimelineContent = styled.div<{ backgroundColor: string }>`
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 6px;
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const CreatedAt = styled(Typography.Text)`
    font-size: 12px;
    cursor: default;
`;

export const Number = styled(Typography.Text)`
    cursor: pointer;
`;
