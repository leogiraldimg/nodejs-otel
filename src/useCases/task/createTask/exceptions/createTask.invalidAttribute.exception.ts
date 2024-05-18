class CreateTaskInvalidAttributeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateTaskInvalidAttributeException";
    }
}

export { CreateTaskInvalidAttributeException };
