import { z } from "zod";

const OTEL_SERVICE_NAME = z
    .string({
        required_error: "Variável de ambiente OTEL_SERVICE_NAME é obrigatória",
    })
    .parse(process.env.OTEL_SERVICE_NAME);
const OTEL_SERVICE_VERSION = z
    .string({
        required_error:
            "Variável de ambiente OTEL_SERVICE_VERSION é obrigatória",
    })
    .parse(process.env.OTEL_SERVICE_VERSION);
const OTEL_OTLP_TRACES_EXPORTER_URL = z
    .string({
        required_error:
            "Variável de ambiente OTEL_OTLP_TRACES_EXPORTER_URL é obrigatória",
    })
    .url({
        message:
            "Variável de ambiente OTEL_OTLP_TRACES_EXPORTER_URL deve ser uma URL válida",
    })
    .parse(process.env.OTEL_OTLP_TRACES_EXPORTER_URL);
const OTEL_OTLP_LOGS_EXPORTER_URL = z
    .string({
        required_error:
            "Variável de ambiente OTEL_OTLP_LOGS_EXPORTER_URL é obrigatória",
    })
    .url({
        message:
            "Variável de ambiente OTEL_OTLP_LOGS_EXPORTER_URL deve ser uma URL válida",
    })
    .parse(process.env.OTEL_OTLP_LOGS_EXPORTER_URL);

const OTEL_OTLP_METRICS_EXPORTER_URL = z
    .string({
        required_error:
            "Variável de ambiente OTEL_OTLP_METRICS_EXPORTER_URL é obrigatória",
    })
    .url({
        message:
            "Variável de ambiente OTEL_OTLP_METRICS_EXPORTER_URL deve ser uma URL válida",
    })
    .parse(process.env.OTEL_OTLP_METRICS_EXPORTER_URL);

export {
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
    OTEL_OTLP_TRACES_EXPORTER_URL,
    OTEL_OTLP_LOGS_EXPORTER_URL,
    OTEL_OTLP_METRICS_EXPORTER_URL,
};
