import type {
  CursorDirection,
  CursorValue,
  Pagination,
} from "../../../contexts/data/types";

type HandlePaginationParamsProps = {
  pagination?: Pagination;
};

export const handlePaginationParams = ({
  pagination,
}: HandlePaginationParamsProps = {}): Pagination => {
  const mode = pagination?.mode ?? "server";
  const currentPage = pagination?.currentPage ?? 1;
  const pageSize = pagination?.pageSize ?? 10;

  if (!pagination?.cursor) {
    return { currentPage, pageSize, mode };
  }

  const { current, direction } = pagination.cursor;

  const cursor: NonNullable<Pagination["cursor"]> = {
    ...(current !== undefined && { current }),
    ...((current !== undefined || direction !== undefined) && {
      direction: direction ?? "after",
    }),
  };

  return { currentPage, pageSize, mode, cursor };
};

const getParsedCursorValue = (value: unknown): CursorValue | undefined => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return undefined;
};

export const parseCursorFromParams = (
  after: unknown,
  before: unknown,
): {
  parsedCursor: CursorValue | undefined;
  parsedCursorDirection: CursorDirection;
} => {
  if (after !== undefined) {
    return {
      parsedCursor: getParsedCursorValue(after),
      parsedCursorDirection: "after",
    };
  }

  if (before !== undefined) {
    return {
      parsedCursor: getParsedCursorValue(before),
      parsedCursorDirection: "before",
    };
  }

  return { parsedCursor: undefined, parsedCursorDirection: "after" };
};
