export interface ValidationErrors {
  [field: string]:
    | string
    | string[]
    | boolean
    | { key: string; message: string };
}

export interface HttpError extends Record<string, any> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}
