import "reflect-metadata";
import Fastify from "fastify";
import { config } from "dotenv";
import cors from "@fastify/cors";
import { runSeeders } from "typeorm-extension";

if (process.env.NODE_ENV !== "production") {
    config();
}

import { TaskController, RequestParamsId } from "@/infra/web/fastify/task";
import {
    CreateTaskDsTypeorm,
    DeleteTaskDsTypeorm,
    ListTaskByIdDsTypeorm,
    TaskDataMapperTypeorm,
    TaskRepositoryTypeorm,
    UpdateTaskDsTypeorm,
    dsTypeorm,
} from "@/infra/datasource/typeorm";
import {
    CreateTaskController,
    CreateTaskPresenter,
    DeleteTaskController,
    DeleteTaskPresenter,
    ListTaskByIdController,
    ListTaskByIdPresenter,
    UpdateTaskController,
    UpdateTaskPresenter,
} from "@/adapters/task";
import {
    CreateTaskInteractor,
    DeleteTaskInteractor,
    ListTaskByIdInteractor,
    UpdateTaskInteractor,
} from "@/useCases/task";
import {
    OpenTelemetry,
    LoggerOpenTelemetry,
} from "@/infra/observability/opentelemetry";

if (process.env.NODE_ENV !== "test") {
    const otel = new OpenTelemetry();
    otel.startSdk();
}

const logger = new LoggerOpenTelemetry();

if (process.env.NODE_ENV !== "test") {
    dsTypeorm
        .initialize()
        .then(async (ds) => {
            logger.info(
                "Conexão com o banco de dados estabelecida com sucesso!"
            );

            if (process.env.NODE_ENV === "development") {
                logger.info("Executando seeders...");
                await runSeeders(ds);
                logger.info("Seeders executados com sucesso!");
            }
        })
        .catch((error) => {
            logger.fatal(
                `Erro ao estabelecer a conexão com o banco de dados: ${error}`
            );
            process.exit(1);
        });
}

const fastify = Fastify({
    logger: process.env.NODE_ENV !== "test" ? logger : false,
});

fastify.register(cors);

const taskController = new TaskController(
    new CreateTaskController(
        new CreateTaskInteractor(
            new CreateTaskDsTypeorm(
                new TaskRepositoryTypeorm(
                    TaskDataMapperTypeorm,
                    dsTypeorm.createEntityManager()
                )
            ),
            new CreateTaskPresenter()
        )
    ),
    new UpdateTaskController(
        new UpdateTaskInteractor(
            new UpdateTaskDsTypeorm(
                new TaskRepositoryTypeorm(
                    TaskDataMapperTypeorm,
                    dsTypeorm.createEntityManager()
                )
            ),
            new UpdateTaskPresenter()
        )
    ),
    new DeleteTaskController(
        new DeleteTaskInteractor(
            new DeleteTaskDsTypeorm(
                new TaskRepositoryTypeorm(
                    TaskDataMapperTypeorm,
                    dsTypeorm.createEntityManager()
                )
            ),
            new DeleteTaskPresenter()
        )
    ),
    new ListTaskByIdController(
        new ListTaskByIdInteractor(
            new ListTaskByIdDsTypeorm(
                new TaskRepositoryTypeorm(
                    TaskDataMapperTypeorm,
                    dsTypeorm.createEntityManager()
                )
            ),
            new ListTaskByIdPresenter()
        )
    )
);

fastify.post("/tasks", async (request, reply) => {
    await taskController.insert(request, reply);
});
fastify.get<{ Params: RequestParamsId }>(
    "/tasks/:id",
    async (request, reply) => {
        await taskController.findById(request, reply);
    }
);
fastify.put<{ Params: RequestParamsId }>(
    "/tasks/:id",
    async (request, reply) => {
        await taskController.update(request, reply);
    }
);
fastify.delete<{ Params: RequestParamsId }>(
    "/tasks/:id",
    async (request, reply) => {
        await taskController.delete(request, reply);
    }
);

if (process.env.NODE_ENV !== "test") {
    const port = parseInt(process.env.PORT ?? "3000");
    fastify
        .listen({
            port,
        })
        .then(() => {
            logger.info(`Servidor iniciado na porta ${port}`);
        })
        .catch((error) => {
            logger.fatal(`Erro ao iniciar o servidor: ${error}`);
            process.exit(1);
        });
}

export { fastify };
