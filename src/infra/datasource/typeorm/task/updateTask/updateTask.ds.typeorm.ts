import opentelemetry, {
    ContextAPI,
    SpanStatusCode,
    Tracer,
} from "@opentelemetry/api";

import {
    LoggerOpenTelemetry,
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
} from "@/infra/observability/opentelemetry";
import { TaskRepositoryTypeorm } from "..";
import {
    UpdateTaskDsGateway,
    UpdateTaskDsRequestModel,
    UpdateTaskDsResponseModel,
} from "@/useCases/task";

class UpdateTaskDsTypeorm implements UpdateTaskDsGateway {
    private repository: TaskRepositoryTypeorm;

    private tracer: Tracer;
    private context: ContextAPI;
    private logger: LoggerOpenTelemetry;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;

        this.tracer = opentelemetry.trace.getTracer(
            OTEL_SERVICE_NAME,
            OTEL_SERVICE_VERSION
        );
        this.context = opentelemetry.context;
        this.logger = new LoggerOpenTelemetry();
    }

    async getById(id: string): Promise<UpdateTaskDsResponseModel | null> {
        return this.tracer.startActiveSpan(
            "UpdateTaskDsTypeorm.getById",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const entity = await this.repository.findOneBy({ id });

                    span.end();

                    return entity && new UpdateTaskDsResponseModel(entity);
                } catch (error) {
                    const message = `Erro ao tentar consultar tarefa com id ${id}. ${error}`;
                    this.logger.error(message);
                    span.recordException(message);
                    span.setStatus({ code: SpanStatusCode.ERROR, message });
                    span.end();

                    throw error;
                }
            }
        );
    }

    async update(
        requestModel: UpdateTaskDsRequestModel
    ): Promise<UpdateTaskDsResponseModel> {
        return this.tracer.startActiveSpan(
            "UpdateTaskDsTypeorm.getById",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const entity = await this.repository.findOneByOrFail({
                        id: requestModel.id,
                    });

                    entity.title = requestModel.title;
                    entity.description = requestModel.description;
                    entity.status = requestModel.status;
                    entity.priority = requestModel.priority;
                    entity.dueDate = requestModel.dueDate;
                    entity.updatedAt = new Date();

                    await this.repository.save(entity);

                    this.logger.info(
                        `Tarefa com id ${entity.id} alterada com sucesso`
                    );
                    span.addEvent(
                        `Tarefa com id ${entity.id} alterada com sucesso`
                    );
                    span.end();

                    return new UpdateTaskDsResponseModel(entity);
                } catch (error) {
                    const message = `Erro ao tentar alterar tarefa com id ${requestModel.id}. ${error}`;
                    this.logger.error(message);
                    span.recordException(message);
                    span.setStatus({ code: SpanStatusCode.ERROR, message });
                    span.end();

                    throw error;
                }
            }
        );
    }
}

export { UpdateTaskDsTypeorm };
