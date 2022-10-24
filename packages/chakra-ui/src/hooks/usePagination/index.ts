type UsePaginationProps = {
    current: number;
    pageCount: number;
};
export const usePagination = (
    props: UsePaginationProps,
): {
    current: number;
    prev?: number;
    next?: number;
    items: [number | string];
} => {
    const { current, pageCount } = props;

    const prev = current === 1 ? undefined : current - 1,
        next = current === pageCount ? undefined : current + 1,
        items: [number | string] = [1];

    if (current === 1 && pageCount === 1) return { current, prev, next, items };
    if (current > 4) items.push("…");

    const r = 2,
        r1 = current - r,
        r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(pageCount, r2); i++)
        items.push(i);

    if (r2 + 1 < pageCount) items.push("…");
    if (r2 < pageCount) items.push(pageCount);

    return { current, prev, next, items };
};
