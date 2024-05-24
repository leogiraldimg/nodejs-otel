import { taskRepositoryTypeormMock } from "@/tests/unit/mocks/task";

import {
    ListTaskByIdDsTypeorm,
    TaskDataMapperTypeorm,
    TaskFactoryTypeorm,
} from "@/infra/datasource/typeorm";
import { ListTaskByIdDsResponseModel } from "@/useCases/task";

describe("ListTaskByIdDsTypeorm", () => {
    let ds: ListTaskByIdDsTypeorm;

    let dataMapper: TaskDataMapperTypeorm;
    let responseModel: ListTaskByIdDsResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        ds = new ListTaskByIdDsTypeorm(taskRepositoryTypeormMock);

        dataMapper = TaskFactoryTypeorm.createTask({
            id: "1",
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
            createdAt: new Date("2020-01-01T00:00:00.000Z"),
        });
        responseModel = new ListTaskByIdDsResponseModel({
            id: "1",
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        });
    });

    describe("getById", () => {
        it("should return response model", async () => {
            taskRepositoryTypeormMock.findOneBy.mockResolvedValue(dataMapper);

            const result = await ds.getById("1");

            expect(result).toEqual(responseModel);
        });

        it("should return null when not exists", async () => {
            taskRepositoryTypeormMock.findOneBy.mockResolvedValue(null);

            const result = await ds.getById("1");

            expect(result).toBeNull();
        });
    });
});
