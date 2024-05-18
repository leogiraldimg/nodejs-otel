import { CreateTaskDsRequestModel, CreateTaskDsResponseModel } from "..";

interface CreateTaskDsGateway {
    save(
        requestModel: CreateTaskDsRequestModel
    ): Promise<CreateTaskDsResponseModel>;
}

export { CreateTaskDsGateway };
