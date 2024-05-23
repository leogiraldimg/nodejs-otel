import { StandardResponse } from ".";

class StandardResponseError extends StandardResponse {
    constructor(params: {
        status: number;
        message: string;
        content?: unknown;
    }) {
        super({ ...params, error: true, content: params.content || null });
    }
}

export { StandardResponseError };
