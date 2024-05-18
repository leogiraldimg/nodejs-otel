class CreateTaskDsRequestModel {
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    createdAt: Date;

    constructor(params: {
        title: string;
        description: string;
        status: "todo" | "inProgress" | "done";
        priority: "low" | "medium" | "high" | "critical";
        dueDate: Date;
        createdAt?: Date;
    }) {
        const { createdAt, description, dueDate, priority, status, title } =
            params;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt || new Date();
    }
}

export { CreateTaskDsRequestModel };
