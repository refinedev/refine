export type GetFieldsFromList<Q extends Record<string, any>> =
    Q[keyof Q]["nodes"][0];

export type GetFields<Q extends Record<string, any>> = Q[keyof Q];
