import {
    ListTaskByIdDsGateway,
    ListTaskByIdOutputBoundary,
    ListTaskByIdInputBoundary,
    ListTaskByIdResponseModel,
    ListTaskByIdNotFoundException,
} from ".";

class ListTaskByIdInteractor implements ListTaskByIdInputBoundary {
    private dsGateway: ListTaskByIdDsGateway;
    private outputBoundary: ListTaskByIdOutputBoundary;

    constructor(
        dsGateway: ListTaskByIdDsGateway,
        outputBoundary: ListTaskByIdOutputBoundary
    ) {
        this.dsGateway = dsGateway;
        this.outputBoundary = outputBoundary;
    }

    async listById(id: string): Promise<ListTaskByIdResponseModel> {
        const task = await this.dsGateway.getById(id);

        if (!task) {
            return this.outputBoundary.presentListTaskByIdNotFound(
                new ListTaskByIdNotFoundException(
                    `Tarefa com id ${id} não encontrada`
                )
            );
        }

        return this.outputBoundary.presentSuccess(
            new ListTaskByIdResponseModel(task)
        );
    }
}

export { ListTaskByIdInteractor };
