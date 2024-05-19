import { ResourceNotFoundException } from "@/adapters/exceptions";
import {
    ListTaskByIdNotFoundException,
    ListTaskByIdOutputBoundary,
    ListTaskByIdResponseModel,
} from "@/useCases/task";

class ListTaskByIdPresenter implements ListTaskByIdOutputBoundary {
    presentSuccess(
        responseModel: ListTaskByIdResponseModel
    ): ListTaskByIdResponseModel {
        return responseModel;
    }

    presentListTaskByIdNotFound(
        error: ListTaskByIdNotFoundException
    ): ListTaskByIdResponseModel {
        throw new ResourceNotFoundException(error.message);
    }
}

export { ListTaskByIdPresenter };
