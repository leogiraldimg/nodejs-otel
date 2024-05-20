import { mock } from "jest-mock-extended";

import { TaskRepositoryTypeorm } from "@/infra/datasource/typeorm/task/task.repository.typeorm";

const taskRepositoryTypeormMock = mock<TaskRepositoryTypeorm>();

export { taskRepositoryTypeormMock };
