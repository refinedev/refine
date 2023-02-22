import { Pagination } from "../../../interfaces";
import { pickNotDeprecated } from "../pickNotDeprecated";

type HandlePaginationProps = {
    hasPagination?: boolean;
    pagination?: Pagination;
    configPagination?: Pagination;
};

export const handlePagination = ({
    hasPagination,
    pagination,
    configPagination,
}: HandlePaginationProps = {}): Required<Pagination> => {
    const hasPaginationString = hasPagination === false ? "off" : "server";
    const mode = pagination?.mode ?? hasPaginationString;

    const current =
        pickNotDeprecated(pagination?.current, configPagination?.current) ?? 1;

    const pageSize =
        pickNotDeprecated(pagination?.pageSize, configPagination?.pageSize) ??
        10;

    return {
        current,
        pageSize,
        mode,
    };
};
