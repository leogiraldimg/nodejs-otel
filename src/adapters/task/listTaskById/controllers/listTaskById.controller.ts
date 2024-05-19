import { ListTaskByIdControllerInputBoundary } from "..";
import {
    ListTaskByIdInputBoundary,
    ListTaskByIdResponseModel,
} from "@/useCases/task";

class ListTaskByIdController implements ListTaskByIdControllerInputBoundary {
    private inputBoundary: ListTaskByIdInputBoundary;

    constructor(inputBoundary: ListTaskByIdInputBoundary) {
        this.inputBoundary = inputBoundary;
    }

    async listById(id: string): Promise<ListTaskByIdResponseModel> {
        return await this.inputBoundary.listById(id);
    }
}

export { ListTaskByIdController };
