import { DeleteTaskNotFoundException } from "..";

interface DeleteTaskOutputBoundary {
    presentSuccess(): void;

    presentDeleteTaskNotFound(error: DeleteTaskNotFoundException): void;
}

export { DeleteTaskOutputBoundary };
