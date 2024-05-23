import { setSeederFactory } from "typeorm-extension";

import { TaskDataMapperTypeorm } from "./task.dataMapper.typeorm";

const taskSeederFactory = setSeederFactory(TaskDataMapperTypeorm, (faker) => {
    const task = new TaskDataMapperTypeorm();
    task.createdAt = faker.date.past();
    task.description = faker.lorem.words(4);
    task.dueDate = faker.date.future();
    task.id = faker.string.uuid();
    task.priority = faker.helpers.arrayElement([
        "low",
        "medium",
        "high",
        "critical",
    ]);
    task.status = faker.helpers.arrayElement(["todo", "inProgress", "done"]);
    task.title = faker.lorem.words(3);

    return task;
});

export { taskSeederFactory };
