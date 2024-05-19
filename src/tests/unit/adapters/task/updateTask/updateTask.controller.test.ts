import { updateTaskInputBoundaryMock } from "@/tests/unit/mocks/task";

import { UpdateTaskController } from "@/adapters/task";
import {
    UpdateTaskRequestModel,
    UpdateTaskResponseModel,
} from "@/useCases/task";

describe("UpdateTaskController", () => {
    let controller: UpdateTaskController;

    let requestModel: UpdateTaskRequestModel;
    let responseModel: UpdateTaskResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        controller = new UpdateTaskController(updateTaskInputBoundaryMock);

        requestModel = new UpdateTaskRequestModel({
            id: "1",
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
        responseModel = new UpdateTaskResponseModel({
            id: "1",
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
    });

    describe("update", () => {
        it("should return response model", async () => {
            updateTaskInputBoundaryMock.update.mockResolvedValue(responseModel);

            const result = await controller.update(requestModel);

            expect(result).toEqual(responseModel);
        });
    });
});
