export type MapDataFn<TItem, TVariables> = (
  item: TItem,
  index?: number,
  items?: TItem[],
) => TVariables;
