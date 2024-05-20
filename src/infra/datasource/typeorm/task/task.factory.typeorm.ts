import { v4 as uuidv4 } from "uuid";

import { TaskDataMapperTypeorm } from ".";

class TaskFactoryTypeorm {
    static createTask(params: {
        id?: TaskDataMapperTypeorm["id"];
        title: TaskDataMapperTypeorm["title"];
        description: TaskDataMapperTypeorm["description"];
        status: TaskDataMapperTypeorm["status"];
        priority: TaskDataMapperTypeorm["priority"];
        dueDate: TaskDataMapperTypeorm["dueDate"];
        createdAt: TaskDataMapperTypeorm["createdAt"];
    }): TaskDataMapperTypeorm {
        const { id, title, description, status, priority, dueDate, createdAt } =
            params;
        const dataMapper = new TaskDataMapperTypeorm();

        dataMapper.id = id || uuidv4();
        dataMapper.title = title;
        dataMapper.description = description;
        dataMapper.status = status;
        dataMapper.priority = priority;
        dataMapper.dueDate = dueDate;
        dataMapper.createdAt = createdAt;

        return dataMapper;
    }
}

export { TaskFactoryTypeorm };
