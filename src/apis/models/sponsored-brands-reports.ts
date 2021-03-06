/* tslint:disable */
/* eslint-disable */
/**
 * Amazon Ads API for Sponsored Brands - Reports
 * Use this interface to request and retrieve performance reports. Use the POST method to request the report to be generated from the appropriate interface, the GET method to retrieve the report ID that was generated, and then download the actual report.  If you are trying to download a record of your campaign structure and all of its entities (like AdGroups, keywords), we recommended that you run a snapshot of your entities instead of requesting a list of all elements in the campaign. For more information, see snapshots.
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';
import { createRequestFunction } from "../../helpers";

/**
 * The error response object.
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     * The HTTP status code of the response.
     * @type {string}
     * @memberof ModelError
     */
    code?: string;
    /**
     * A human-readable description of the response.
     * @type {string}
     * @memberof ModelError
     */
    details?: string;
}
/**
 * 
 * @export
 * @interface ReportRequest
 */
export interface ReportRequest {
    /**
     * Date in YYYYMMDD format. The report contains only metrics generated on the specified date. Note that the time zone used for date calculation is the one associated with the profile used to make the request.
     * @type {string}
     * @memberof ReportRequest
     */
    reportDate?: string;
    /**
     * Set to video to request a Sponsored Brands video report.
     * @type {string}
     * @memberof ReportRequest
     */
    creativeType?: string;
    /**
     * Optional. Dimension on which to segment the report. See segmentation details in the following table.    -`placement` - The optional dimension on which to segment a campaigns report. Placement refers to the location on a page where your ad appears.    -`query` - The optional dimension on which to segment a keyword report. This is also referred to as the search terms report.
     * @type {string}
     * @memberof ReportRequest
     */
    segment?: ReportRequestSegmentEnum;
    /**
     * A comma-separated list of the metrics to be included in the report. See https://advertising.amazon.com/API/docs/en-us/reference/sponsored-brands/2/reports for a list of metrics
     * @type {string}
     * @memberof ReportRequest
     */
    metrics?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum ReportRequestSegmentEnum {
    Placement = 'placement',
    Query = 'query'
}

/**
 * 
 * @export
 * @interface ReportResponse
 */
export interface ReportResponse {
    /**
     * The identifier of the report.
     * @type {string}
     * @memberof ReportResponse
     */
    reportId?: string;
    /**
     * The type of report requested.
     * @type {string}
     * @memberof ReportResponse
     */
    recordType?: ReportResponseRecordTypeEnum;
    /**
     * The build status of the report.
     * @type {string}
     * @memberof ReportResponse
     */
    status?: ReportResponseStatusEnum;
    /**
     * A human-readable description of the current status.
     * @type {string}
     * @memberof ReportResponse
     */
    statusDetails?: string;
    /**
     * The URI location of the report.
     * @type {string}
     * @memberof ReportResponse
     */
    location?: string;
    /**
     * The size of the report file, in bytes.
     * @type {number}
     * @memberof ReportResponse
     */
    fileSize?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum ReportResponseRecordTypeEnum {
    Campaign = 'CAMPAIGN',
    AdGroup = 'AD_GROUP',
    Keyword = 'KEYWORD'
}
/**
    * @export
    * @enum {string}
    */
export enum ReportResponseStatusEnum {
    InProgress = 'IN_PROGRESS',
    Success = 'SUCCESS',
    Failure = 'FAILURE'
}

/**
 * The advertising tactic associated with the campaign. The following table lists available tactic names: |Tactic Name|Type|Description| |-----------|-----|-----------| |T00001     | |Reach shoppers who showed interest in categories related to your promoted products, or target specific products or product categories on Amazon. This tactic is for use by only vendors. This tactic is used to retrieve metrics for Sponsored Display campaigns that use interest, product or category audiences, including Sponsored Display campaigns that were previously Product Display Ads campaigns. This tactic name is only applicable for the `requestReport` operation and does not apply to any other campaign management operations.| |T00020     |Product| Choose individual products to show your ads in placements related to those products.<br>[Categories] Categories: Choose individual categories to show your ads in placements related to those categories.| |T00030     |Audiences| Select individual audiences to show your ads.| |remarketing|Views| This is a legacy tactic so use T00030 for campaign creation and management going forward. Shoppers who viewed the detail pages of your advertised products or similar products.|
 * @export
 * @enum {string}
 */

export enum TacticReport {
    T00001 = 'T00001',
    T00020 = 'T00020',
    T00030 = 'T00030',
    Remarketing = 'remarketing'
}


/**
 * ReportsApi - axios parameter creator
 * @export
 */
export const ReportsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets a `307 Temporary Redirect` response that includes a `location` header with the value set to an AWS S3 path where the report is located. The path expires after 30 seconds. If the path expires before the report is downloaded, a new report request must be created.
         * @summary Downloads a previously requested report identified by reportId.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identifier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadReport: async (amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'amazonAdvertisingAPIClientId' is not null or undefined
            assertParamExists('downloadReport', 'amazonAdvertisingAPIClientId', amazonAdvertisingAPIClientId)
            // verify required parameter 'amazonAdvertisingAPIScope' is not null or undefined
            assertParamExists('downloadReport', 'amazonAdvertisingAPIScope', amazonAdvertisingAPIScope)
            // verify required parameter 'reportId' is not null or undefined
            assertParamExists('downloadReport', 'reportId', reportId)
            const localVarPath = `/v2/reports/{reportId}/download`
                .replace(`{${"reportId"}}`, encodeURIComponent(String(reportId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication oauth2AuthorizationCode required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2AuthorizationCode", ["cpc_advertising:campaign_management"], configuration)

            if (amazonAdvertisingAPIClientId !== undefined && amazonAdvertisingAPIClientId !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-ClientId'] = String(amazonAdvertisingAPIClientId);
            }

            if (amazonAdvertisingAPIScope !== undefined && amazonAdvertisingAPIScope !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-Scope'] = String(amazonAdvertisingAPIScope);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Uses the `reportId` value from the response of a report previously requested via `POST` method of the `/v2/hsa/{recordType}/report` operation. Gets a ReportResponse object that includes a field named `status`. While the report is pending, `status` is set to `IN_PROGRESS`. Continue polling until a ReportStatus object is received with `status` set to `SUCCESS`. Then, use the `GET` method of the `/v2/reports/{reportId}/download` operation to get the download URI for the report.
         * @summary Gets the status of a report previously requested.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReportStatus: async (amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'amazonAdvertisingAPIClientId' is not null or undefined
            assertParamExists('getReportStatus', 'amazonAdvertisingAPIClientId', amazonAdvertisingAPIClientId)
            // verify required parameter 'amazonAdvertisingAPIScope' is not null or undefined
            assertParamExists('getReportStatus', 'amazonAdvertisingAPIScope', amazonAdvertisingAPIScope)
            // verify required parameter 'reportId' is not null or undefined
            assertParamExists('getReportStatus', 'reportId', reportId)
            const localVarPath = `/v2/reports/{reportId}`
                .replace(`{${"reportId"}}`, encodeURIComponent(String(reportId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication oauth2AuthorizationCode required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2AuthorizationCode", ["cpc_advertising:campaign_management"], configuration)

            if (amazonAdvertisingAPIClientId !== undefined && amazonAdvertisingAPIClientId !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-ClientId'] = String(amazonAdvertisingAPIClientId);
            }

            if (amazonAdvertisingAPIScope !== undefined && amazonAdvertisingAPIScope !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-Scope'] = String(amazonAdvertisingAPIScope);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Request the creation of a performance report for all entities of a single type which have performance data to report. Record types can be: campaigns, adGroups, targets, and keywords.
         * @summary Creates a report request.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {'campaigns' | 'adGroups' | 'targets' | 'keywords'} recordType The type of report to generate, either &#x60;campaigns&#x60;, &#x60;adGroups&#x60;, &#x60;targets&#x60;, or &#x60;keywords&#x60;.
         * @param {ReportRequest} [reportRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestReport: async (amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, recordType: 'campaigns' | 'adGroups' | 'targets' | 'keywords', reportRequest?: ReportRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'amazonAdvertisingAPIClientId' is not null or undefined
            assertParamExists('requestReport', 'amazonAdvertisingAPIClientId', amazonAdvertisingAPIClientId)
            // verify required parameter 'amazonAdvertisingAPIScope' is not null or undefined
            assertParamExists('requestReport', 'amazonAdvertisingAPIScope', amazonAdvertisingAPIScope)
            // verify required parameter 'recordType' is not null or undefined
            assertParamExists('requestReport', 'recordType', recordType)
            const localVarPath = `/v2/hsa/{recordType}/report`
                .replace(`{${"recordType"}}`, encodeURIComponent(String(recordType)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication oauth2AuthorizationCode required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2AuthorizationCode", ["cpc_advertising:campaign_management"], configuration)

            if (amazonAdvertisingAPIClientId !== undefined && amazonAdvertisingAPIClientId !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-ClientId'] = String(amazonAdvertisingAPIClientId);
            }

            if (amazonAdvertisingAPIScope !== undefined && amazonAdvertisingAPIScope !== null) {
                localVarHeaderParameter['Amazon-Advertising-API-Scope'] = String(amazonAdvertisingAPIScope);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(reportRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReportsApi - functional programming interface
 * @export
 */
export const ReportsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReportsApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets a `307 Temporary Redirect` response that includes a `location` header with the value set to an AWS S3 path where the report is located. The path expires after 30 seconds. If the path expires before the report is downloaded, a new report request must be created.
         * @summary Downloads a previously requested report identified by reportId.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identifier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async downloadReport(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.downloadReport(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, reportId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Uses the `reportId` value from the response of a report previously requested via `POST` method of the `/v2/hsa/{recordType}/report` operation. Gets a ReportResponse object that includes a field named `status`. While the report is pending, `status` is set to `IN_PROGRESS`. Continue polling until a ReportStatus object is received with `status` set to `SUCCESS`. Then, use the `GET` method of the `/v2/reports/{reportId}/download` operation to get the download URI for the report.
         * @summary Gets the status of a report previously requested.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getReportStatus(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReportResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getReportStatus(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, reportId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Request the creation of a performance report for all entities of a single type which have performance data to report. Record types can be: campaigns, adGroups, targets, and keywords.
         * @summary Creates a report request.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {'campaigns' | 'adGroups' | 'targets' | 'keywords'} recordType The type of report to generate, either &#x60;campaigns&#x60;, &#x60;adGroups&#x60;, &#x60;targets&#x60;, or &#x60;keywords&#x60;.
         * @param {ReportRequest} [reportRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async requestReport(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, recordType: 'campaigns' | 'adGroups' | 'targets' | 'keywords', reportRequest?: ReportRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReportResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.requestReport(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, recordType, reportRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ReportsApi - factory interface
 * @export
 */
export const ReportsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReportsApiFp(configuration)
    return {
        /**
         * Gets a `307 Temporary Redirect` response that includes a `location` header with the value set to an AWS S3 path where the report is located. The path expires after 30 seconds. If the path expires before the report is downloaded, a new report request must be created.
         * @summary Downloads a previously requested report identified by reportId.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identifier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadReport(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options?: any): AxiosPromise<void> {
            return localVarFp.downloadReport(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, reportId, options).then((request) => request(axios, basePath));
        },
        /**
         * Uses the `reportId` value from the response of a report previously requested via `POST` method of the `/v2/hsa/{recordType}/report` operation. Gets a ReportResponse object that includes a field named `status`. While the report is pending, `status` is set to `IN_PROGRESS`. Continue polling until a ReportStatus object is received with `status` set to `SUCCESS`. Then, use the `GET` method of the `/v2/reports/{reportId}/download` operation to get the download URI for the report.
         * @summary Gets the status of a report previously requested.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} reportId The identier of the requested report.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReportStatus(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, reportId: string, options?: any): AxiosPromise<ReportResponse> {
            return localVarFp.getReportStatus(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, reportId, options).then((request) => request(axios, basePath));
        },
        /**
         * Request the creation of a performance report for all entities of a single type which have performance data to report. Record types can be: campaigns, adGroups, targets, and keywords.
         * @summary Creates a report request.
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {'campaigns' | 'adGroups' | 'targets' | 'keywords'} recordType The type of report to generate, either &#x60;campaigns&#x60;, &#x60;adGroups&#x60;, &#x60;targets&#x60;, or &#x60;keywords&#x60;.
         * @param {ReportRequest} [reportRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestReport(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, recordType: 'campaigns' | 'adGroups' | 'targets' | 'keywords', reportRequest?: ReportRequest, options?: any): AxiosPromise<ReportResponse> {
            return localVarFp.requestReport(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, recordType, reportRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for downloadReport operation in ReportsApi.
 * @export
 * @interface ReportsApiDownloadReportRequest
 */
export interface ReportsApiDownloadReportRequest {
    /**
     * The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
     * @type {string}
     * @memberof ReportsApiDownloadReport
     */
    readonly amazonAdvertisingAPIClientId: string

    /**
     * The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
     * @type {string}
     * @memberof ReportsApiDownloadReport
     */
    readonly amazonAdvertisingAPIScope: string

    /**
     * The identifier of the requested report.
     * @type {string}
     * @memberof ReportsApiDownloadReport
     */
    readonly reportId: string
}

/**
 * Request parameters for getReportStatus operation in ReportsApi.
 * @export
 * @interface ReportsApiGetReportStatusRequest
 */
export interface ReportsApiGetReportStatusRequest {
    /**
     * The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
     * @type {string}
     * @memberof ReportsApiGetReportStatus
     */
    readonly amazonAdvertisingAPIClientId: string

    /**
     * The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
     * @type {string}
     * @memberof ReportsApiGetReportStatus
     */
    readonly amazonAdvertisingAPIScope: string

    /**
     * The identier of the requested report.
     * @type {string}
     * @memberof ReportsApiGetReportStatus
     */
    readonly reportId: string
}

/**
 * Request parameters for requestReport operation in ReportsApi.
 * @export
 * @interface ReportsApiRequestReportRequest
 */
export interface ReportsApiRequestReportRequest {
    /**
     * The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
     * @type {string}
     * @memberof ReportsApiRequestReport
     */
    readonly amazonAdvertisingAPIClientId: string

    /**
     * The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
     * @type {string}
     * @memberof ReportsApiRequestReport
     */
    readonly amazonAdvertisingAPIScope: string

    /**
     * The type of report to generate, either &#x60;campaigns&#x60;, &#x60;adGroups&#x60;, &#x60;targets&#x60;, or &#x60;keywords&#x60;.
     * @type {'campaigns' | 'adGroups' | 'targets' | 'keywords'}
     * @memberof ReportsApiRequestReport
     */
    readonly recordType: 'campaigns' | 'adGroups' | 'targets' | 'keywords'

    /**
     * 
     * @type {ReportRequest}
     * @memberof ReportsApiRequestReport
     */
    readonly reportRequest?: ReportRequest
}

/**
 * ReportsApi - object-oriented interface
 * @export
 * @class ReportsApi
 * @extends {BaseAPI}
 */
export class ReportsApi extends BaseAPI {
    /**
     * Gets a `307 Temporary Redirect` response that includes a `location` header with the value set to an AWS S3 path where the report is located. The path expires after 30 seconds. If the path expires before the report is downloaded, a new report request must be created.
     * @summary Downloads a previously requested report identified by reportId.
     * @param {ReportsApiDownloadReportRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportsApi
     */
    public downloadReport(requestParameters: ReportsApiDownloadReportRequest, options?: any) {
        return ReportsApiFp(this.configuration).downloadReport(requestParameters.amazonAdvertisingAPIClientId, requestParameters.amazonAdvertisingAPIScope, requestParameters.reportId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Uses the `reportId` value from the response of a report previously requested via `POST` method of the `/v2/hsa/{recordType}/report` operation. Gets a ReportResponse object that includes a field named `status`. While the report is pending, `status` is set to `IN_PROGRESS`. Continue polling until a ReportStatus object is received with `status` set to `SUCCESS`. Then, use the `GET` method of the `/v2/reports/{reportId}/download` operation to get the download URI for the report.
     * @summary Gets the status of a report previously requested.
     * @param {ReportsApiGetReportStatusRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportsApi
     */
    public getReportStatus(requestParameters: ReportsApiGetReportStatusRequest, options?: any) {
        return ReportsApiFp(this.configuration).getReportStatus(requestParameters.amazonAdvertisingAPIClientId, requestParameters.amazonAdvertisingAPIScope, requestParameters.reportId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Request the creation of a performance report for all entities of a single type which have performance data to report. Record types can be: campaigns, adGroups, targets, and keywords.
     * @summary Creates a report request.
     * @param {ReportsApiRequestReportRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportsApi
     */
    public requestReport(requestParameters: ReportsApiRequestReportRequest, options?: any) {
        return ReportsApiFp(this.configuration).requestReport(requestParameters.amazonAdvertisingAPIClientId, requestParameters.amazonAdvertisingAPIScope, requestParameters.recordType, requestParameters.reportRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


