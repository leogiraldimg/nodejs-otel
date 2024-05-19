import {
    listTaskByIdDsGatewayMock,
    listTaskByIdOutputBoundaryMock,
} from "@/tests/unit/mocks/task";

import {
    ListTaskByIdInteractor,
    ListTaskByIdDsResponseModel,
    ListTaskByIdResponseModel,
} from "@/useCases/task";

describe("ListTaskByIdInteractor", () => {
    let interactor: ListTaskByIdInteractor;

    let dsResponseModel: ListTaskByIdDsResponseModel;
    let responseModel: ListTaskByIdResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        interactor = new ListTaskByIdInteractor(
            listTaskByIdDsGatewayMock,
            listTaskByIdOutputBoundaryMock
        );
        dsResponseModel = {
            id: "1",
            description: "Task 1 description",
            title: "Task 1 title",
            dueDate: new Date("2020-01-02T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        };
        responseModel = {
            id: "1",
            description: "Task 1 description",
            title: "Task 1 title",
            dueDate: new Date("2020-01-02T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        };
    });

    describe("listById", () => {
        beforeEach(() => {
            listTaskByIdDsGatewayMock.getById.mockResolvedValue(
                dsResponseModel
            );
            listTaskByIdOutputBoundaryMock.presentSuccess.mockReturnValue(
                responseModel
            );
            listTaskByIdOutputBoundaryMock.presentListTaskByIdNotFound.mockImplementation(
                () => {
                    throw new Error("Task not found");
                }
            );
        });

        it("should return success", async () => {
            const result = await interactor.listById("1");

            expect(result).toEqual(responseModel);
        });

        it("should return exception when task is not found", async () => {
            listTaskByIdDsGatewayMock.getById.mockResolvedValue(null);

            await expect(interactor.listById("1")).rejects.toThrow(
                "Task not found"
            );
        });
    });
});
