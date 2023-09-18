import { FC } from "react";
import { Deal } from "../../interfaces/graphql";
import { Tag } from "antd";

type Props = {
    stage: NonNullable<Deal["stage"]>;
};

export const DealStageTag: FC<Props> = ({ stage }) => {
    return <Tag>{stage.title}</Tag>;
};
