class UpdateTaskRequestModel {
    id: string;
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;

    constructor(params: {
        id: string;
        title: string;
        description: string;
        status: "todo" | "inProgress" | "done";
        priority: "low" | "medium" | "high" | "critical";
        dueDate: Date;
    }) {
        const { description, dueDate, id, priority, status, title } = params;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.id = id;
    }
}

export { UpdateTaskRequestModel };
