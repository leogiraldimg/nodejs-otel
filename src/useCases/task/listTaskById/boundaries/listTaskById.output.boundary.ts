import {
    ListTaskByIdResponseModel,
    ListTaskByIdNotFoundException,
} from "@/useCases/task";

interface ListTaskByIdOutputBoundary {
    presentSuccess(
        responseModel: ListTaskByIdResponseModel
    ): ListTaskByIdResponseModel;

    presentListTaskByIdNotFound(
        error: ListTaskByIdNotFoundException
    ): ListTaskByIdResponseModel;
}

export { ListTaskByIdOutputBoundary };
