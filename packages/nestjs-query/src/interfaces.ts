export type GetFieldsFromList<Q extends Record<string, any>> =
    Q[keyof Q]["nodes"][0];

export type GetFieldsFromMutation<Q extends Record<string, any>> = Q[keyof Q];
