import { Pagination } from ".";

class StandardResponse {
    timestamp: Date;
    status: number;
    error: boolean;
    message: string;
    content: unknown;
    pagination?: Pagination;

    constructor(params: {
        status: number;
        error: boolean;
        message: string;
        content: unknown;
        pagination?: Pagination;
    }) {
        this.timestamp = new Date();
        this.status = params.status;
        this.error = params.error;
        this.message = params.message;
        this.content = params.content;
        this.pagination = params.pagination;
    }
}

export { StandardResponse };
