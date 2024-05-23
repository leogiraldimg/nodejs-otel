import { v4 as uuidv4 } from "uuid";
import { FastifyRequest } from "fastify";

import {
    createTaskControllerInputBoundaryMock,
    deleteTaskControllerInputBoundaryMock,
    listTaskByIdControllerInputBoundaryMock,
    updateTaskControllerInputBoundaryMock,
} from "@/tests/unit/mocks/task";
import {
    fastifyReplyMock,
    fastifyRequestMock,
} from "@/tests/unit/mocks/fastify";

import {
    RequestParamsId,
    StandardResponseError,
    StandardResponseSuccess,
    TaskController,
} from "@/infra/web/fastify/task";
import {
    CreateTaskResponseModel,
    UpdateTaskResponseModel,
    ListTaskByIdResponseModel,
} from "@/useCases/task";
import {
    InvalidAttributeException,
    ResourceNotFoundException,
} from "@/adapters/exceptions";

describe("TaskController", () => {
    let controller: TaskController;

    const dateMock = new Date("2022-01-01T00:00:00.000Z");

    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(dateMock);

        controller = new TaskController(
            createTaskControllerInputBoundaryMock,
            updateTaskControllerInputBoundaryMock,
            deleteTaskControllerInputBoundaryMock,
            listTaskByIdControllerInputBoundaryMock
        );
    });

    describe("insert", () => {
        let responseModel: CreateTaskResponseModel;

        beforeEach(() => {
            responseModel = new CreateTaskResponseModel({
                description: "Task 1 description",
                dueDate: new Date("2022-01-01T00:00:00.000Z"),
                id: "1",
                title: "Task 1",
                priority: "low",
                status: "todo",
            });

            createTaskControllerInputBoundaryMock.create.mockResolvedValue(
                responseModel
            );
        });

        it("should return 201 and created task", async () => {
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(201);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseSuccess({
                    content: responseModel,
                    status: 201,
                    message: "Tarefa criada com sucesso",
                })
            );
        });

        it("should return 400 when invalid attribute exception creating task", async () => {
            createTaskControllerInputBoundaryMock.create.mockRejectedValue(
                new InvalidAttributeException("Invalid attribute")
            );

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Invalid attribute",
                    status: 400,
                })
            );
        });

        it("should return 500 when unexpected exception creating task", async () => {
            const expectedError = new Error("Unexpected error");
            createTaskControllerInputBoundaryMock.create.mockRejectedValue(
                expectedError
            );

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(500);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: `Erro interno: ${JSON.stringify(expectedError)}`,
                    status: 500,
                })
            );
        });

        it("should return 400 when title is not given", async () => {
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Título é obrigatório",
                    status: 400,
                })
            );
        });

        it("should return 400 when description is not given", async () => {
            fastifyRequestMock.body = {
                title: responseModel.title,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Descrição é obrigatória",
                    status: 400,
                })
            );
        });

        it("should return 400 when dueDate is not given", async () => {
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Data de vencimento é obrigatória",
                    status: 400,
                })
            );
        });

        it("should return 400 when date is in correct format", async () => {
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: "invalid-date",
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Data deve ser no formato YYYY-MM-DDTHH:MM:SSZ",
                    status: 400,
                })
            );
        });

        it("should return 400 when priority is not given", async () => {
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                status: responseModel.status,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Prioridade deve ser 'low', 'medium' ou 'high'",
                    status: 400,
                })
            );
        });

        it("should return 400 when status is not given", async () => {
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
            };

            await controller.insert(fastifyRequestMock, fastifyReplyMock);

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Status deve ser 'todo', 'inProgress' ou 'done'",
                    status: 400,
                })
            );
        });
    });

    describe("update", () => {
        let responseModel: UpdateTaskResponseModel;

        beforeEach(() => {
            responseModel = new UpdateTaskResponseModel({
                description: "Task 1 description",
                dueDate: new Date("2022-01-01T00:00:00.000Z"),
                id: "1",
                title: "Task 1",
                priority: "low",
                status: "todo",
            });

            updateTaskControllerInputBoundaryMock.update.mockResolvedValue(
                responseModel
            );
        });

        it("should return 200 and updated task", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(200);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseSuccess({
                    content: responseModel,
                    status: 200,
                    message: "Tarefa alterada com sucesso",
                })
            );
        });

        it("should return 400 when invalid attribute exception updating task", async () => {
            updateTaskControllerInputBoundaryMock.update.mockRejectedValue(
                new InvalidAttributeException("Invalid attribute")
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Invalid attribute",
                    status: 400,
                })
            );
        });

        it("should return 404 when resource not found exception updating task", async () => {
            updateTaskControllerInputBoundaryMock.update.mockRejectedValue(
                new ResourceNotFoundException("Resource not found")
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(404);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Resource not found",
                    status: 404,
                })
            );
        });

        it("should return 500 when unexpected exception updating task", async () => {
            const expectedError = new Error("Unexpected error");
            updateTaskControllerInputBoundaryMock.update.mockRejectedValue(
                expectedError
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(500);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: `Erro interno: ${JSON.stringify(expectedError)}`,
                    status: 500,
                })
            );
        });

        it("should return 400 when id is not given", async () => {
            fastifyRequestMock.params = {};
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa é obrigatório",
                    status: 400,
                })
            );
        });

        it("should return 400 when id is not UUID", async () => {
            fastifyRequestMock.params = {
                id: "invalid-id",
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                title: responseModel.title,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa deve ser um UUID válido",
                    status: 400,
                })
            );
        });

        it("should return 400 when title is not given", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Título é obrigatório",
                    status: 400,
                })
            );
        });

        it("should return 400 when description is not given", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                title: responseModel.title,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Descrição é obrigatória",
                    status: 400,
                })
            );
        });

        it("should return 400 when dueDate is not given", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Data de vencimento é obrigatória",
                    status: 400,
                })
            );
        });

        it("should return 400 when dueDate is invalid", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: "invalid-date",
                priority: responseModel.priority,
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Data deve ser no formato YYYY-MM-DDTHH:MM:SSZ",
                    status: 400,
                })
            );
        });

        it("should return 400 when priority is not given", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                status: responseModel.status,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Prioridade deve ser 'low', 'medium' ou 'high'",
                    status: 400,
                })
            );
        });

        it("should return 400 when status is not given", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };
            fastifyRequestMock.body = {
                title: responseModel.title,
                description: responseModel.description,
                dueDate: responseModel.dueDate.toISOString(),
                priority: responseModel.priority,
            };

            await controller.update(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Status deve ser 'todo', 'inProgress' ou 'done'",
                    status: 400,
                })
            );
        });
    });

    describe("findById", () => {
        let responseModel: ListTaskByIdResponseModel;

        beforeEach(() => {
            responseModel = new ListTaskByIdResponseModel({
                description: "Task 1 description",
                dueDate: new Date("2022-01-01T00:00:00.000Z"),
                id: "1",
                title: "Task 1",
                priority: "low",
                status: "todo",
            });

            listTaskByIdControllerInputBoundaryMock.listById.mockResolvedValue(
                responseModel
            );
        });

        it("should return 200 and found task", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.findById(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(200);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseSuccess({
                    content: responseModel,
                    status: 200,
                    message: "Tarefa encontrada com sucesso",
                })
            );
        });

        it("should return 404 when resource not found exception listing task", async () => {
            listTaskByIdControllerInputBoundaryMock.listById.mockRejectedValue(
                new ResourceNotFoundException("Resource not found")
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.findById(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(404);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Resource not found",
                    status: 404,
                })
            );
        });

        // 500

        it("should return 500 when unexpected exception listing task", async () => {
            const expectedError = new Error("Unexpected error");
            listTaskByIdControllerInputBoundaryMock.listById.mockRejectedValue(
                expectedError
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.findById(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(500);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: `Erro interno: ${JSON.stringify(expectedError)}`,
                    status: 500,
                })
            );
        });

        it("should return 400 when id is not UUID", async () => {
            fastifyRequestMock.params = {
                id: "invalid-id",
            };

            await controller.findById(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa deve ser um UUID válido",
                    status: 400,
                })
            );
        });

        it("should return 400 when id is not given", async () => {
            fastifyRequestMock.params = {};

            await controller.findById(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa é obrigatório",
                    status: 400,
                })
            );
        });
    });

    describe("delete", () => {
        beforeEach(() => {
            deleteTaskControllerInputBoundaryMock.delete.mockResolvedValue(
                undefined
            );
        });

        it("should return 204", async () => {
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.delete(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(204);
            expect(fastifyReplyMock.send).toHaveBeenCalled();
        });

        it("should return 404 when resource not found exception deleting task", async () => {
            deleteTaskControllerInputBoundaryMock.delete.mockRejectedValue(
                new ResourceNotFoundException("Resource not found")
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.delete(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(404);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Resource not found",
                    status: 404,
                })
            );
        });

        it("should return 500 when unexpected exception deleting task", async () => {
            const expectedError = new Error("Unexpected error");
            deleteTaskControllerInputBoundaryMock.delete.mockRejectedValue(
                expectedError
            );
            fastifyRequestMock.params = {
                id: uuidv4(),
            };

            await controller.delete(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(500);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: `Erro interno: ${JSON.stringify(expectedError)}`,
                    status: 500,
                })
            );
        });

        it("should return 400 when id is not UUID", async () => {
            fastifyRequestMock.params = {
                id: "invalid-id",
            };

            await controller.delete(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa deve ser um UUID válido",
                    status: 400,
                })
            );
        });

        it("should return 400 when id is not given", async () => {
            fastifyRequestMock.params = {};

            await controller.delete(
                fastifyRequestMock as FastifyRequest<{
                    Params: RequestParamsId;
                }>,
                fastifyReplyMock
            );

            expect(fastifyReplyMock.status).toHaveBeenCalledWith(400);
            expect(fastifyReplyMock.send).toHaveBeenCalledWith(
                new StandardResponseError({
                    message: "Id da tarefa é obrigatório",
                    status: 400,
                })
            );
        });
    });
});
