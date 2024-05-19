import { UpdateTaskControllerInputBoundary } from "..";
import {
    UpdateTaskInputBoundary,
    UpdateTaskRequestModel,
    UpdateTaskResponseModel,
} from "@/useCases/task";

class UpdateTaskController implements UpdateTaskControllerInputBoundary {
    private inputBoundary: UpdateTaskInputBoundary;

    constructor(inputBoundary: UpdateTaskInputBoundary) {
        this.inputBoundary = inputBoundary;
    }

    async update(
        requestModel: UpdateTaskRequestModel
    ): Promise<UpdateTaskResponseModel> {
        return await this.inputBoundary.update(requestModel);
    }
}

export { UpdateTaskController };
