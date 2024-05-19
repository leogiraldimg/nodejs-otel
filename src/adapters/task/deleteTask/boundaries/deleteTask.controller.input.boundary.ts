interface DeleteTaskControllerInputBoundary {
    delete(id: string): Promise<void>;
}

export { DeleteTaskControllerInputBoundary };
