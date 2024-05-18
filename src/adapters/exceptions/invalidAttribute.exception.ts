class InvalidAttributeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidAttributeException";
    }
}

export { InvalidAttributeException };
