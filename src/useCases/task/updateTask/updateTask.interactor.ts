import {
    UpdateTaskInputBoundary,
    UpdateTaskRequestModel,
    UpdateTaskResponseModel,
    UpdateTaskDsGateway,
    UpdateTaskDsRequestModel,
    UpdateTaskOutputBoundary,
    UpdateTaskInvalidAttributeException,
    UpdateTaskNotFoundException,
} from ".";
import { Task } from "@/entities/task";

class UpdateTaskInteractor implements UpdateTaskInputBoundary {
    private dsGateway: UpdateTaskDsGateway;
    private outputBoundary: UpdateTaskOutputBoundary;

    constructor(
        dsGateway: UpdateTaskDsGateway,
        outputBoundary: UpdateTaskOutputBoundary
    ) {
        this.dsGateway = dsGateway;
        this.outputBoundary = outputBoundary;
    }

    async update(
        requestModel: UpdateTaskRequestModel
    ): Promise<UpdateTaskResponseModel> {
        const task = new Task(requestModel);

        if (!task.isTitleValid()) {
            return this.outputBoundary.presentUpdateTaskInvalidTitle(
                new UpdateTaskInvalidAttributeException(
                    "Título da tarefa inválido"
                )
            );
        }

        if (!task.isDescriptionValid()) {
            return this.outputBoundary.presentUpdateTaskInvalidDescription(
                new UpdateTaskInvalidAttributeException(
                    "Descricão da tarefa inválida"
                )
            );
        }

        if (!task.isDueDateValid()) {
            return this.outputBoundary.presentUpdateTaskInvalidDueDate(
                new UpdateTaskInvalidAttributeException(
                    "Data de vencimento inválida"
                )
            );
        }

        const targetTask = await this.dsGateway.getById(requestModel.id);

        if (!targetTask) {
            return this.outputBoundary.presentUpdateTaskNotFound(
                new UpdateTaskNotFoundException(
                    `Tarefa com id ${requestModel.id} não encontrada`
                )
            );
        }

        const updatedTask = await this.dsGateway.update(
            new UpdateTaskDsRequestModel({ ...task, id: targetTask.id })
        );

        return this.outputBoundary.presentSuccess(
            new UpdateTaskResponseModel(updatedTask)
        );
    }
}

export { UpdateTaskInteractor };
