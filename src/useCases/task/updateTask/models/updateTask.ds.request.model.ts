class UpdateTaskDsRequestModel {
    id: string;
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    createdAt: Date;

    constructor(params: {
        id: string;
        title: string;
        description: string;
        status: "todo" | "inProgress" | "done";
        priority: "low" | "medium" | "high" | "critical";
        dueDate: Date;
        createdAt?: Date;
    }) {
        const { createdAt, description, dueDate, id, priority, status, title } =
            params;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt || new Date();
        this.id = id;
    }
}

export { UpdateTaskDsRequestModel };
