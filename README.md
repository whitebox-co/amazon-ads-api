# Amazon Ads API SDK

![GitHub](https://img.shields.io/github/license/whitebox-co/amazon-ads-api)
![GitHub](https://img.shields.io/github/package-json/v/whitebox-co/amazon-ads-api)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/whitebox-co/amazon-ads-api/Release?label=main)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/whitebox-co/amazon-ads-api/Develop?label=develop)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/whitebox-co/amazon-ads-api/Generate%20API?label=api-generator)
![GitHub Workflow Status](https://img.shields.io/snyk/vulnerabilities/github/whitebox-co/amazon-ads-api?label=snyk%20vulnerbilities)
![GitHub Workflow Status](https://img.shields.io/maintenance/yes/2022)

A fully typed and auto generated [TypeScript](https://www.typescriptlang.org) library for the
[Amazon Ads API](https://advertising.amazon.com/API/docs/en-us/info/api-overview).

This library automatically generates typescript types, classes, interfaces, integration tests, and UI documentation
based directly off of the Amazon Ads OpenAPI specification(s).

## Why?

TLDR: It did not exist and we really needed it!

-   Amazon does not provide a Typescript, NodeJs, or Javascript library to access their endpoints.
-   Existing implementations, the few that there are, did not include full the full Amazon Ads REST implementation,
    were not auto generated based on the schemas, or simply did not meet our criteria for using open source software.

## How it works

-   An [OpenAPI Schema](https://spec.openapis.org/oas/latest.html) is downloaded from Amazon Ads for each section of a
    the Amazon Ads API.
-   API Classes are generated using the amazing [openapi-generator](https://github.com/OpenAPITools/openapi-generator)
    against each schema.
-   Integration Test stubs are auto generated for every generated api class and function.
-   Documentation is auto generated and updated based on the latest openapi schemas changes.

## Installation

Packages are maintained on both [Github](https://github.com/whitebox-co/amazon-ads-api/packages) and
[NPM](https://www.npmjs.com/package/@whitebox-co/amazon-ads-api).

```sh
npm install @whitebox-co/amazon-ads-api
```

For development assuming all prerequisites are met.

```sh
npm install
```

## Usage

There are two distinct parts of the this SDK.

1. **Models** - The Models contain interfaces and classes that define the individual api endpoint definitions and
   extend a base api class that ultimately implements axios calls to the remote endpoint. These could be used if
   you wanted to manage the configuration and authorizations yourself.
2. **Clients** - The Clients are classes that groups multiple Api's into one named group. These map directly to the
   Amazon OpenAPI Swagger definitions. They extend multiple Api's and group all functions of all api's into a single
   exported class. These are the main entry points into using the SDK to connect to the remote endpoints.

The Amazon Ads API requires passing both access tokens and refresh tokens in order to properly authorize against
each endpoint. Our SDK handles this transparently to the end user by exposing a mechanism to manage caching and
refreshing of the access tokens. In order to take advantage of this the user must use the `getConfiguredApi`
function to instantiate an individual client.

### Preferred Usage

Use this approach when you only need to use a single client. If multiple clients are necessary
it is better to use the AmazonAds Class.

```typescript
import amazonAdsApi, { AttributionClient } from '@whitebox-co/amazon-ads-api';

/**
 * Init the amazon ads attribution client with client credentials and get back a fully
 * configured instance of the client with token caching built in.
 *
 * Any subsequent call using the same credentials but a different client
 * will use cached credentials until they expire.
 */
const attributionClient = await amazonAdsApi.getConfiguredApi(AttributionClient, {
    clientId
    clientSecret,
    profileId,
    refreshToken,
});

/**
 * Example of get call to the attribution api.
 */
const response = await attributionClient.getAdvertisersByProfile({
    amazonAdvertisingAPIClientId: '',
    amazonAdvertisingAPIScope: ''
});
```

### Class Based Alternative

This approach is better to use when you need multiple client's and only want to have to pass in and
configure credentials one time.

```typescript
import { AmazonAds, AttributionClient } from '@whitebox-co/amazon-ads-api';

/**
 * Init a new instance of the AmazonAds class.
 *
 * This has the advantage of only having to pass in credentials once.
 */
const amazonAdsApi = new AmazonAds({
    clientId
    clientSecret,
    profileId,
    refreshToken,
});

/**
 *  Ges a fully authorized instance of the attribution client.
 */
const attributionClient = await amazonAdsApi.getConfiguredApi(AttributionClient);

/**
 * Example of get call to the attribution api.
 */
const response = await attributionClient.getAdvertisersByProfile({
    amazonAdvertisingAPIClientId: '',
    amazonAdvertisingAPIScope: ''
});
```

## Docs

There are three different types of documentation included for this repo.

1. **Redoc** - Used as an alternative to visiting the amazon ads api site.
2. **SwaggerUI** - Used as an alternative to redoc.
3. **TypeDoc** - Typescript type and class documentation of the main library.

Redoc and SwaggerUI are included as an alternative to having to visit Amazon Ads developer website

### Viewing Docs

We have packaged [http-server](https://github.com/http-party/http-server) as a dev dependency as a way to quickly view
the docs. Issue any one of the following commands to build and view any of the docs.

```sh
npm run docs # or `npm run docs:typedoc`
npm run docs:redoc
npm run docs:swaggerui
```

**Note:** `http-server` will try and serve the docs on port `8080` and will auto launch your browser to the
specified documentation.

## Development

### Prerequisites

-   [Java Runtime](https://www.java.com/en/download/manual.jsp) - Necessary to run the openapi-generator
-   [Node](https://nodejs.org/en/) - To install and build the library.
-   [Amazon Ads API Experience](https://advertising.amazon.com/API/docs/en-us/info/api-overview) - Helpful to have
    experience with the Amazon Ads REST API.

### Commands

```sh
npm run build       # build the project (output to ./lib)
npm run dev         # run ts-node-dev to watch and rebuild project while in development.
npm run lint        # runs eslint linter
```

### API Generation

API Generation is handled automatically by github actions. We perform a task daily to check if any of the Amazon Ads
APIs have been updated and if it has we perform the schema downloads and subsequent API Generation. From there we
automatically generate the new docs and a new version of the library is built and deployed to npm.

If you wish to manually perform those steps see the sections below.

#### Manual Schema Download

Amazon exposes OpenApi 3.0 schemas _for most_ of their APIs. To pull down all of the schemas simply run the following:

```sh
npm run download-schemas
```

If any changes have occurred to the schema the new updates will overwrite the existing schemas in the `./docs/schemas`
directory.

#### Manual Model Generation

Once you have the schemas downloaded and then you can run the model generation by running the following:

```sh
npm run generate-models
```

Which will start the generation and processing of all of the schemas and eventually finish with all models created in
the `src/apis/models` directory.

#### Manual Client Generation

Once you have the models generated you can run the client generation by running the following:

```sh
npm run generate-clients
```

Which will start the client generation and eventually finish with all clients created in the `src/apis/clients`
directory.

#### Manual API Generation

If you wish do all the above generation steps in one go, run the following:

```sh
npm run generate-apis
```

Which will download schemas, generate models, generate clients, generate tests, and the output everything to their
respective folders. This is what the github actions is setup to run.

## Token Authorization and Caching

Tokens are retrieved from amazon during the lwa authorization process and then get cached until they expire. When they
expire another call to the auth endpoint is sent to amazon.

Any time you request a new api from the amazonAdsApi using the same clientID, the cached credential token
will be used to authorize the request.

## Issues

Please report any issues you find in the github issues section. We will do our best to address any issue in a timely
manner.

### Known Issues

These need to be moved over to github issues.

-   An internal throttle controller/rate limiter does not exist (yet!) and Amazon does indeed have different throttling
    limits per api.
-   Some of the Sponsored Brands API models have `uNKNOWNBASETYPE?: any` in places that the open-api-generator can not
    properly figure out how to handle the complexities of allOf/anyOf inheritance. This is an issue with
    open-api-generator and we have not yet found a workaround. For now the best solution is to directly consult the
    openapi schema when trying to determine which request params to use for these api calls.
-   Amazon Ads API's does not always provide schemas for their apis. In those scenarios we have created our own based
    of of their text based documentation. You can see which those are by referencing the `constants.ts` file and
    looking for the local references of the schemas.
-   Amazon does not always update an existing schema per ads category and in some instances they simply make a new
    schema altogether and just add it to an existing category. For instance, see [Sponsored Brands Campaign](https://advertising.amazon.com/API/docs/en-us/sponsored-brands/3-0/openapi#/Campaigns) vs [Sponsored Brands Budget Rules](https://advertising.amazon.com/API/docs/en-us/sponsored-brands/3-0/openapi/prod#/BudgetRules).
    You will notice that both of these have separate schema definitions. In these scenarios we will append "Extra" to
    the schema name to signify the differences between these. In the future the hope is that Amazon will concatenate
    these into a the API under a new version.

## Acknowledgements

We would like to thank the following organizations for their help and/or inspiration.

-   [ScaleLeap](https://github.com/ScaleLeap) - For their work on auto-generation of the Selling Partner API, in which
    this code is heavily based off of.
-   [Whitebox](https://whitebox.com/) - For their commitment to providing open source contributions. Without their
    support this project would not exist.

## Contributing

Feel free to open PR's. [Whitebox](https://whitebox.com/) is currently using this in our production code and we will
evaluate changes on a case by case basis.

See the [Contributing](CONTRIBUTING.md) documentation for further details.

## Code of Conduct

This project has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).

See the [Code Of Conduct](CODE_OF_CONDUCT.md) documentation for further details.

## License

![GitHub](https://img.shields.io/github/license/whitebox-co/amazon-ads-api)

A copy of the license is provided in the root directory under [LICENSE](LICENSE)
