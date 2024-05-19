class ListTaskByIdNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ListTaskByIdNotFoundException";
    }
}

export { ListTaskByIdNotFoundException };
