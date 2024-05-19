class DeleteTaskNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeleteTaskNotFoundException";
    }
}

export { DeleteTaskNotFoundException };
