import { DeleteTaskPresenter } from "@/adapters/task";
import { ResourceNotFoundException } from "@/adapters/exceptions";

import { DeleteTaskNotFoundException } from "@/useCases/task";

describe("DeleteTaskPresenter", () => {
    let presenter: DeleteTaskPresenter;

    beforeEach(() => {
        jest.clearAllMocks();

        presenter = new DeleteTaskPresenter();
    });

    describe("presentSuccess", () => {
        it("should return undefined", async () => {
            expect(presenter.presentSuccess()).toBeUndefined();
        });
    });

    describe("presentDeleteTaskNotFound", () => {
        it("should throw ResourceNotFoundException", async () => {
            const error = new DeleteTaskNotFoundException("Task not found");

            expect(() => presenter.presentDeleteTaskNotFound(error)).toThrow(
                new ResourceNotFoundException(error.message)
            );
        });
    });
});
