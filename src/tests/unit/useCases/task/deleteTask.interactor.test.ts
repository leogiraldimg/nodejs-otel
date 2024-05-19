import {
    deleteTaskDsGatewayMock,
    deleteTaskOutputBoundaryMock,
} from "@/tests/unit/mocks/task";

import { DeleteTaskInteractor } from "@/useCases/task";

describe("DeleteTaskInteractor", () => {
    let interactor: DeleteTaskInteractor;

    beforeEach(() => {
        jest.clearAllMocks();

        interactor = new DeleteTaskInteractor(
            deleteTaskDsGatewayMock,
            deleteTaskOutputBoundaryMock
        );
    });

    describe("delete", () => {
        beforeEach(() => {
            deleteTaskDsGatewayMock.existsById.mockResolvedValue(true);
            deleteTaskDsGatewayMock.remove.mockResolvedValue(undefined);
            deleteTaskOutputBoundaryMock.presentSuccess.mockReturnValue(
                undefined
            );
            deleteTaskOutputBoundaryMock.presentDeleteTaskNotFound.mockImplementation(
                () => {
                    throw new Error("Task not found");
                }
            );
        });

        it("should return success", async () => {
            const result = await interactor.delete("1");

            expect(result).toBeUndefined();
        });

        it("should return exception when task is not found", async () => {
            deleteTaskDsGatewayMock.existsById.mockResolvedValue(false);

            await expect(interactor.delete("1")).rejects.toThrow(
                "Task not found"
            );
        });
    });
});
