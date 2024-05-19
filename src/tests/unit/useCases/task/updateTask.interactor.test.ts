import {
    updateTaskDsGatewayMock,
    updateTaskOutputBoundaryMock,
} from "@/tests/unit/mocks/task";

import {
    UpdateTaskInteractor,
    UpdateTaskDsResponseModel,
    UpdateTaskRequestModel,
    UpdateTaskResponseModel,
} from "@/useCases/task";

describe("UpdateTaskInteractor", () => {
    let interactor: UpdateTaskInteractor;

    let requestModel: UpdateTaskRequestModel;
    let responseModel: UpdateTaskResponseModel;
    let dsResponseModel: UpdateTaskDsResponseModel;
    let dateMock: Date;

    beforeEach(() => {
        jest.clearAllMocks();

        dateMock = new Date("2020-01-01T00:00:00.000Z");
        jest.useFakeTimers().setSystemTime(dateMock);

        interactor = new UpdateTaskInteractor(
            updateTaskDsGatewayMock,
            updateTaskOutputBoundaryMock
        );
        requestModel = {
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
        dsResponseModel = {
            id: "1",
            description: "Task 1 description",
            title: "Task 1 title",
            dueDate: new Date("2020-01-02T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        };
    });

    describe("create", () => {
        beforeEach(() => {
            updateTaskDsGatewayMock.update.mockResolvedValue(dsResponseModel);
            updateTaskDsGatewayMock.getById.mockResolvedValue(dsResponseModel);

            updateTaskOutputBoundaryMock.presentSuccess.mockReturnValue(
                responseModel
            );
            updateTaskOutputBoundaryMock.presentUpdateTaskInvalidTitle.mockImplementation(
                () => {
                    throw new Error("Invalid title");
                }
            );
            updateTaskOutputBoundaryMock.presentUpdateTaskInvalidDueDate.mockImplementation(
                () => {
                    throw new Error("Invalid due date");
                }
            );
            updateTaskOutputBoundaryMock.presentUpdateTaskInvalidDescription.mockImplementation(
                () => {
                    throw new Error("Invalid description");
                }
            );
            updateTaskOutputBoundaryMock.presentUpdateTaskNotFound.mockImplementation(
                () => {
                    throw new Error("Task not found");
                }
            );
        });

        it("should return success", async () => {
            const result = await interactor.update(requestModel);

            expect(result).toEqual(responseModel);
        });

        it("should return exception when title is invalid", async () => {
            requestModel.title = "";

            await expect(interactor.update(requestModel)).rejects.toThrow(
                "Invalid title"
            );
        });

        it("should return exception when dueDate is invalid", async () => {
            requestModel.dueDate = new Date("2019-12-31T00:00:00.000Z");

            await expect(interactor.update(requestModel)).rejects.toThrow(
                "Invalid due date"
            );
        });

        it("should return exception when description is invalid", async () => {
            requestModel.description = "";

            await expect(interactor.update(requestModel)).rejects.toThrow(
                "Invalid description"
            );
        });

        it("should return exception when task is not found", async () => {
            updateTaskDsGatewayMock.getById.mockResolvedValue(null);

            await expect(interactor.update(requestModel)).rejects.toThrow(
                "Task not found"
            );
        });
    });
});
