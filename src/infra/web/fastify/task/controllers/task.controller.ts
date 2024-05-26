import { ZodError } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import opentelemetry, {
    ContextAPI,
    Meter,
    Tracer,
    ValueType,
} from "@opentelemetry/api";

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
import {
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
} from "@/infra/observability/opentelemetry";

class TaskController {
    private createTaskInputBoundary: CreateTaskControllerInputBoundary;
    private updateTaskInputBoundary: UpdateTaskControllerInputBoundary;
    private deleteTaskInputBoundary: DeleteTaskControllerInputBoundary;
    private listTaskByIdInputBoundary: ListTaskByIdControllerInputBoundary;

    private tracer: Tracer;
    private meter: Meter;
    private context: ContextAPI;

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

        this.tracer = opentelemetry.trace.getTracer(
            OTEL_SERVICE_NAME,
            OTEL_SERVICE_VERSION
        );
        this.meter = opentelemetry.metrics.getMeter(
            OTEL_SERVICE_NAME,
            OTEL_SERVICE_VERSION
        );
        this.context = opentelemetry.context;
    }

    async insert(request: FastifyRequest, reply: FastifyReply) {
        await this.tracer.startActiveSpan(
            "TaskController.insert",
            {},
            this.context.active(),
            async (span) => {
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
                } finally {
                    span.end();
                }
            }
        );
    }

    async update(
        request: FastifyRequest<{
            Params: RequestParamsId;
        }>,
        reply: FastifyReply
    ) {
        await this.tracer.startActiveSpan(
            "TaskController.update",
            {},
            this.context.active(),
            async (span) => {
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
                } finally {
                    span.end();
                }
            }
        );
    }

    async findById(
        request: FastifyRequest<{ Params: RequestParamsId }>,
        reply: FastifyReply
    ) {
        await this.tracer.startActiveSpan(
            "TaskController.findById",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const histogram = this.meter.createHistogram(
                        "task.findById.duration",
                        {
                            description: "Task findById duration",
                            unit: "milliseconds",
                            valueType: ValueType.INT,
                        }
                    );
                    const startTime = new Date().getTime();

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

                    const endTime = new Date().getTime();
                    histogram.record(endTime - startTime);
                } catch (error) {
                    const { message, status } = this.formatError(error);
                    reply.status(status).send(
                        new StandardResponseError({
                            message,
                            status,
                        })
                    );
                } finally {
                    span.end();
                }
            }
        );
    }

    async delete(
        request: FastifyRequest<{ Params: RequestParamsId }>,
        reply: FastifyReply
    ) {
        await this.tracer.startActiveSpan(
            "TaskController.delete",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const { id } = request.params;
                    await this.deleteTaskInputBoundary.delete(
                        taskIdSchema.parse(id)
                    );

                    reply.status(204).send();
                } catch (error) {
                    const { message, status } = this.formatError(error);
                    reply.status(status).send(
                        new StandardResponseError({
                            message,
                            status,
                        })
                    );
                } finally {
                    span.end();
                }
            }
        );
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
