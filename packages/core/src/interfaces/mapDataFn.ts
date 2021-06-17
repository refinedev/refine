export interface MapDataFn<TItem, TVariables extends TItem = TItem> {
    (item: TItem, index?: number, items?: TItem[]): TVariables;
}
