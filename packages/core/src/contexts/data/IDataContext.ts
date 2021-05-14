import { SorterResult } from "antd/lib/table/interface";

import { BaseRecord, Identifier } from "../../interfaces";

export interface Pagination {
    current?: number;
    pageSize?: number;
}

export type Sort = SorterResult<any> | SorterResult<any>[];

export interface Search {
    field?: string;
    value?: string;
}

export type Filters = Record<string, (string | number | boolean)[] | null>;


export type CrudFilters =
    | QueryFilterArr
    | Array<QueryFilter | QueryFilterArr>;

export type QueryFilter = {
    field: string;
    operator: ComparisonOperator;
    value?: any;
};
export type QueryFilterArr = [string, ComparisonOperator, any?];

export type ComparisonOperator = keyof FieldOperator;
export type PrimitivesVal = string | number | boolean;
export type FiledValues = PrimitivesVal | Array<PrimitivesVal>;

export type FieldOperator = {
    $eq?: FiledValues;
    $ne?: FiledValues;
    $gt?: FiledValues;
    $lt?: FiledValues;
    $gte?: FiledValues;
    $lte?: FiledValues;
    $starts?: FiledValues;
    $ends?: FiledValues;
    $cont?: FiledValues;
    $excl?: FiledValues;
    $in?: FiledValues;
    $notin?: FiledValues;
    $between?: FiledValues;
    $isnull?: FiledValues;
    $notnull?: FiledValues;
    $eqL?: FiledValues;
    $neL?: FiledValues;
    $startsL?: FiledValues;
    $endsL?: FiledValues;
    $contL?: FiledValues;
    $exclL?: FiledValues;
    $inL?: FiledValues;
    $notinL?: FiledValues;
    $or?: FieldOperator;
    $and?: never;
};

export interface GetListResponse<RecordType = BaseRecord> {
    data: RecordType[];
    total: number;
}

export interface CreateResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface CreateManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface UpdateResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface UpdateManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface GetOneResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface GetManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface DeleteOneResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface DeleteManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface IDataContext {
    getList: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: {
            pagination?: Pagination;
            search?: Search;
            sort?: Sort;
            filters?: CrudFilters;
        },
    ) => Promise<GetListResponse<RecordType>>;
    getMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<GetManyResponse<RecordType>>;
    getOne: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<GetOneResponse<RecordType>>;
    create: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: BaseRecord,
    ) => Promise<CreateResponse<RecordType>>;
    createMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: BaseRecord[],
    ) => Promise<CreateManyResponse<RecordType>>;
    update: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
        params: BaseRecord,
    ) => Promise<UpdateResponse<RecordType>>;
    updateMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
        params: BaseRecord,
    ) => Promise<UpdateManyResponse<RecordType>>;
    deleteOne: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<DeleteOneResponse<RecordType>>;
    deleteMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse<RecordType>>;
    getApiUrl: () => string;
}
