/* tslint:disable */
/* eslint-disable */
/**
 * Amazon Attribution
 * **Amazon Attribution**<br/>    Amazon Attribution is an advertising measurement product that enables advertisers to understand the impact that their non-Amazon ads (i.e. Google Ads, Facebook, Microsoft Ads) have in driving shopping activity on Amazon. Measuring ads using Amazon Attribution is done through implementing Attribution tags on non-Amazon ads. Amazon Attribution is currently available in beta for US, CA, UK, DE, FR, IT, and ES vendors and professional sellers enrolled in Brand Registry.<br/><br/>    **Amazon Attribution API**<br/>    The Amazon Attribution API enables agencies and integrators to easily retrieve their advertiser client\'s non-Amazon publisher attribution tags to automate tag implementation on their non-Amazon ads that link to an Amazon product or Stores page. The API also enables agencies and integrators to create and retrieve reporting on behalf of their advertiser clients to better understand Amazon conversion performance on their campaigns.<br/><br/>    Note that you must pass a header named **Amazon-Advertising-Api-Scope** with each call to an  Amazon Attribution API URI, including GET /advertisers. The value for this header is the **profileId** available from the **Profiles resource (/v2/profiles)**.<br/><br/>    For more information on the functionality, see the [Amazon Attribution API help topic](amazon-attribution/overview). For API onboarding information, see the [account setup](setting-up/account-setup) topic.<br/><br/>**</br></br>[Amazon Advertising API Support JIRA Service Desk - Website](https://amzn-clicks.atlassian.net/servicedesk/customer/user/login?destination=portals)</br>[Amazon Advertising API License Agreement](https://advertising.amazon.com/API/docs/license-agreement)
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ConfigurationParameters {
    apiKey?: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>);
    username?: string;
    password?: string;
    accessToken?: string | Promise<string> | ((name?: string, scopes?: string[]) => string) | ((name?: string, scopes?: string[]) => Promise<string>);
    basePath?: string;
    baseOptions?: any;
    formDataCtor?: new () => any;
}

export class Configuration {
    /**
     * parameter for apiKey security
     * @param name security name
     * @memberof Configuration
     */
    apiKey?: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>);
    /**
     * parameter for basic security
     *
     * @type {string}
     * @memberof Configuration
     */
    username?: string;
    /**
     * parameter for basic security
     *
     * @type {string}
     * @memberof Configuration
     */
    password?: string;
    /**
     * parameter for oauth2 security
     * @param name security name
     * @param scopes oauth2 scope
     * @memberof Configuration
     */
    accessToken?: string | Promise<string> | ((name?: string, scopes?: string[]) => string) | ((name?: string, scopes?: string[]) => Promise<string>);
    /**
     * override base path
     *
     * @type {string}
     * @memberof Configuration
     */
    basePath?: string;
    /**
     * base options for axios calls
     *
     * @type {any}
     * @memberof Configuration
     */
    baseOptions?: any;
    /**
     * The FormData constructor that will be used to create multipart form data
     * requests. You can inject this here so that execution environments that
     * do not support the FormData class can still run the generated client.
     *
     * @type {new () => FormData}
     */
    formDataCtor?: new () => any;

    constructor(param: ConfigurationParameters = {}) {
        this.apiKey = param.apiKey;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
    }

    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    public isJsonMime(mime: string): boolean {
        const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}
