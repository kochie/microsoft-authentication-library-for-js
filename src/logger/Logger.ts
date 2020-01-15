/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// package.json
import pkg from "../../package.json";
// Utils
import { StringUtils } from "../utils/StringUtils";

/**
 * Options for logger messages.
 */
export type LoggerMessageOptions = {
    logLevel: LogLevel,
    correlationId?: string,
    containsPii?: boolean
};

/**
 * Log message level.
 */
export enum LogLevel {
    Error,
    Warning,
    Info,
    Verbose
};

/**
 * Callback to send the messages to.
 */
export interface ILoggerCallback {
    (level: LogLevel, message: string, containsPii: boolean): void;
}

/**
 * Class which facilitates logging of messages to a specific place.
 */
export class Logger {

    // Correlation ID for request, usually set by user.
    private correlationId: string;

    // Current log level, defaults to info.
    private level: LogLevel = LogLevel.Info;

    // Boolean describing whether PII logging is allowed.
    private piiLoggingEnabled: boolean;

    // Callback to send messages to.
    private localCallback: ILoggerCallback;

    constructor(localCallback: ILoggerCallback, piiLoggingEnabled: boolean) {
        this.localCallback = localCallback;
        this.piiLoggingEnabled = piiLoggingEnabled;
    }

    /**
     * Log message with required options.
     */
    private logMessage(logMessage: string, options: LoggerMessageOptions): void {
        if ((options.logLevel > this.level) || (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        const timestamp = new Date().toUTCString();
        let log: string;
        if (!StringUtils.isEmpty(this.correlationId)) {
            log = timestamp + ":" + this.correlationId + "-" + pkg.version + "-" + LogLevel[options.logLevel] + " " + logMessage;
        }
        else {
            log = timestamp + ":" + pkg.version + "-" + LogLevel[options.logLevel] + " " + logMessage;
        }
        this.executeCallback(options.logLevel, log, options.containsPii);
    }

    /**
     * Execute callback with message.
     */
    executeCallback(level: LogLevel, message: string, containsPii: boolean): void {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    }

    /**
     * Logs error messages.
     */
    error(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs error messages with PII.
     */
    errorPii(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs warning messages.
     */
    warning(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs warning messages with PII.
     */
    warningPii(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs info messages.
     */
    info(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs info messages with PII.
     */
    infoPii(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs verbose messages.
     */
    verbose(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || ""
        });
    }

    /**
     * Logs verbose messages with PII.
     */
    verbosePii(message: string, correlationId?: string): void {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || ""
        });
    }

    /**
     * Returns whether PII Logging is enabled or not.
     */
    isPiiLoggingEnabled(): boolean {
        return this.piiLoggingEnabled;
    }
}
