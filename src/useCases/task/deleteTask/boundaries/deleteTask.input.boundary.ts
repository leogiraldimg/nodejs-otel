interface DeleteTaskInputBoundary {
    delete(id: string): Promise<void>;
}

export { DeleteTaskInputBoundary };
