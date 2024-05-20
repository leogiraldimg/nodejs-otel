import { Repository } from "typeorm";

import { TaskDataMapperTypeorm } from ".";

class TaskRepositoryTypeorm extends Repository<TaskDataMapperTypeorm> {}

export { TaskRepositoryTypeorm };
