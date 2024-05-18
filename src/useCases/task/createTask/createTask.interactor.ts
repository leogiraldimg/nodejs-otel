import {
    CreateTaskInputBoundary,
    CreateTaskRequestModel,
    CreateTaskResponseModel,
    CreateTaskDsGateway,
    CreateTaskDsRequestModel,
    CreateTaskOutputBoundary,
    CreateTaskInvalidAttributeException,
} from ".";
import { Task } from "@/entities/task";

class CreateTaskInteractor implements CreateTaskInputBoundary {
    private dsGateway: CreateTaskDsGateway;
    private outputBoundary: CreateTaskOutputBoundary;

    constructor(
        dsGateway: CreateTaskDsGateway,
        outputBoundary: CreateTaskOutputBoundary
    ) {
        this.dsGateway = dsGateway;
        this.outputBoundary = outputBoundary;
    }

    async create(
        requestModel: CreateTaskRequestModel
    ): Promise<CreateTaskResponseModel> {
        const task = new Task(requestModel);

        if (!task.isTitleValid()) {
            return this.outputBoundary.presentCreateTaskInvalidTitle(
                new CreateTaskInvalidAttributeException(
                    "Título da tarefa inválido"
                )
            );
        }

        if (!task.isDescriptionValid()) {
            return this.outputBoundary.presentCreateTaskInvalidDescription(
                new CreateTaskInvalidAttributeException(
                    "Descricão da tarefa inválida"
                )
            );
        }

        if (!task.isDueDateValid()) {
            return this.outputBoundary.presentCreateTaskInvalidDueDate(
                new CreateTaskInvalidAttributeException(
                    "Data de vencimento inválida"
                )
            );
        }

        const savedTask = await this.dsGateway.save(
            new CreateTaskDsRequestModel(task)
        );

        return this.outputBoundary.presentSuccess(
            new CreateTaskResponseModel(savedTask)
        );
    }
}

export { CreateTaskInteractor };
