import * as Types from "@/interfaces";

export type UpcomingEventsQueryVariables = Types.Exact<{
    filter: Types.EventFilter;
    sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
    paging: Types.OffsetPaging;
}>;

export type UpcomingEventsQuery = {
    events: {
        totalCount: number;
        nodes: Array<{
            id: string;
            title: string;
            color: string;
            startDate: any;
            endDate: any;
        }>;
    };
};
