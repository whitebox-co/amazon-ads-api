/* tslint:disable */
/* eslint-disable */
/**
 * Audiences
 * Audience Discovery API
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
 * 
 * @export
 * @interface AudienceCommonFieldsV1
 */
export interface AudienceCommonFieldsV1 {
    /**
     * Audience name
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    audienceName: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    updateDate?: string;
    /**
     * Audience description
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    description: string;
    /**
     * Audience segment identifier
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    audienceId: string;
    /**
     * Audience segment category
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    category: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    createDate?: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceCommonFieldsV1
     */
    status: AudienceCommonFieldsV1StatusEnum;
    /**
     * 
     * @type {AudienceCommonFieldsV1Forecasts}
     * @memberof AudienceCommonFieldsV1
     */
    forecasts: AudienceCommonFieldsV1Forecasts;
}

/**
    * @export
    * @enum {string}
    */
export enum AudienceCommonFieldsV1StatusEnum {
    Processing = 'Processing',
    Active = 'Active',
    Failed = 'Failed',
    Deprecated = 'Deprecated',
    Deactivated = 'Deactivated'
}

/**
 * 
 * @export
 * @interface AudienceCommonFieldsV1Forecasts
 */
export interface AudienceCommonFieldsV1Forecasts {
    /**
     * 
     * @type {AudienceCommonFieldsV1ForecastsInventoryForecasts}
     * @memberof AudienceCommonFieldsV1Forecasts
     */
    inventoryForecasts: AudienceCommonFieldsV1ForecastsInventoryForecasts;
}
/**
 * 
 * @export
 * @interface AudienceCommonFieldsV1ForecastsInventoryForecasts
 */
export interface AudienceCommonFieldsV1ForecastsInventoryForecasts {
    /**
     * 
     * @type {object}
     * @memberof AudienceCommonFieldsV1ForecastsInventoryForecasts
     */
    all?: object;
}
/**
 * The error response object.
 * @export
 * @interface AudienceErrorV1
 */
export interface AudienceErrorV1 {
    /**
     * A value created by Amazon API Gateway that uniquely identifies your request.
     * @type {string}
     * @memberof AudienceErrorV1
     */
    requestId?: string;
    /**
     * A human-readable description of the response.
     * @type {string}
     * @memberof AudienceErrorV1
     */
    message?: string;
    /**
     * 
     * @type {Array<AudienceSubErrorV1>}
     * @memberof AudienceErrorV1
     */
    errors?: Array<AudienceSubErrorV1>;
}
/**
 * 
 * @export
 * @interface AudienceFilterV1
 */
export interface AudienceFilterV1 {
    /**
     * Field to filter by. Supported enums are \'audienceName\', \'category\', \'categoryPath\' and \'audienceId\'. The \'category\' enum returns all audiences under a high-level category, whereas the \'categoryPath\' enum expects a path of nodes in the taxonomy tree and returns audiences attached directly to the node at the specified path.
     * @type {string}
     * @memberof AudienceFilterV1
     */
    field?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AudienceFilterV1
     */
    values?: Array<string>;
}
/**
 * The sub error object.
 * @export
 * @interface AudienceSubErrorV1
 */
export interface AudienceSubErrorV1 {
    /**
     * 
     * @type {string}
     * @memberof AudienceSubErrorV1
     */
    fieldName?: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceSubErrorV1
     */
    errorType: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceSubErrorV1
     */
    message: string;
}
/**
 * 
 * @export
 * @interface AudienceV1
 */
export interface AudienceV1 {
    /**
     * Audience name
     * @type {string}
     * @memberof AudienceV1
     */
    audienceName: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceV1
     */
    updateDate?: string;
    /**
     * Audience description
     * @type {string}
     * @memberof AudienceV1
     */
    description: string;
    /**
     * Audience segment identifier
     * @type {string}
     * @memberof AudienceV1
     */
    audienceId: string;
    /**
     * Audience segment category
     * @type {string}
     * @memberof AudienceV1
     */
    category: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceV1
     */
    createDate?: string;
    /**
     * 
     * @type {string}
     * @memberof AudienceV1
     */
    status: AudienceV1StatusEnum;
    /**
     * 
     * @type {AudienceCommonFieldsV1Forecasts}
     * @memberof AudienceV1
     */
    forecasts: AudienceCommonFieldsV1Forecasts;
}

/**
    * @export
    * @enum {string}
    */
export enum AudienceV1StatusEnum {
    Processing = 'Processing',
    Active = 'Active',
    Failed = 'Failed',
    Deprecated = 'Deprecated',
    Deactivated = 'Deactivated'
}

/**
 * 
 * @export
 * @interface DSPAudienceFieldsV1
 */
export interface DSPAudienceFieldsV1 {
    /**
     * Fees that will apply to this segment. Not all segments have fees. Fees may differ depending on the supply type the segment is attached to. In this case, multiple fee objects will be present.
     * @type {Array<DSPAudienceFieldsV1Fees>}
     * @memberof DSPAudienceFieldsV1
     */
    fees?: Array<DSPAudienceFieldsV1Fees>;
}
/**
 * 
 * @export
 * @interface DSPAudienceFieldsV1Fees
 */
export interface DSPAudienceFieldsV1Fees {
    /**
     * Fee amount in base currency units, multiplied by scaling factor (\'scale\').
     * @type {number}
     * @memberof DSPAudienceFieldsV1Fees
     */
    amount?: number;
    /**
     * Scale of the amount relative to the base currency unit. For instance, if the scale is 1000, the currency is USD, and the amount is 500, the human-readable fee is $0.50.
     * @type {number}
     * @memberof DSPAudienceFieldsV1Fees
     */
    scale?: number;
    /**
     * Base currency, such as US Dollar.
     * @type {string}
     * @memberof DSPAudienceFieldsV1Fees
     */
    currency?: DSPAudienceFieldsV1FeesCurrencyEnum;
    /**
     * How the fee is applied.
     * @type {string}
     * @memberof DSPAudienceFieldsV1Fees
     */
    feeCalculationType?: string;
    /**
     * To which supply types this fee applies to. The fee may be different for different supply types.
     * @type {string}
     * @memberof DSPAudienceFieldsV1Fees
     */
    impressionSupplyType?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum DSPAudienceFieldsV1FeesCurrencyEnum {
    Usd = 'USD'
}

/**
 * 
 * @export
 * @interface DSPInventoryForecastV1
 */
export interface DSPInventoryForecastV1 {
    /**
     * 
     * @type {ForecastBucketV1}
     * @memberof DSPInventoryForecastV1
     */
    dailyReach: ForecastBucketV1;
    /**
     * 
     * @type {ForecastBucketV1}
     * @memberof DSPInventoryForecastV1
     */
    dailyImpressions: ForecastBucketV1;
}
/**
 * 
 * @export
 * @interface FetchTaxonomyNodeV1
 */
export interface FetchTaxonomyNodeV1 {
    /**
     * 
     * @type {number}
     * @memberof FetchTaxonomyNodeV1
     */
    audienceCount?: number;
    /**
     * 
     * @type {string}
     * @memberof FetchTaxonomyNodeV1
     */
    category?: string;
}
/**
 * The response data will have the categories that are under the given path, and main categories will be returned if no path is specified. The response data also depends on the adType specified here since ad programs may support targeting audiences in certain categories.
 * @export
 * @interface FetchTaxonomyRequestBodyV1
 */
export interface FetchTaxonomyRequestBodyV1 {
    /**
     * 
     * @type {string}
     * @memberof FetchTaxonomyRequestBodyV1
     */
    adType?: FetchTaxonomyRequestBodyV1AdTypeEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof FetchTaxonomyRequestBodyV1
     */
    categoryPath?: Array<string>;
}

/**
    * @export
    * @enum {string}
    */
export enum FetchTaxonomyRequestBodyV1AdTypeEnum {
    Dsp = 'DSP',
    Sd = 'SD'
}

/**
 * 
 * @export
 * @interface FetchTaxonomyResponseV1
 */
export interface FetchTaxonomyResponseV1 {
    /**
     * 
     * @type {Array<string>}
     * @memberof FetchTaxonomyResponseV1
     */
    categoryPath?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof FetchTaxonomyResponseV1
     */
    nextToken?: string;
    /**
     * 
     * @type {Array<FetchTaxonomyNodeV1>}
     * @memberof FetchTaxonomyResponseV1
     */
    categories?: Array<FetchTaxonomyNodeV1>;
}
/**
 * 
 * @export
 * @interface ForecastBucketV1
 */
export interface ForecastBucketV1 {
    /**
     * The inclusive lower bound for the bucket.  If not specified, the bucket captures all values below the upper bound.
     * @type {number}
     * @memberof ForecastBucketV1
     */
    lowerBoundInclusive?: number;
    /**
     * The exclusive upper bound for the bucket.  If not specified, the bucket captures all values above the lower bound.
     * @type {number}
     * @memberof ForecastBucketV1
     */
    upperBoundExclusive?: number;
}
/**
 * Resulting segments will match all specified filters
 * @export
 * @interface ListAudiencesRequestBodyV1
 */
export interface ListAudiencesRequestBodyV1 {
    /**
     * 
     * @type {string}
     * @memberof ListAudiencesRequestBodyV1
     */
    adType?: ListAudiencesRequestBodyV1AdTypeEnum;
    /**
     * 
     * @type {Array<AudienceFilterV1>}
     * @memberof ListAudiencesRequestBodyV1
     */
    filters?: Array<AudienceFilterV1>;
}

/**
    * @export
    * @enum {string}
    */
export enum ListAudiencesRequestBodyV1AdTypeEnum {
    Dsp = 'DSP',
    Sd = 'SD'
}

/**
 * 
 * @export
 * @interface ListAudiencesResponseV1
 */
export interface ListAudiencesResponseV1 {
    /**
     * 
     * @type {string}
     * @memberof ListAudiencesResponseV1
     */
    nextToken?: string;
    /**
     * Array of segments matching given filters sorted by create time, earliest first.
     * @type {Array<AudienceV1>}
     * @memberof ListAudiencesResponseV1
     */
    audiences?: Array<AudienceV1>;
    /**
     * 
     * @type {number}
     * @memberof ListAudiencesResponseV1
     */
    matchCount?: number;
}
/**
 * 
 * @export
 * @interface SDInventoryForecastV1
 */
export interface SDInventoryForecastV1 {
    /**
     * 
     * @type {ForecastBucketV1}
     * @memberof SDInventoryForecastV1
     */
    dailyReach: ForecastBucketV1;
}

/**
 * DiscoveryApi - axios parameter creator
 * @export
 */
export const DiscoveryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a list of audience categories for a given category path  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Browse the taxonomy of audience categories
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {FetchTaxonomyRequestBodyV1} fetchTaxonomyRequestBodyV1 
         * @param {string} [advertiserId] The advertiser associated with the advertising account. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of categories in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        fetchTaxonomy: async (amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, fetchTaxonomyRequestBodyV1: FetchTaxonomyRequestBodyV1, advertiserId?: string, nextToken?: string, maxResults?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'amazonAdvertisingAPIClientId' is not null or undefined
            assertParamExists('fetchTaxonomy', 'amazonAdvertisingAPIClientId', amazonAdvertisingAPIClientId)
            // verify required parameter 'amazonAdvertisingAPIScope' is not null or undefined
            assertParamExists('fetchTaxonomy', 'amazonAdvertisingAPIScope', amazonAdvertisingAPIScope)
            // verify required parameter 'fetchTaxonomyRequestBodyV1' is not null or undefined
            assertParamExists('fetchTaxonomy', 'fetchTaxonomyRequestBodyV1', fetchTaxonomyRequestBodyV1)
            const localVarPath = `/audiences/taxonomy/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (advertiserId !== undefined) {
                localVarQueryParameter['advertiserId'] = advertiserId;
            }

            if (nextToken !== undefined) {
                localVarQueryParameter['nextToken'] = nextToken;
            }

            if (maxResults !== undefined) {
                localVarQueryParameter['maxResults'] = maxResults;
            }

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
            localVarRequestOptions.data = serializeDataIfNeeded(fetchTaxonomyRequestBodyV1, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a list of audience segments for an advertiser. The result set can be filtered by providing an array of Filter objects. Each item in the resulting set will match all specified filters.  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Gets audience segments based on filters
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} [advertiserId] The advertiser to retrieve segments for. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of audiences in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {ListAudiencesRequestBodyV1} [listAudiencesRequestBodyV1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAudiences: async (amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, advertiserId?: string, nextToken?: string, maxResults?: number, listAudiencesRequestBodyV1?: ListAudiencesRequestBodyV1, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'amazonAdvertisingAPIClientId' is not null or undefined
            assertParamExists('listAudiences', 'amazonAdvertisingAPIClientId', amazonAdvertisingAPIClientId)
            // verify required parameter 'amazonAdvertisingAPIScope' is not null or undefined
            assertParamExists('listAudiences', 'amazonAdvertisingAPIScope', amazonAdvertisingAPIScope)
            const localVarPath = `/audiences/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (advertiserId !== undefined) {
                localVarQueryParameter['advertiserId'] = advertiserId;
            }

            if (nextToken !== undefined) {
                localVarQueryParameter['nextToken'] = nextToken;
            }

            if (maxResults !== undefined) {
                localVarQueryParameter['maxResults'] = maxResults;
            }

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
            localVarRequestOptions.data = serializeDataIfNeeded(listAudiencesRequestBodyV1, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DiscoveryApi - functional programming interface
 * @export
 */
export const DiscoveryApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DiscoveryApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a list of audience categories for a given category path  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Browse the taxonomy of audience categories
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {FetchTaxonomyRequestBodyV1} fetchTaxonomyRequestBodyV1 
         * @param {string} [advertiserId] The advertiser associated with the advertising account. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of categories in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async fetchTaxonomy(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, fetchTaxonomyRequestBodyV1: FetchTaxonomyRequestBodyV1, advertiserId?: string, nextToken?: string, maxResults?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FetchTaxonomyResponseV1>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.fetchTaxonomy(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, fetchTaxonomyRequestBodyV1, advertiserId, nextToken, maxResults, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of audience segments for an advertiser. The result set can be filtered by providing an array of Filter objects. Each item in the resulting set will match all specified filters.  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Gets audience segments based on filters
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} [advertiserId] The advertiser to retrieve segments for. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of audiences in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {ListAudiencesRequestBodyV1} [listAudiencesRequestBodyV1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAudiences(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, advertiserId?: string, nextToken?: string, maxResults?: number, listAudiencesRequestBodyV1?: ListAudiencesRequestBodyV1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListAudiencesResponseV1>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listAudiences(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, advertiserId, nextToken, maxResults, listAudiencesRequestBodyV1, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DiscoveryApi - factory interface
 * @export
 */
export const DiscoveryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DiscoveryApiFp(configuration)
    return {
        /**
         * Returns a list of audience categories for a given category path  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Browse the taxonomy of audience categories
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {FetchTaxonomyRequestBodyV1} fetchTaxonomyRequestBodyV1 
         * @param {string} [advertiserId] The advertiser associated with the advertising account. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of categories in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        fetchTaxonomy(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, fetchTaxonomyRequestBodyV1: FetchTaxonomyRequestBodyV1, advertiserId?: string, nextToken?: string, maxResults?: number, options?: any): AxiosPromise<FetchTaxonomyResponseV1> {
            return localVarFp.fetchTaxonomy(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, fetchTaxonomyRequestBodyV1, advertiserId, nextToken, maxResults, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of audience segments for an advertiser. The result set can be filtered by providing an array of Filter objects. Each item in the resulting set will match all specified filters.  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
         * @summary Gets audience segments based on filters
         * @param {string} amazonAdvertisingAPIClientId The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
         * @param {string} amazonAdvertisingAPIScope The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
         * @param {string} [advertiserId] The advertiser to retrieve segments for. This parameter is required for the DSP adType, but optional for the SD adType.
         * @param {string} [nextToken] Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
         * @param {number} [maxResults] Sets the maximum number of audiences in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
         * @param {ListAudiencesRequestBodyV1} [listAudiencesRequestBodyV1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAudiences(amazonAdvertisingAPIClientId: string, amazonAdvertisingAPIScope: string, advertiserId?: string, nextToken?: string, maxResults?: number, listAudiencesRequestBodyV1?: ListAudiencesRequestBodyV1, options?: any): AxiosPromise<ListAudiencesResponseV1> {
            return localVarFp.listAudiences(amazonAdvertisingAPIClientId, amazonAdvertisingAPIScope, advertiserId, nextToken, maxResults, listAudiencesRequestBodyV1, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for fetchTaxonomy operation in DiscoveryApi.
 * @export
 * @interface DiscoveryApiFetchTaxonomyRequest
 */
export interface DiscoveryApiFetchTaxonomyRequest {
    /**
     * The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
     * @type {string}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly amazonAdvertisingAPIClientId: string

    /**
     * The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
     * @type {string}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly amazonAdvertisingAPIScope: string

    /**
     * 
     * @type {FetchTaxonomyRequestBodyV1}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly fetchTaxonomyRequestBodyV1: FetchTaxonomyRequestBodyV1

    /**
     * The advertiser associated with the advertising account. This parameter is required for the DSP adType, but optional for the SD adType.
     * @type {string}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly advertiserId?: string

    /**
     * Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
     * @type {string}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly nextToken?: string

    /**
     * Sets the maximum number of categories in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
     * @type {number}
     * @memberof DiscoveryApiFetchTaxonomy
     */
    readonly maxResults?: number
}

/**
 * Request parameters for listAudiences operation in DiscoveryApi.
 * @export
 * @interface DiscoveryApiListAudiencesRequest
 */
export interface DiscoveryApiListAudiencesRequest {
    /**
     * The identifier of a client associated with a \&quot;Login with Amazon\&quot; account.
     * @type {string}
     * @memberof DiscoveryApiListAudiences
     */
    readonly amazonAdvertisingAPIClientId: string

    /**
     * The identifier of a profile associated with the advertiser account. Use &#x60;GET&#x60; method on Profiles resource to list profiles associated with the access token passed in the HTTP Authorization header.
     * @type {string}
     * @memberof DiscoveryApiListAudiences
     */
    readonly amazonAdvertisingAPIScope: string

    /**
     * The advertiser to retrieve segments for. This parameter is required for the DSP adType, but optional for the SD adType.
     * @type {string}
     * @memberof DiscoveryApiListAudiences
     */
    readonly advertiserId?: string

    /**
     * Token from a previous request. Use in conjunction with the &#x60;maxResults&#x60; parameter to control pagination of the returned array.
     * @type {string}
     * @memberof DiscoveryApiListAudiences
     */
    readonly nextToken?: string

    /**
     * Sets the maximum number of audiences in the returned array. Use in conjunction with the &#x60;nextToken&#x60; parameter to control pagination. For example, supplying maxResults&#x3D;20 with a previously returned token will fetch up to the next 20 items. In some cases, fewer items may be returned.
     * @type {number}
     * @memberof DiscoveryApiListAudiences
     */
    readonly maxResults?: number

    /**
     * 
     * @type {ListAudiencesRequestBodyV1}
     * @memberof DiscoveryApiListAudiences
     */
    readonly listAudiencesRequestBodyV1?: ListAudiencesRequestBodyV1
}

/**
 * DiscoveryApi - object-oriented interface
 * @export
 * @class DiscoveryApi
 * @extends {BaseAPI}
 */
export class DiscoveryApi extends BaseAPI {
    /**
     * Returns a list of audience categories for a given category path  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
     * @summary Browse the taxonomy of audience categories
     * @param {DiscoveryApiFetchTaxonomyRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscoveryApi
     */
    public fetchTaxonomy(requestParameters: DiscoveryApiFetchTaxonomyRequest, options?: any) {
        return DiscoveryApiFp(this.configuration).fetchTaxonomy(requestParameters.amazonAdvertisingAPIClientId, requestParameters.amazonAdvertisingAPIScope, requestParameters.fetchTaxonomyRequestBodyV1, requestParameters.advertiserId, requestParameters.nextToken, requestParameters.maxResults, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of audience segments for an advertiser. The result set can be filtered by providing an array of Filter objects. Each item in the resulting set will match all specified filters.  **Requires one of these permissions**: [\"advertiser_campaign_edit\",\"advertiser_campaign_view\"]
     * @summary Gets audience segments based on filters
     * @param {DiscoveryApiListAudiencesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscoveryApi
     */
    public listAudiences(requestParameters: DiscoveryApiListAudiencesRequest, options?: any) {
        return DiscoveryApiFp(this.configuration).listAudiences(requestParameters.amazonAdvertisingAPIClientId, requestParameters.amazonAdvertisingAPIScope, requestParameters.advertiserId, requestParameters.nextToken, requestParameters.maxResults, requestParameters.listAudiencesRequestBodyV1, options).then((request) => request(this.axios, this.basePath));
    }
}


