import { createTaskInputBoundaryMock } from "@/tests/unit/mocks/task";

import { CreateTaskController } from "@/adapters/task";
import {
    CreateTaskRequestModel,
    CreateTaskResponseModel,
} from "@/useCases/task";

describe("CreateTaskController", () => {
    let controller: CreateTaskController;

    let requestModel: CreateTaskRequestModel;
    let responseModel: CreateTaskResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        controller = new CreateTaskController(createTaskInputBoundaryMock);

        requestModel = new CreateTaskRequestModel({
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
        responseModel = new CreateTaskResponseModel({
            id: "1",
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
    });

    describe("create", () => {
        it("should return response model", async () => {
            createTaskInputBoundaryMock.create.mockResolvedValue(responseModel);

            const result = await controller.create(requestModel);

            expect(result).toEqual(responseModel);
        });
    });
});
