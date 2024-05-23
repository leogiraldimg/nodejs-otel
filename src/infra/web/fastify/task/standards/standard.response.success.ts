import { Pagination, StandardResponse } from ".";

class StandardResponseSuccess extends StandardResponse {
    constructor(params: {
        status: number;
        message: string;
        content: unknown;
        pagination?: Pagination;
    }) {
        super({ ...params, error: false });
    }
}

export { StandardResponseSuccess };
