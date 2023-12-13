export type GetFieldsFromList<Q extends Record<string, any>> =
    Q[keyof Q]["nodes"][0];

export type GetFields<Q extends Record<string, any>> = Q[keyof Q];

export type GetVariables<Q extends Record<"input", any>> =
    Q["input"][keyof Q["input"]] & Q["input"]["update"];
