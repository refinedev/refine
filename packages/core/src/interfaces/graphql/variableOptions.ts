export type VariableOptions =
    | {
          type?: string;
          name?: string;
          value: any;
          list?: boolean;
          required?: boolean;
      }
    | { [k: string]: any };
