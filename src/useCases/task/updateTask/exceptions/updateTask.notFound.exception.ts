class UpdateTaskNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UpdateTaskNotFoundException";
    }
}

export { UpdateTaskNotFoundException };
