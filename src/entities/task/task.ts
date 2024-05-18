class Task {
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;

    constructor(params: {
        title: string;
        description: string;
        status: "todo" | "inProgress" | "done";
        priority: "low" | "medium" | "high" | "critical";
        dueDate: Date;
    }) {
        const { description, dueDate, priority, status, title } = params;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    isTitleValid(): boolean {
        return this.title.length > 0;
    }

    isDescriptionValid(): boolean {
        return this.description.length > 0;
    }

    isDueDateValid(): boolean {
        return this.dueDate > new Date();
    }
}

export { Task };
