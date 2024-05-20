import { taskRepositoryTypeormMock } from "@/tests/unit/mocks/task";

import {
    DeleteTaskDsTypeorm,
    TaskDataMapperTypeorm,
    TaskFactoryTypeorm,
} from "@/infra/datasource/typeorm";

describe("DeleteTaskDsTypeorm", () => {
    let ds: DeleteTaskDsTypeorm;

    let dataMapper: TaskDataMapperTypeorm;

    beforeEach(() => {
        jest.clearAllMocks();

        ds = new DeleteTaskDsTypeorm(taskRepositoryTypeormMock);

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

    describe("existsById", () => {
        it("should return true when exists", async () => {
            taskRepositoryTypeormMock.findOneBy.mockResolvedValue(dataMapper);

            const result = await ds.existsById("1");

            expect(result).toBeTruthy();
        });

        it("should return false when not exists", async () => {
            taskRepositoryTypeormMock.findOneBy.mockResolvedValue(null);

            const result = await ds.existsById("1");

            expect(result).toBeFalsy();
        });
    });

    describe("remove", () => {
        it("should return undefined", async () => {
            taskRepositoryTypeormMock.findOneByOrFail.mockResolvedValue(
                dataMapper
            );

            const result = await ds.remove("1");

            expect(result).toBeUndefined();
        });
    });
});
