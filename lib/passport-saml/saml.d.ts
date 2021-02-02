/// <reference types="node" />
import * as xml2js from 'xml2js';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import { CacheProvider as InMemoryCacheProvider } from './inmemory-cache-provider';
import type { Request } from 'express';
import { ParsedQs } from 'qs';
import { AudienceRestrictionXML, AuthenticateOptions, AuthorizeOptions, Profile, RequestWithUser, SAMLOptions, XMLOutput } from './types';
declare class SAML {
    options: SAMLOptions;
    cacheProvider: InMemoryCacheProvider;
    constructor(options: Partial<SAMLOptions>);
    initialize(options: Partial<SAMLOptions>): SAMLOptions;
    getProtocol(req: Request | {
        headers?: undefined;
        protocol?: undefined;
    }): string;
    getCallbackUrl(req: Request | {
        headers?: undefined;
        protocol?: undefined;
    }): string;
    generateUniqueID(): string;
    generateInstant(): string;
    signRequest(samlMessage: querystring.ParsedUrlQueryInput): void;
    generateAuthorizeRequest(req: Request, isPassive: boolean, isHttpPostBinding: boolean, callback: (err: Error | null, request?: string) => void): void;
    generateLogoutRequest(req: RequestWithUser): Promise<string>;
    generateLogoutResponse(req: Request, logoutRequest: Profile): string;
    requestToUrl(request: string | null | undefined, response: string | null, operation: string, additionalParameters: querystring.ParsedUrlQuery, callback: (err: Error | null, url?: string | null | undefined) => void): void;
    getAdditionalParams(req: Request, operation: string, overrideParams?: querystring.ParsedUrlQuery): querystring.ParsedUrlQuery;
    getAuthorizeUrl(req: Request, options: AuthenticateOptions & AuthorizeOptions, callback: (err: Error | null, url?: string | null) => void): void;
    getAuthorizeForm(req: Request, callback: (err: Error | null, data?: unknown) => void): void;
    getLogoutUrl(req: RequestWithUser, options: AuthenticateOptions & AuthorizeOptions, callback: (err: Error | null, url?: string | null) => void): Promise<void>;
    getLogoutResponseUrl(req: RequestWithUser, options: AuthenticateOptions & AuthorizeOptions, callback: (err: Error | null, url?: string | null) => void): void;
    certToPEM(cert: string): string;
    certsToCheck(): Promise<undefined | string[]>;
    validateSignature(fullXml: string, currentNode: HTMLElement, certs: string[]): boolean;
    validateSignatureForCert(signature: string | Node, cert: string, fullXml: string, currentNode: HTMLElement): boolean;
    validatePostResponse(container: Record<string, string>, callback: (err: Error | null, profile?: Profile | null, loggedOut?: boolean) => void): void;
    validateInResponseTo(inResponseTo: string | null): Promise<void>;
    validateRedirect(container: ParsedQs, originalQuery: string | null, callback: (err: Error | null, profile?: Profile | null, loggedOut?: boolean) => void): void;
    hasValidSignatureForRedirect(container: ParsedQs, originalQuery: string | null): Promise<boolean | void>;
    validateSignatureForRedirect(urlString: crypto.BinaryLike, signature: string, alg: string, cert: string): boolean;
    verifyLogoutRequest(doc: XMLOutput): void;
    verifyLogoutResponse(doc: XMLOutput): Promise<boolean | void>;
    verifyIssuer(samlMessage: XMLOutput): void;
    processValidlySignedAssertion(xml: xml2js.convertableToString, samlResponseXml: string, inResponseTo: string, callback: (err: Error | null, profile?: Profile | undefined, loggedOut?: boolean | undefined) => void): void;
    checkTimestampsValidityError(nowMs: number, notBefore: string, notOnOrAfter: string): Error | null;
    checkAudienceValidityError(expectedAudience: string, audienceRestrictions: AudienceRestrictionXML[]): Error | null;
    validatePostRequest(container: Record<string, string>, callback: (err: Error | null, profile?: Profile, loggedOut?: boolean) => void): void;
    getNameID(self: SAML, doc: Node, callback: (err: Error | null, nameID?: XMLOutput) => void): void | Promise<void>;
    generateServiceProviderMetadata(decryptionCert: string | null, signingCert?: string | null): string;
    keyToPEM(key: crypto.KeyLike): crypto.KeyLike;
    normalizeNewlines(xml: string): string;
}
export { SAML };
