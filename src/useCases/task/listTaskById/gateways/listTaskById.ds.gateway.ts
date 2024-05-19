import { ListTaskByIdDsResponseModel } from "../models";

interface ListTaskByIdDsGateway {
    getById(id: string): Promise<ListTaskByIdDsResponseModel | null>;
}

export { ListTaskByIdDsGateway };
