import { z } from "zod";

const taskIdSchema = z
    .string({ required_error: "Id da tarefa é obrigatório" })
    .uuid({ message: "Id da tarefa deve ser um UUID válido" });

export { taskIdSchema };
