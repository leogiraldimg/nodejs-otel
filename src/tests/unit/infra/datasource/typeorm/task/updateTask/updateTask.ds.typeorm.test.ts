import { taskRepositoryTypeormMock } from "@/tests/unit/mocks/task";

import {
    UpdateTaskDsTypeorm,
    TaskDataMapperTypeorm,
    TaskFactoryTypeorm,
} from "@/infra/datasource/typeorm";
import {
    UpdateTaskDsRequestModel,
    UpdateTaskDsResponseModel,
} from "@/useCases/task";

describe("UpdateTaskDsTypeorm", () => {
    let ds: UpdateTaskDsTypeorm;

    let requestModel: UpdateTaskDsRequestModel;
    let responseModel: UpdateTaskDsResponseModel;
    let dataMapper: TaskDataMapperTypeorm;

    beforeEach(() => {
        jest.clearAllMocks();

        ds = new UpdateTaskDsTypeorm(taskRepositoryTypeormMock);

        requestModel = new UpdateTaskDsRequestModel({
            id: "1",
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        });
        responseModel = new UpdateTaskDsResponseModel({
            id: "1",
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        });
        dataMapper = TaskFactoryTypeorm.createTask({
            id: "1",
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
            createdAt: new Date("2020-01-01T00:00:00.000Z"),
        });
    });

    describe("getById", () => {
        it("should return response model", async () => {
            taskRepositoryTypeormMock.findOneByOrFail.mockResolvedValue(
                dataMapper
            );

            const result = await ds.getById(requestModel.id);

            expect(result).toEqual(responseModel);
        });
    });

    describe("update", () => {
        it("should return response model", async () => {
            taskRepositoryTypeormMock.save.mockResolvedValue(dataMapper);

            const result = await ds.update(requestModel);

            expect(result).toEqual(responseModel);
        });
    });
});
