import {
    createTaskDsGatewayMock,
    createTaskOutputBoundaryMock,
} from "@/tests/unit/mocks/task";

import {
    CreateTaskInteractor,
    CreateTaskDsResponseModel,
    CreateTaskRequestModel,
    CreateTaskResponseModel,
} from "@/useCases/task";

describe("CreateTaskInteractor", () => {
    let interactor: CreateTaskInteractor;

    let requestModel: CreateTaskRequestModel;
    let responseModel: CreateTaskResponseModel;
    let dsResponseModel: CreateTaskDsResponseModel;
    let dateMock: Date;

    beforeEach(() => {
        jest.clearAllMocks();

        dateMock = new Date("2020-01-01T00:00:00.000Z");
        jest.useFakeTimers().setSystemTime(dateMock);

        interactor = new CreateTaskInteractor(
            createTaskDsGatewayMock,
            createTaskOutputBoundaryMock
        );
        requestModel = {
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
            createTaskDsGatewayMock.save.mockResolvedValue(dsResponseModel);
            createTaskOutputBoundaryMock.presentSuccess.mockReturnValue(
                responseModel
            );
            createTaskOutputBoundaryMock.presentCreateTaskInvalidTitle.mockImplementation(
                () => {
                    throw new Error("Invalid title");
                }
            );
            createTaskOutputBoundaryMock.presentCreateTaskInvalidDueDate.mockImplementation(
                () => {
                    throw new Error("Invalid due date");
                }
            );
            createTaskOutputBoundaryMock.presentCreateTaskInvalidDescription.mockImplementation(
                () => {
                    throw new Error("Invalid description");
                }
            );
        });

        it("should return success", async () => {
            const result = await interactor.create(requestModel);

            expect(result).toEqual(responseModel);
        });

        it("should return exception when title is invalid", async () => {
            requestModel.title = "";

            await expect(interactor.create(requestModel)).rejects.toThrow(
                "Invalid title"
            );
        });

        it("should return exception when dueDate is invalid", async () => {
            requestModel.dueDate = new Date("2019-12-31T00:00:00.000Z");

            await expect(interactor.create(requestModel)).rejects.toThrow(
                "Invalid due date"
            );
        });

        it("should return exception when description is invalid", async () => {
            requestModel.description = "";

            await expect(interactor.create(requestModel)).rejects.toThrow(
                "Invalid description"
            );
        });
    });
});
