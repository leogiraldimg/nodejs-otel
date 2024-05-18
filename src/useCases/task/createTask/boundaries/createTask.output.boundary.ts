import {
    CreateTaskInvalidAttributeException,
    CreateTaskResponseModel,
} from "..";

interface CreateTaskOutputBoundary {
    presentSuccess(
        responseModel: CreateTaskResponseModel
    ): CreateTaskResponseModel;

    presentCreateTaskInvalidTitle(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel;

    presentCreateTaskInvalidDescription(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel;

    presentCreateTaskInvalidDueDate(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel;
}

export { CreateTaskOutputBoundary };
