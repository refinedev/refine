import { FC } from "react";
import { HStack, Button, Box, ButtonProps } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { usePagination } from "@pankod/refine-chakra-ui";

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    const paginationCommonProps: ButtonProps = {
        variant: "outline",
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <Button
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        {...paginationCommonProps}
                    >
                        <IconChevronLeft size="18" />
                    </Button>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string") return <span>...</span>;

                    return (
                        <Button
                            onClick={() => setCurrent(page)}
                            key={page}
                            {...paginationCommonProps}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <Button
                        onClick={() => setCurrent(current + 1)}
                        {...paginationCommonProps}
                    >
                        <IconChevronRight size="18" />
                    </Button>
                )}
            </HStack>
        </Box>
    );
};
