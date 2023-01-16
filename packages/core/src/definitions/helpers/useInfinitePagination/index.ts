import { GetInfinityListResponse } from "../../../interfaces";

export const getNextPageParam = (lastPage: GetInfinityListResponse) => {
    const { pagination, pageInfo } = lastPage;
    const current = pagination?.current || 1;

    if (pageInfo) {
        return pageInfo.hasNextPage ? current + 1 : undefined;
    }

    const pageSize = pagination?.pageSize || 10;
    const totalPages = Math.ceil((lastPage.total || 0) / pageSize);

    return current < totalPages ? Number(current) + 1 : undefined;
};

export const getPreviousPageParam = (lastPage: GetInfinityListResponse) => {
    const { pagination, pageInfo } = lastPage;
    const current = pagination?.current || 1;

    if (pageInfo) {
        return pageInfo.hasPreviousPage ? current - 1 : undefined;
    }

    return current === 1 ? undefined : current - 1;
};
