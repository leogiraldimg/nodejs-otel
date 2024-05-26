import opentelemetry, {
    ContextAPI,
    SpanStatusCode,
    Tracer,
} from "@opentelemetry/api";

import { TaskFactoryTypeorm, TaskRepositoryTypeorm } from "..";
import {
    CreateTaskDsGateway,
    CreateTaskDsRequestModel,
    CreateTaskDsResponseModel,
} from "@/useCases/task";
import {
    LoggerOpenTelemetry,
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
} from "@/infra/observability/opentelemetry";

class CreateTaskDsTypeorm implements CreateTaskDsGateway {
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

    async save(
        requestModel: CreateTaskDsRequestModel
    ): Promise<CreateTaskDsResponseModel> {
        return this.tracer.startActiveSpan(
            "CreateTaskDsTypeorm.save",
            {},
            this.context.active(),
            async (span) => {
                try {
                    let entity = TaskFactoryTypeorm.createTask(requestModel);
                    entity = await this.repository.save(entity);

                    this.logger.info(
                        `Tarefa com id ${entity.id} cadastrada com sucesso`
                    );
                    span.addEvent(
                        `Tarefa com id ${entity.id} cadastrada com sucesso`
                    );
                    span.end();

                    return new CreateTaskDsResponseModel(entity);
                } catch (error) {
                    const message = `Erro ao tentar criar tarefa. ${error}`;
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

export { CreateTaskDsTypeorm };
