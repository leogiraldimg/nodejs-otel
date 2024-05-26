import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

import {
    OTEL_SERVICE_NAME,
    OTEL_SERVICE_VERSION,
    OTEL_OTLP_TRACES_EXPORTER_URL,
    OTEL_OTLP_LOGS_EXPORTER_URL,
    OTEL_OTLP_METRICS_EXPORTER_URL,
} from ".";

class OpenTelemetry {
    sdk: NodeSDK;

    constructor() {
        this.sdk = new NodeSDK({
            resource: new Resource({
                [SEMRESATTRS_SERVICE_NAME]: OTEL_SERVICE_NAME,
                [SEMRESATTRS_SERVICE_VERSION]: OTEL_SERVICE_VERSION,
            }),
            traceExporter: new OTLPTraceExporter({
                url: OTEL_OTLP_TRACES_EXPORTER_URL,
            }),
            logRecordProcessor: new BatchLogRecordProcessor(
                new OTLPLogExporter({
                    url: OTEL_OTLP_LOGS_EXPORTER_URL,
                })
            ),
            metricReader: new PeriodicExportingMetricReader({
                exporter: new OTLPMetricExporter({
                    url: OTEL_OTLP_METRICS_EXPORTER_URL,
                }),
            }),
        });
    }

    startSdk() {
        this.sdk.start();
    }
}

export { OpenTelemetry };
