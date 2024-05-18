import {
    CreateTaskRequestModel,
    CreateTaskResponseModel,
} from "@/useCases/task";

interface CreateTaskControllerInputBoundary {
    create(
        requestModel: CreateTaskRequestModel
    ): Promise<CreateTaskResponseModel>;
}

export { CreateTaskControllerInputBoundary };
