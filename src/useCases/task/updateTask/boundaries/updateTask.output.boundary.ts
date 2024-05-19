import {
    UpdateTaskInvalidAttributeException,
    UpdateTaskNotFoundException,
    UpdateTaskResponseModel,
} from "..";

interface UpdateTaskOutputBoundary {
    presentSuccess(
        responseModel: UpdateTaskResponseModel
    ): UpdateTaskResponseModel;

    presentUpdateTaskInvalidTitle(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel;

    presentUpdateTaskInvalidDescription(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel;

    presentUpdateTaskInvalidDueDate(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel;

    presentUpdateTaskNotFound(
        error: UpdateTaskNotFoundException
    ): UpdateTaskResponseModel;
}

export { UpdateTaskOutputBoundary };
