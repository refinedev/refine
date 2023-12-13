import * as Types from "@/interfaces";

export type NotificationsQueryVariables = Types.Exact<{
    paging: Types.OffsetPaging;
    filter: Types.AuditFilter;
    sorting?: Types.InputMaybe<Array<Types.AuditSort> | Types.AuditSort>;
}>;

export type NotificationsQuery = {
    audits: {
        totalCount: number;
        nodes: Array<{
            id: string;
            action: string;
            targetEntity: string;
            targetId: number;
            createdAt: any;
            user?: {
                id: string;
                name: string;
                avatarUrl?: string | null;
            } | null;
        }>;
    };
};

export type NotificationsDealsQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
}>;

export type NotificationsDealsQuery = {
    deals: {
        nodes: Array<{
            id: string;
            title: string;
            stage?: { id: string; title: string } | null;
            company: { id: string; name: string; avatarUrl?: string | null };
        }>;
    };
};
