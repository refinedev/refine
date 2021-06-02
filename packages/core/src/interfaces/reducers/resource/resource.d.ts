export interface IResourceReducer {
    props: {
        name: string;
        hasList: boolean;
        hasEdit: boolean;
        hasShow: boolean;
        hasCreate: boolean;
    };
    data: [];
    list: {
        params: {
            sort?: string;
            order?: string;
            page: number;
            perPage?: number;
        };
        selectedIds?: string[];
        total?: number;
    };
}
