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
    ListTaskByIdDsGateway,
    ListTaskByIdDsResponseModel,
} from "@/useCases/task";

class ListTaskByIdDsTypeorm implements ListTaskByIdDsGateway {
    private repository: TaskRepositoryTypeorm;

    private context: ContextAPI;
    private tracer: Tracer;
    private logger: LoggerOpenTelemetry;

    constructor(repository: TaskRepositoryTypeorm) {
        this.repository = repository;

        this.context = opentelemetry.context;
        this.tracer = opentelemetry.trace.getTracer(
            OTEL_SERVICE_NAME,
            OTEL_SERVICE_VERSION
        );
        this.logger = new LoggerOpenTelemetry();
    }

    async getById(id: string): Promise<ListTaskByIdDsResponseModel | null> {
        return this.tracer.startActiveSpan(
            "ListTaskByIdDsTypeorm.getById",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const entity = await this.repository.findOneBy({ id });

                    span.end();

                    return entity && new ListTaskByIdDsResponseModel(entity);
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
}

export { ListTaskByIdDsTypeorm };
