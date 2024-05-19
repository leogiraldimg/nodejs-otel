interface DeleteTaskDsGateway {
    existsById(id: string): Promise<boolean>;

    remove(id: string): Promise<void>;
}

export { DeleteTaskDsGateway };
