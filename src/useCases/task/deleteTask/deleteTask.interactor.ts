import {
    DeleteTaskDsGateway,
    DeleteTaskInputBoundary,
    DeleteTaskNotFoundException,
    DeleteTaskOutputBoundary,
} from ".";

class DeleteTaskInteractor implements DeleteTaskInputBoundary {
    private dsGateway: DeleteTaskDsGateway;

    private outputBoundary: DeleteTaskOutputBoundary;

    constructor(
        dsGateway: DeleteTaskDsGateway,
        outputBoundary: DeleteTaskOutputBoundary
    ) {
        this.dsGateway = dsGateway;
        this.outputBoundary = outputBoundary;
    }

    async delete(id: string): Promise<void> {
        if (!(await this.dsGateway.existsById(id))) {
            return this.outputBoundary.presentDeleteTaskNotFound(
                new DeleteTaskNotFoundException(
                    `Tarefa com id ${id} não encontrada`
                )
            );
        }

        await this.dsGateway.remove(id);

        return this.outputBoundary.presentSuccess();
    }
}

export { DeleteTaskInteractor };
