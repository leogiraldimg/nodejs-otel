const updateTaskOutputBoundaryMock = {
    presentSuccess: jest.fn(),
    presentUpdateTaskInvalidTitle: jest.fn(),
    presentUpdateTaskInvalidDueDate: jest.fn(),
    presentUpdateTaskInvalidDescription: jest.fn(),
    presentUpdateTaskNotFound: jest.fn(),
};

export { updateTaskOutputBoundaryMock };
