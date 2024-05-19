import { UpdateTaskRequestModel, UpdateTaskResponseModel } from "..";

interface UpdateTaskInputBoundary {
    update(
        requestModel: UpdateTaskRequestModel
    ): Promise<UpdateTaskResponseModel>;
}

export { UpdateTaskInputBoundary };
