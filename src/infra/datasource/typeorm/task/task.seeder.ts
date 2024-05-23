import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { TaskDataMapperTypeorm } from "./task.dataMapper.typeorm";

class TaskSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
        const repository = dataSource.getRepository(TaskDataMapperTypeorm);
        const entities = await repository.find();
        await repository.remove(entities);

        const taskFactory = factoryManager.get(TaskDataMapperTypeorm);
        await taskFactory.saveMany(10);
    }
}

export { TaskSeeder };
