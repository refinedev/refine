export interface MapDataFn<TItem, TVariables> {
    (item: TItem, index?: number, items?: TItem[]): TVariables;
}
