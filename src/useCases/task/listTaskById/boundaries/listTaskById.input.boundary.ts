import { ListTaskByIdResponseModel } from "..";

interface ListTaskByIdInputBoundary {
    listById(id: string): Promise<ListTaskByIdResponseModel>;
}

export { ListTaskByIdInputBoundary };
