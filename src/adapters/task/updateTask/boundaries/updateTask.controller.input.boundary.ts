import {
    UpdateTaskRequestModel,
    UpdateTaskResponseModel,
} from "@/useCases/task";

interface UpdateTaskControllerInputBoundary {
    update(
        requestModel: UpdateTaskRequestModel
    ): Promise<UpdateTaskResponseModel>;
}

export { UpdateTaskControllerInputBoundary };
