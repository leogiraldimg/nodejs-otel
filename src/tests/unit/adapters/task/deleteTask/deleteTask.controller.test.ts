import { deleteTaskInputBoundaryMock } from "@/tests/unit/mocks/task";

import { DeleteTaskController } from "@/adapters/task";

describe("DeleteTaskController", () => {
    let controller: DeleteTaskController;

    beforeEach(() => {
        jest.clearAllMocks();

        controller = new DeleteTaskController(deleteTaskInputBoundaryMock);
    });

    describe("delete", () => {
        it("should return undefined", async () => {
            expect(await controller.delete("1")).toBeUndefined();
        });
    });
});
