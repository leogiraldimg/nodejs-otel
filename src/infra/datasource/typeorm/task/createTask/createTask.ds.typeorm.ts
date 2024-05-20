import { TaskFactoryTypeorm, TaskRepositoryTypeorm } from "..";
import {
    CreateTaskDsGateway,
    CreateTaskDsRequestModel,
    CreateTaskDsResponseModel,
} from "@/useCases/task";

class CreateTaskDsTypeorm implements CreateTaskDsGateway {
    private repository: TaskRepositoryTypeorm;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;
    }

    async save(
        requestModel: CreateTaskDsRequestModel
    ): Promise<CreateTaskDsResponseModel> {
        let entity = TaskFactoryTypeorm.createTask(requestModel);
        entity = await this.repository.save(entity);

        return new CreateTaskDsResponseModel(entity);
    }
}

export { CreateTaskDsTypeorm };
