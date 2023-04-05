export interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
}
