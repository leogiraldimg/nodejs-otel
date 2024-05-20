import { TaskRepositoryTypeorm } from "..";
import {
    ListTaskByIdDsGateway,
    ListTaskByIdDsResponseModel,
} from "@/useCases/task";

class ListTaskByIdDsTypeorm implements ListTaskByIdDsGateway {
    private repository: TaskRepositoryTypeorm;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;
    }

    async getById(id: string): Promise<ListTaskByIdDsResponseModel> {
        const entity = await this.repository.findOneByOrFail({ id });

        return new ListTaskByIdDsResponseModel(entity);
    }
}

export { ListTaskByIdDsTypeorm };
