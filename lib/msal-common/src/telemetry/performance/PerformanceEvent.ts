/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export enum PerformanceEvents {
    AcquireTokenByCode = "acquireTokenByCode",
    AcquireTokenByRefreshToken = "acquireTokenByRefreshToken",
    AcquireTokenSilent = "acquireTokenSilent",
    AcquireTokenSilentAsync = "acquireTokenSilentAsync",
    CryptoOptsGetPublicKeyThumbprint = "cryptoOptsGetPublicKeyThumbprint",
    CryptoOptsSignJwt = "cryptoOptsSignJwt",
    SilentCacheClientAcquireToken = "silentCacheClientAcquireToken",
    SilentIframeClientAcquireToken = "silentIframeClientAcquireToken",
    SilentRefreshClientAcquireToken = "silentRefreshClientAcquireToken",
    SsoSilent = "ssoSilent",
    StandardInteractionClientGetDiscoveredAuthority = "standardInteractionClientGetDiscoveredAuthority"
}

export type PerformanceEvent = {
    authority: string,
    clientId: string
    correlationId?: string,
    durationMs: number,
    endPageVisibility?: string | null,
    fromCache: boolean | null,
    name: PerformanceEvents,
    startPageVisibility?: string | null,
    startTimeMs: number,
    success: boolean | null,
    libraryName: string,
    libraryVersion: string
};