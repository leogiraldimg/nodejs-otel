import { z } from "zod";
import { config } from "dotenv";
import { DataSource } from "typeorm";

if (process.env.NODE_ENV !== "production") {
    config();
}

const dsTypeorm = new DataSource({
    type: z
        .enum(["mysql", "postgres", "mongodb"])
        .parse(process.env.DATABASE_TYPE),
    host: z.string().parse(process.env.DATABASE_HOST),
    port: z
        .string()
        .transform((value) => parseInt(value))
        .parse(process.env.DATABASE_PORT),
    username: z.string().parse(process.env.DATABASE_USERNAME),
    password: z.string().parse(process.env.DATABASE_PASSWORD),
    database: z.string().parse(process.env.DATABASE_NAME),
    synchronize: process.env.NODE_ENV === "test" ? true : false,
    entities: [`${__dirname}/*/*.dataMapper.*{.js,.ts}`],
    migrations:
        process.env.NODE_ENV === "test"
            ? []
            : [`${__dirname}/migrations/*{.js,.ts}`],
});

export { dsTypeorm };
