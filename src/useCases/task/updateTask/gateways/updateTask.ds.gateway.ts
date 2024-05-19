import { UpdateTaskDsRequestModel, UpdateTaskDsResponseModel } from "..";

interface UpdateTaskDsGateway {
    update(
        requestModel: UpdateTaskDsRequestModel
    ): Promise<UpdateTaskDsResponseModel>;

    getById(id: string): Promise<UpdateTaskDsResponseModel | null>;
}

export { UpdateTaskDsGateway };
