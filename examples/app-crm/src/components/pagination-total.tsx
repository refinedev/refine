import React from "react";

type PaginationTotalProps = {
    total: number;
    entityName: string;
};

export const PaginationTotal: React.FC<PaginationTotalProps> = ({
    total,
    entityName,
}) => {
    return (
        <span
            style={{
                marginLeft: "16px",
            }}
        >
            <span className="ant-text secondary">{total}</span> {entityName} in
            total
        </span>
    );
};
