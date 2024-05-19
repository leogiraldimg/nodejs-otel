class UpdateTaskInvalidAttributeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UpdateTaskInvalidAttributeException";
    }
}

export { UpdateTaskInvalidAttributeException };
