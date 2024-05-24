import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";

import { TaskDataMapperTypeorm, dsTypeorm } from "@/infra/datasource/typeorm";

import { fastify } from "@/app";

describe("listTaskById", () => {
    let dsConnected: DataSource;

    let existingTask: TaskDataMapperTypeorm;
    let existingTaskId: string;
    let nonExistingTaskId: string;

    beforeAll(async () => {
        dsConnected = await dsTypeorm.initialize();

        await runSeeders(dsConnected);
    });

    beforeEach(async () => {
        await runSeeders(dsConnected);

        const existingTasks = await dsConnected
            .getRepository(TaskDataMapperTypeorm)
            .find({});
        existingTask = existingTasks[0];
        existingTaskId = existingTask.id;
        nonExistingTaskId = uuidv4();
    });

    afterAll(async () => {
        await dsConnected.destroy();
    });

    it("should return 200 and task", async () => {
        const response = await fastify.inject({
            method: "GET",
            url: `/tasks/${existingTaskId}`,
        });

        expect(response.statusCode).toBe(200);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(200);
        expect(response.json().error).toBeFalsy();
        expect(response.json().message).toBe("Tarefa encontrada com sucesso");
        expect(response.json().content.id).toBe(existingTaskId);
        expect(response.json().content.title).toBe(existingTask.title);
        expect(response.json().content.description).toBe(
            existingTask.description
        );
        expect(response.json().content.dueDate).toBe(
            existingTask.dueDate.toISOString()
        );
        expect(response.json().content.priority).toBe(existingTask.priority);
        expect(response.json().content.status).toBe(existingTask.status);
    });

    it("should return 404 when task does not exist", async () => {
        const response = await fastify.inject({
            method: "GET",
            url: `/tasks/${nonExistingTaskId}`,
        });

        expect(response.statusCode).toBe(404);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(404);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe(
            `Tarefa com id ${nonExistingTaskId} não encontrada`
        );
        expect(response.json().content).toBeNull();
    });
});
