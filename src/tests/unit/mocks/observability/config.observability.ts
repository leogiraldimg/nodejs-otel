const logLevelMock = "debug";

jest.mock("@/infra/observability/config.observability", () => ({
    LOG_LEVEL: logLevelMock,
}));

export { logLevelMock };
