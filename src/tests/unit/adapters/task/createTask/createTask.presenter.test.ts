import { CreateTaskPresenter } from "@/adapters/task";
import { InvalidAttributeException } from "@/adapters/exceptions";

import {
    CreateTaskResponseModel,
    CreateTaskInvalidAttributeException,
} from "@/useCases/task";

describe("CreateTaskPresenter", () => {
    let presenter: CreateTaskPresenter;

    let responseModel: CreateTaskResponseModel;

    beforeEach(() => {
        jest.clearAllMocks();

        presenter = new CreateTaskPresenter();
        responseModel = new CreateTaskResponseModel({
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

    describe("presentCreateTaskInvalidTitle", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new CreateTaskInvalidAttributeException(
                "Invalid title"
            );

            expect(() =>
                presenter.presentCreateTaskInvalidTitle(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });

    describe("presentCreateTaskInvalidDueDate", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new CreateTaskInvalidAttributeException(
                "Invalid due date"
            );

            expect(() =>
                presenter.presentCreateTaskInvalidDueDate(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });

    describe("presentCreateTaskInvalidDescription", () => {
        it("should throw InvalidAttributeException", async () => {
            const error = new CreateTaskInvalidAttributeException(
                "Invalid description"
            );

            expect(() =>
                presenter.presentCreateTaskInvalidDescription(error)
            ).toThrow(new InvalidAttributeException(error.message));
        });
    });
});
