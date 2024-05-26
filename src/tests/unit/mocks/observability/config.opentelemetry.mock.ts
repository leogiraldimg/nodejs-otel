const otelServiceNameMock = "service-name";
const otelServiceVersionMock = "service-version";
const otelOtlpTracesExporterUrlMock = "http://localhost:5000/traces";
const otelOtlpLogsExporterUrlMock = "http://localhost:5000/logs";
const otelOtlpMetricsExporterUrlMock = "http://localhost:5000/metrics";

jest.mock("@/infra/observability/opentelemetry/config.opentelemetry", () => ({
    OTEL_SERVICE_NAME: otelServiceNameMock,
    OTEL_SERVICE_VERSION: otelServiceVersionMock,
    OTEL_OTLP_TRACES_EXPORTER_URL: otelOtlpTracesExporterUrlMock,
    OTEL_OTLP_LOGS_EXPORTER_URL: otelOtlpLogsExporterUrlMock,
    OTEL_OTLP_METRICS_EXPORTER_URL: otelOtlpMetricsExporterUrlMock,
}));

export {
    otelServiceNameMock,
    otelServiceVersionMock,
    otelOtlpTracesExporterUrlMock,
    otelOtlpLogsExporterUrlMock,
    otelOtlpMetricsExporterUrlMock,
};
