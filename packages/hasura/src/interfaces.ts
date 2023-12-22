// export type GetFields<Q extends Record<string, any>> = {
//     [FieldName in Q[keyof Q]]: Q[keyof Q][FieldName];
// };

export type GetFields<Q extends Record<string, any>> = {
    [QueryName in keyof Q[keyof Q]]: NonNullable<Q[keyof Q][QueryName]>;
};
