import { ListTaskByIdResponseModel } from "@/useCases/task";

interface ListTaskByIdControllerInputBoundary {
    listById(id: string): Promise<ListTaskByIdResponseModel>;
}

export { ListTaskByIdControllerInputBoundary };
