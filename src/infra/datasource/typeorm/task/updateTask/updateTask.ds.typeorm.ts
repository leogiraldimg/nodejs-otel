import { TaskRepositoryTypeorm } from "..";
import {
    UpdateTaskDsGateway,
    UpdateTaskDsRequestModel,
    UpdateTaskDsResponseModel,
} from "@/useCases/task";

class UpdateTaskDsTypeorm implements UpdateTaskDsGateway {
    private repository: TaskRepositoryTypeorm;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;
    }

    async getById(id: string): Promise<UpdateTaskDsResponseModel | null> {
        const entity = await this.repository.findOneBy({ id });

        return entity && new UpdateTaskDsResponseModel(entity);
    }

    async update(
        requestModel: UpdateTaskDsRequestModel
    ): Promise<UpdateTaskDsResponseModel> {
        const entity = await this.repository.findOneByOrFail({
            id: requestModel.id,
        });

        entity.title = requestModel.title;
        entity.description = requestModel.description;
        entity.status = requestModel.status;
        entity.priority = requestModel.priority;
        entity.dueDate = requestModel.dueDate;
        entity.updatedAt = new Date();

        await this.repository.save(entity);

        return new UpdateTaskDsResponseModel(entity);
    }
}

export { UpdateTaskDsTypeorm };
