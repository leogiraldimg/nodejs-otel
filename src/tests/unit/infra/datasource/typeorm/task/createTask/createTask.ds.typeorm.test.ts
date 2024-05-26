import "@/tests/unit/mocks/observability";
import { taskRepositoryTypeormMock } from "@/tests/unit/mocks/task";

import { CreateTaskDsTypeorm } from "@/infra/datasource/typeorm";
import {
    CreateTaskDsRequestModel,
    CreateTaskDsResponseModel,
} from "@/useCases/task";

describe("CreateTaskDsTypeorm", () => {
    let ds: CreateTaskDsTypeorm;

    let requestModel: CreateTaskDsRequestModel;

    beforeEach(() => {
        jest.clearAllMocks();

        ds = new CreateTaskDsTypeorm(taskRepositoryTypeormMock);

        requestModel = new CreateTaskDsRequestModel({
            title: "Task 1",
            description: "Task 1 description",
            dueDate: new Date("2020-01-01T00:00:00.000Z"),
            priority: "low",
            status: "todo",
            createdAt: new Date("2020-01-01T00:00:00.000Z"),
        });
    });

    describe("save", () => {
        it("should return response model", async () => {
            const expectedResponseModel = new CreateTaskDsResponseModel({
                id: "1",
                title: "Task 1",
                description: "Task 1 description",
                dueDate: new Date("2020-01-01T00:00:00.000Z"),
                priority: "low",
                status: "todo",
            });
            taskRepositoryTypeormMock.save.mockResolvedValue({
                ...expectedResponseModel,
                createdAt: requestModel.createdAt,
                updatedAt: new Date("2020-01-01T00:00:00.000Z"),
            });

            const result = await ds.save(requestModel);

            expect(result).toEqual(expectedResponseModel);
        });
    });
});
