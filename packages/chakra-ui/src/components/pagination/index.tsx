import React from "react";
import { Button, ButtonProps, HStack } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

type Props = {
    current: number;
    setCurrent: (page: number) => void;
    pageCount: number;
};

const pageInfo = (current: number, max: number) => {
    if (!current || !max) return null;

    const prev = current === 1 ? null : current - 1,
        next = current === max ? null : current + 1,
        items: [number | string] = [1];

    if (current === 1 && max === 1) return { current, prev, next, items };
    if (current > 4) items.push("…");

    const r = 2,
        r1 = current - r,
        r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

    if (r2 + 1 < max) items.push("…");
    if (r2 < max) items.push(max);

    return { current, prev, next, items };
};

export const Pagination: React.FC<Props> = ({
    current,
    setCurrent,
    pageCount,
}) => {
    const paginate = pageInfo(current, pageCount);
    const commonProps: ButtonProps = {
        size: "sm",
        variant: "outline",
    };

    return (
        <HStack my="3" spacing="1">
            {paginate?.prev && (
                <Button
                    onClick={() => setCurrent(current - 1)}
                    disabled={!paginate?.prev}
                    {...commonProps}
                >
                    <IconChevronLeft size="18" />
                </Button>
            )}

            {paginate?.items.map((page) => {
                if (typeof page === "string") return <span>...</span>;

                return (
                    <Button
                        onClick={() => setCurrent(page)}
                        key={page}
                        {...commonProps}
                        variant={page === current ? "solid" : "outline"}
                    >
                        {page}
                    </Button>
                );
            })}
            {paginate?.next && (
                <Button
                    onClick={() => setCurrent(current + 1)}
                    {...commonProps}
                >
                    <IconChevronRight size="18" />
                </Button>
            )}
        </HStack>
    );
};
