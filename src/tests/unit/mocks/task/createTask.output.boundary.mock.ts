const createTaskOutputBoundaryMock = {
    presentSuccess: jest.fn(),
    presentCreateTaskInvalidTitle: jest.fn(),
    presentCreateTaskInvalidDueDate: jest.fn(),
    presentCreateTaskInvalidDescription: jest.fn(),
};

export { createTaskOutputBoundaryMock };
