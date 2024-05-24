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

    async getById(id: string): Promise<ListTaskByIdDsResponseModel | null> {
        const entity = await this.repository.findOneBy({ id });

        return entity && new ListTaskByIdDsResponseModel(entity);
    }
}

export { ListTaskByIdDsTypeorm };
