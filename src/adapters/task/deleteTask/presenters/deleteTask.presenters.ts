import { ResourceNotFoundException } from "@/adapters/exceptions";
import {
    DeleteTaskNotFoundException,
    DeleteTaskOutputBoundary,
} from "@/useCases/task";

class DeleteTaskPresenter implements DeleteTaskOutputBoundary {
    presentSuccess() {
        return;
    }

    presentDeleteTaskNotFound(error: DeleteTaskNotFoundException) {
        throw new ResourceNotFoundException(error.message);
    }
}

export { DeleteTaskPresenter };
