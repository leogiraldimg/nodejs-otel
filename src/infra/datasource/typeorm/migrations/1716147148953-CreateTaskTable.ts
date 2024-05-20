import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskTable1716147148953 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "char",
                        length: "36",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "title",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["todo", "inProgress", "done"],
                        isNullable: false,
                    },
                    {
                        name: "priority",
                        type: "enum",
                        enum: ["low", "medium", "high", "critical"],
                        isNullable: false,
                    },
                    {
                        name: "due_date",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }
}
