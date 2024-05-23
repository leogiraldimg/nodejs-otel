import { ZodError } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import {
    StandardResponseError,
    StandardResponseSuccess,
    insertTaskSchema,
    updateTaskSchema,
    taskIdSchema,
    RequestParamsId,
} from "..";
import {
    CreateTaskControllerInputBoundary,
    DeleteTaskControllerInputBoundary,
    ListTaskByIdControllerInputBoundary,
    UpdateTaskControllerInputBoundary,
} from "@/adapters/task";
import {
    InvalidAttributeException,
    ResourceNotFoundException,
} from "@/adapters/exceptions";

class TaskController {
    private createTaskInputBoundary: CreateTaskControllerInputBoundary;
    private updateTaskInputBoundary: UpdateTaskControllerInputBoundary;
    private deleteTaskInputBoundary: DeleteTaskControllerInputBoundary;
    private listTaskByIdInputBoundary: ListTaskByIdControllerInputBoundary;

    constructor(
        createTaskInputBoundary: CreateTaskControllerInputBoundary,
        updateTaskInputBoundary: UpdateTaskControllerInputBoundary,
        deleteTaskInputBoundary: DeleteTaskControllerInputBoundary,
        listTaskByIdInputBoundary: ListTaskByIdControllerInputBoundary
    ) {
        this.createTaskInputBoundary = createTaskInputBoundary;
        this.updateTaskInputBoundary = updateTaskInputBoundary;
        this.deleteTaskInputBoundary = deleteTaskInputBoundary;
        this.listTaskByIdInputBoundary = listTaskByIdInputBoundary;
    }

    async insert(request: FastifyRequest, reply: FastifyReply) {
        try {
            const task = await this.createTaskInputBoundary.create(
                insertTaskSchema.parse(request.body)
            );

            reply.status(201).send(
                new StandardResponseSuccess({
                    content: task,
                    status: 201,
                    message: "Tarefa criada com sucesso",
                })
            );
        } catch (error) {
            const { message, status } = this.formatError(error);
            reply.status(status).send(
                new StandardResponseError({
                    message,
                    status,
                })
            );
        }
    }

    async update(
        request: FastifyRequest<{
            Params: RequestParamsId;
        }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const task = await this.updateTaskInputBoundary.update({
                ...updateTaskSchema.parse(request.body),
                id: taskIdSchema.parse(id),
            });

            reply.status(200).send(
                new StandardResponseSuccess({
                    content: task,
                    status: 200,
                    message: "Tarefa alterada com sucesso",
                })
            );
        } catch (error) {
            const { message, status } = this.formatError(error);
            reply.status(status).send(
                new StandardResponseError({
                    message,
                    status,
                })
            );
        }
    }

    async findById(
        request: FastifyRequest<{ Params: RequestParamsId }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const task = await this.listTaskByIdInputBoundary.listById(
                taskIdSchema.parse(id)
            );

            reply.status(200).send(
                new StandardResponseSuccess({
                    content: task,
                    status: 200,
                    message: "Tarefa encontrada com sucesso",
                })
            );
        } catch (error) {
            const { message, status } = this.formatError(error);
            reply.status(status).send(
                new StandardResponseError({
                    message,
                    status,
                })
            );
        }
    }

    async delete(
        request: FastifyRequest<{ Params: RequestParamsId }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            await this.deleteTaskInputBoundary.delete(taskIdSchema.parse(id));

            reply.status(204).send();
        } catch (error) {
            const { message, status } = this.formatError(error);
            reply.status(status).send(
                new StandardResponseError({
                    message,
                    status,
                })
            );
        }
    }

    private formatError(error: unknown): { message: string; status: number } {
        if (error instanceof InvalidAttributeException) {
            return {
                message: error.message,
                status: 400,
            };
        }

        if (error instanceof ResourceNotFoundException) {
            return {
                message: error.message,
                status: 404,
            };
        }

        if (error instanceof ZodError) {
            return {
                message: error.issues[0].message,
                status: 400,
            };
        }

        return {
            message: `Erro interno: ${JSON.stringify(error)}`,
            status: 500,
        };
    }
}

export { TaskController };
