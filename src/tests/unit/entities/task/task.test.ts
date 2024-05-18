import { Task } from "@/entities";

describe("Task", () => {
    let task: Task;
    let dateMock: Date;

    beforeEach(() => {
        dateMock = new Date("2020-01-01T00:00:00.000Z");
        jest.useFakeTimers().setSystemTime(dateMock);

        task = new Task({
            description: "Task 1 description",
            title: "Task 1 title",
            dueDate: new Date("2020-01-02T00:00:00.000Z"),
            priority: "low",
            status: "todo",
        });
    });

    describe("isTitleValid", () => {
        it("should return true if title is valid", () => {
            expect(task.isTitleValid()).toBe(true);
        });

        it("should return false if title is invalid", () => {
            task.title = "";
            expect(task.isTitleValid()).toBe(false);
        });
    });

    describe("isDescriptionValid", () => {
        it("should return true if description is valid", () => {
            expect(task.isDescriptionValid()).toBe(true);
        });

        it("should return false if description is invalid", () => {
            task.description = "";
            expect(task.isDescriptionValid()).toBe(false);
        });
    });

    describe("isDueDateValid", () => {
        it("should return true if dueDate is valid", () => {
            expect(task.isDueDateValid()).toBe(true);
        });

        it("should return false if dueDate is invalid", () => {
            task.dueDate = new Date("2019-12-31T00:00:00.000Z");
            expect(task.isDueDateValid()).toBe(false);
        });
    });
});
