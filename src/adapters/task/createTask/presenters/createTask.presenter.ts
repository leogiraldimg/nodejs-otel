import { InvalidAttributeException } from "@/adapters/exceptions";
import {
    CreateTaskInvalidAttributeException,
    CreateTaskOutputBoundary,
    CreateTaskResponseModel,
} from "@/useCases/task";

class CreateTaskPresenter implements CreateTaskOutputBoundary {
    presentSuccess(
        responseModel: CreateTaskResponseModel
    ): CreateTaskResponseModel {
        return responseModel;
    }

    presentCreateTaskInvalidTitle(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }

    presentCreateTaskInvalidDueDate(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }

    presentCreateTaskInvalidDescription(
        error: CreateTaskInvalidAttributeException
    ): CreateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }
}

export { CreateTaskPresenter };
