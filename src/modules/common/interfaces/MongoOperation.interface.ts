

export interface MongoOperation<T> {
    data: T;
    status: 'success' | 'error';
    statusCode: number;
    errorMessage?: string;
    message?: string;
}