import { listTaskByIdInputBoundaryMock } from "@/tests/unit/mocks/task";

import { ListTaskByIdController } from "@/adapters/task";
import { ListTaskByIdResponseModel } from "@/useCases/task";

describe("ListTaskByIdController", () => {
    let controller: ListTaskByIdController;

    let responseModel: ListTaskByIdResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        controller = new ListTaskByIdController(listTaskByIdInputBoundaryMock);

        responseModel = new ListTaskByIdResponseModel({
            id: "1",
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
    });

    describe("listById", () => {
        it("should return response model", async () => {
            listTaskByIdInputBoundaryMock.listById.mockResolvedValue(
                responseModel
            );

            const result = await controller.listById("1");

            expect(result).toEqual(responseModel);
        });
    });
});
