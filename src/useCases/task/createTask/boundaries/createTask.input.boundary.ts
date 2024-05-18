import { CreateTaskRequestModel, CreateTaskResponseModel } from "..";

interface CreateTaskInputBoundary {
    create(
        requestModel: CreateTaskRequestModel
    ): Promise<CreateTaskResponseModel>;
}

export { CreateTaskInputBoundary };
