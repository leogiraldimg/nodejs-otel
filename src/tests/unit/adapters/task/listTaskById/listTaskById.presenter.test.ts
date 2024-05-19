import { ListTaskByIdPresenter } from "@/adapters/task";
import { ResourceNotFoundException } from "@/adapters/exceptions";

import {
    ListTaskByIdResponseModel,
    ListTaskByIdNotFoundException,
} from "@/useCases/task";

describe("ListTaskByIdPresenter", () => {
    let presenter: ListTaskByIdPresenter;

    let responseModel: ListTaskByIdResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        presenter = new ListTaskByIdPresenter();
        responseModel = new ListTaskByIdResponseModel({
            id: "1",
            description: "Task 1 description",
            dueDate: new Date("2022-01-01T00:00:00.000Z"),
            title: "Task 1 title",
            priority: "low",
            status: "todo",
        });
    });

    describe("presentSuccess", () => {
        it("should return response model", async () => {
            expect(presenter.presentSuccess(responseModel)).toEqual(
                responseModel
            );
        });
    });

    describe("presentListTaskByIdNotFound", () => {
        it("should throw ResourceNotFoundException", async () => {
            const error = new ListTaskByIdNotFoundException("Task not found");

            expect(() => presenter.presentListTaskByIdNotFound(error)).toThrow(
                new ResourceNotFoundException(error.message)
            );
        });
    });
});
