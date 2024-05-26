import opentelemetry, {
    ContextAPI,
    SpanStatusCode,
    Tracer,
} from "@opentelemetry/api";

import { TaskRepositoryTypeorm } from "..";
import { DeleteTaskDsGateway } from "@/useCases/task";
import {
    LoggerOpenTelemetry,
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
} from "@/infra/observability/opentelemetry";

class DeleteTaskDsTypeorm implements DeleteTaskDsGateway {
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

    async existsById(id: string): Promise<boolean> {
        return this.tracer.startActiveSpan(
            "DeleteTaskDsTypeorm.existsById",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const task = await this.repository.findOneBy({ id });

                    span.end();

                    return !!task;
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

    async remove(id: string): Promise<void> {
        await this.tracer.startActiveSpan(
            "DeleteTaskDsTypeorm.remove",
            {},
            this.context.active(),
            async (span) => {
                try {
                    const task = await this.repository.findOneByOrFail({ id });

                    await this.repository.remove(task);

                    this.logger.info(
                        `Tarefa com id ${id} removida com sucesso`
                    );
                    span.addEvent(`Tarefa com id ${id} removida com sucesso`);
                    span.end();
                } catch (error) {
                    const message = `Erro ao tentar remover tarefa com id ${id}. ${error}`;
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

export { DeleteTaskDsTypeorm };
