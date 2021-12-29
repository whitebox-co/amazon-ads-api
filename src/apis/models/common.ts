/* tslint:disable */
/* eslint-disable */
/**
 * Amazon Attribution
 * **Amazon Attribution**<br/>    Amazon Attribution is an advertising measurement product that enables advertisers to understand the impact that their non-Amazon ads (i.e. Google Ads, Facebook, Microsoft Ads) have in driving shopping activity on Amazon. Measuring ads using Amazon Attribution is done through implementing Attribution tags on non-Amazon ads. Amazon Attribution is currently available in beta for US, CA, UK, DE, FR, IT, and ES vendors and professional sellers enrolled in Brand Registry.<br/><br/>    **Amazon Attribution API**<br/>    The Amazon Attribution API enables agencies and integrators to easily retrieve their advertiser client\'s non-Amazon publisher attribution tags to automate tag implementation on their non-Amazon ads that link to an Amazon product or Stores page. The API also enables agencies and integrators to create and retrieve reporting on behalf of their advertiser clients to better understand Amazon conversion performance on their campaigns.<br/><br/>    Note that you must pass a header named **Amazon-Advertising-Api-Scope** with each call to an  Amazon Attribution API URI, including GET /advertisers. The value for this header is the **profileId** available from the **Profiles resource (/v2/profiles)**. Note that for Amazon vendors, there may be multiple Amazon Attribution \"Advertisers\", while Amazon Sellers will only have one Amazon Attribution \"Advertiser\" per Profile/AA entity.<br/><br/>    Also note that Amazon Attribution accounts are a separate type of \"profile\". Only Amazon Attribution profiles can be called within the Amazon Attribution API. When getting the **Profiles resource**, identify the correct Amazon Attribution profile by inspecting the \"subType\" property to ensure it\'s set to  \"AMAZON_ATTRIBUTION\".<br/><br/>    For more information on the functionality, see the [Amazon Attribution API help topic](amazon-attribution/overview). For API onboarding information, see the [account setup](setting-up/account-setup) topic.<br/><br/>**</br></br>[Amazon Advertising API Support JIRA Service Desk - Website](https://amzn-clicks.atlassian.net/servicedesk/customer/user/login?destination=portals)</br>[Amazon Advertising API License Agreement](https://advertising.amazon.com/API/docs/license-agreement)
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from "./configuration";
import { RequiredError,　RequestArgs } from "./base";
import { AxiosInstance } from 'axios';

/**
 *
 * @export
 */
export const DUMMY_BASE_URL = 'https://example.com'

/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = function (functionName: string, paramName: string, paramValue: unknown) {
    if (paramValue === null || paramValue === undefined) {
        throw new RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
    }
}

/**
 *
 * @export
 */
export const setApiKeyToObject = async function (object: any, keyParamName: string, configuration?: Configuration) {
    if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
            ? await configuration.apiKey(keyParamName)
            : await configuration.apiKey;
        object[keyParamName] = localVarApiKeyValue;
    }
}

/**
 *
 * @export
 */
export const setBasicAuthToObject = function (object: any, configuration?: Configuration) {
    if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
    }
}

/**
 *
 * @export
 */
export const setBearerAuthToObject = async function (object: any, configuration?: Configuration) {
    if (configuration && configuration.accessToken) {
        const accessToken = typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        object["Authorization"] = "Bearer " + accessToken;
    }
}

/**
 *
 * @export
 */
export const setOAuthToObject = async function (object: any, name: string, scopes: string[], configuration?: Configuration) {
    if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
            ? await configuration.accessToken(name, scopes)
            : await configuration.accessToken;
        object["Authorization"] = "Bearer " + localVarAccessTokenValue;
    }
}

/**
 *
 * @export
 */
export const setSearchParams = function (url: URL, ...objects: any[]) {
    const searchParams = new URLSearchParams(url.search);
    for (const object of objects) {
        for (const key in object) {
            if (Array.isArray(object[key])) {
                searchParams.delete(key);
                for (const item of object[key]) {
                    searchParams.append(key, item);
                }
            } else {
                searchParams.set(key, object[key]);
            }
        }
    }
    url.search = searchParams.toString();
}

/**
 *
 * @export
 */
export const serializeDataIfNeeded = function (value: any, requestOptions: any, configuration?: Configuration) {
    const nonString = typeof value !== 'string';
    const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
        : nonString;
    return needsSerialization
        ? JSON.stringify(value !== undefined ? value : {})
        : (value || "");
}

/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
    return url.pathname + url.search + url.hash
}

/**
 *
 * @export
 */
export const createRequestFunction = function (axiosArgs: RequestArgs, globalAxios: AxiosInstance, BASE_PATH: string, configuration?: Configuration) {
    return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = {...axiosArgs.options, url: (configuration?.basePath || basePath) + axiosArgs.url};
        return axios.request(axiosRequestArgs);
    };
}
