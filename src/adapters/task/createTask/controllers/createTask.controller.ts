import { CreateTaskControllerInputBoundary } from "..";
import {
    CreateTaskInputBoundary,
    CreateTaskRequestModel,
    CreateTaskResponseModel,
} from "@/useCases/task";

class CreateTaskController implements CreateTaskControllerInputBoundary {
    private inputBoundary: CreateTaskInputBoundary;

    constructor(inputBoundary: CreateTaskInputBoundary) {
        this.inputBoundary = inputBoundary;
    }

    async create(
        requestModel: CreateTaskRequestModel
    ): Promise<CreateTaskResponseModel> {
        return await this.inputBoundary.create(requestModel);
    }
}

export { CreateTaskController };
