import {
    InvalidAttributeException,
    ResourceNotFoundException,
} from "@/adapters/exceptions";
import {
    UpdateTaskInvalidAttributeException,
    UpdateTaskNotFoundException,
    UpdateTaskOutputBoundary,
    UpdateTaskResponseModel,
} from "@/useCases/task";

class UpdateTaskPresenter implements UpdateTaskOutputBoundary {
    presentSuccess(
        responseModel: UpdateTaskResponseModel
    ): UpdateTaskResponseModel {
        return responseModel;
    }

    presentUpdateTaskInvalidTitle(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }

    presentUpdateTaskInvalidDueDate(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }

    presentUpdateTaskInvalidDescription(
        error: UpdateTaskInvalidAttributeException
    ): UpdateTaskResponseModel {
        throw new InvalidAttributeException(error.message);
    }

    presentUpdateTaskNotFound(
        error: UpdateTaskNotFoundException
    ): UpdateTaskResponseModel {
        throw new ResourceNotFoundException(error.message);
    }
}

export { UpdateTaskPresenter };
