import "dotenv/config";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";

import { dsTypeorm } from "@/infra/datasource/typeorm";

import { fastify } from "@/app";

describe("Task::CreateTask::integration", () => {
    let dsConnected: DataSource;

    let title: string;
    let description: string;
    let dueDate: Date;
    let priority: string;
    let status: string;

    beforeAll(async () => {
        dsConnected = await dsTypeorm.initialize();
    });

    beforeEach(async () => {
        await runSeeders(dsConnected);

        title = "Task 1";
        description = "Task 1 description";
        dueDate = new Date(Date.now() + 3600000);
        priority = "low";
        status = "todo";
    });

    afterAll(async () => {
        await dsConnected.destroy();
    });

    it("should return 201 and created task", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description,
                dueDate,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(201);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(201);
        expect(response.json().error).toBeFalsy();
        expect(response.json().message).toBe("Tarefa criada com sucesso");
        expect(response.json().content.id).toBeDefined();
        expect(response.json().content.title).toBe(title);
        expect(response.json().content.description).toBe(description);
        expect(response.json().content.dueDate).toBe(dueDate.toISOString());
        expect(response.json().content.priority).toBe(priority);
        expect(response.json().content.status).toBe(status);
    });

    it("should return 400 when title is not given", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                description,
                dueDate,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe("Título é obrigatório");
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when title is empty", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title: "",
                description,
                dueDate,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe("Título da tarefa inválido");
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when description is not given", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                dueDate,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe("Descrição é obrigatória");
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when description is empty", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description: "",
                dueDate,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe("Descrição da tarefa inválida");
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when dueDate is not given", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description,
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe(
            "Data de vencimento é obrigatória"
        );
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when dueDate is in the past", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description,
                dueDate: new Date(Date.now() - 3600000),
                priority,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe("Data de vencimento inválida");
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when priority is not given", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description,
                dueDate,
                status,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe(
            "Prioridade deve ser 'low', 'medium' ou 'high'"
        );
        expect(response.json().content).toBeNull();
    });

    it("should return 400 when status is not given", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/tasks",
            body: {
                title,
                description,
                dueDate,
                priority,
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json().timestamp).toBeDefined();
        expect(response.json().status).toBe(400);
        expect(response.json().error).toBeTruthy();
        expect(response.json().message).toBe(
            "Status deve ser 'todo', 'inProgress' ou 'done'"
        );
        expect(response.json().content).toBeNull();
    });
});
