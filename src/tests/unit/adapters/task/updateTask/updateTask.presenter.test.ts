import { UpdateTaskPresenter } from "@/adapters/task";
import {
    InvalidAttributeException,
    ResourceNotFoundException,
} from "@/adapters/exceptions";

import {
    UpdateTaskResponseModel,
    UpdateTaskInvalidAttributeException,
} from "@/useCases/task";

describe("UpdateTaskPresenter", () => {
    let presenter: UpdateTaskPresenter;

    let responseModel: UpdateTaskResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        presenter = new UpdateTaskPresenter();
        responseModel = new UpdateTaskResponseModel({
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

    describe("presentUpdateTaskInvalidTitle", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new UpdateTaskInvalidAttributeException(
                "Invalid title"
            );

            expect(() =>
                presenter.presentUpdateTaskInvalidTitle(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });

    describe("presentUpdateTaskInvalidDueDate", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new UpdateTaskInvalidAttributeException(
                "Invalid due date"
            );

            expect(() =>
                presenter.presentUpdateTaskInvalidDueDate(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });

    describe("presentUpdateTaskInvalidDescription", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new UpdateTaskInvalidAttributeException(
                "Invalid description"
            );

            expect(() =>
                presenter.presentUpdateTaskInvalidDescription(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });

    describe("presentUpdateTaskNotFound", () => {
        it("should throw ResourceNotFoundException", async () => {
            const error = new ResourceNotFoundException("Task not found");

            expect(() => presenter.presentUpdateTaskNotFound(error)).toThrow(
                new ResourceNotFoundException(error.message)
            );
        });
    });
});
