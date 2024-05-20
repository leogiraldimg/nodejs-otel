import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tasks")
class TaskDataMapperTypeorm {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "title", type: "text", nullable: false })
    title: string;

    @Column({ name: "description", type: "text", nullable: false })
    description: string;

    @Column({
        name: "status",
        type: "enum",
        enum: ["todo", "inProgress", "done"],
        nullable: false,
    })
    status: "todo" | "inProgress" | "done";

    @Column({
        name: "priority",
        type: "enum",
        enum: ["low", "medium", "high", "critical"],
        nullable: false,
    })
    priority: "low" | "medium" | "high" | "critical";

    @Column({ name: "due_date", type: "timestamp", nullable: false })
    dueDate: Date;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        nullable: false,
    })
    createdAt: Date;

    @CreateDateColumn({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt: Date;
}

export { TaskDataMapperTypeorm };
