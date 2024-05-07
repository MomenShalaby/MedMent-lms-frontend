export interface Pagination {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

export interface ResponseApi {
    status: string;
    message: string;
    data: any[];
    pagination: Pagination;
}