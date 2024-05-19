import { DeleteTaskControllerInputBoundary } from "..";
import { DeleteTaskInputBoundary } from "@/useCases/task";

class DeleteTaskController implements DeleteTaskControllerInputBoundary {
    private inputBoundary: DeleteTaskInputBoundary;

    constructor(inputBoundary: DeleteTaskInputBoundary) {
        this.inputBoundary = inputBoundary;
    }

    async delete(id: string): Promise<void> {
        return await this.inputBoundary.delete(id);
    }
}

export { DeleteTaskController };
