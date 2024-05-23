import { z } from "zod";

const updateTaskSchema = z.object({
    title: z.string({ required_error: "Título é obrigatório" }),
    description: z.string({ required_error: "Descrição é obrigatória" }),
    status: z.enum(["todo", "inProgress", "done"], {
        message: "Status deve ser 'todo', 'inProgress' ou 'done'",
    }),
    priority: z.enum(["low", "medium", "high"], {
        message: "Prioridade deve ser 'low', 'medium' ou 'high'",
    }),
    dueDate: z
        .string({ message: "Data de vencimento é obrigatória" })
        .datetime("Data deve ser no formato YYYY-MM-DDTHH:MM:SSZ")
        .transform((date) => new Date(date)),
});

export { updateTaskSchema };
