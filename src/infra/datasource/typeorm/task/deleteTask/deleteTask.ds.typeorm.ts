import { TaskRepositoryTypeorm } from "..";
import { DeleteTaskDsGateway } from "@/useCases/task";

class DeleteTaskDsTypeorm implements DeleteTaskDsGateway {
    private repository: TaskRepositoryTypeorm;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;
    }

    async existsById(id: string): Promise<boolean> {
        const task = await this.repository.findOneBy({ id });

        return !!task;
    }

    async remove(id: string): Promise<void> {
        const task = await this.repository.findOneByOrFail({ id });

        await this.repository.remove(task);
    }
}

export { DeleteTaskDsTypeorm };
