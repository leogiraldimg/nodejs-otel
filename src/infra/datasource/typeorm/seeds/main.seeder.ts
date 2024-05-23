import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";

import { TaskSeeder } from "../task/task.seeder";
import { taskSeederFactory } from "../task/task.seeder.factory";

class MainSeeder implements Seeder {
    async run(dataSource: DataSource, _factoryManager: SeederFactoryManager) {
        await runSeeder(dataSource, TaskSeeder, {
            factories: [taskSeederFactory],
        });
    }
}

export { MainSeeder };
