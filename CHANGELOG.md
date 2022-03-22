# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.5.2](https://github.com/whitebox-co/amazon-ads-api/compare/v1.5.1...v1.5.2) (2022-03-22)

### Bug Fixes

-   increasing timeouts as large report transfers exceed the 60s threshold ([4ecb0b6](https://github.com/whitebox-co/amazon-ads-api/commit/4ecb0b694afbdfb5f6a939a6148bd8531daabfc6))

## [1.5.1](https://github.com/whitebox-co/amazon-ads-api/compare/v1.5.0...v1.5.1) (2022-03-22)

### Bug Fixes

-   make axiosInstance configurable and increase defaults ([5eefdfa](https://github.com/whitebox-co/amazon-ads-api/commit/5eefdfaf29fa054b406d0d59078299bb3c97169d))

# [1.5.0](https://github.com/whitebox-co/amazon-ads-api/compare/v1.4.2...v1.5.0) (2022-03-22)

### Features

-   adding agentkeepalive for req agents, adding timeouts and maxRedirects to axios instance ([def7eff](https://github.com/whitebox-co/amazon-ads-api/commit/def7effeb0d4fb2c0280ef59092c1a1e234b0971))
-   integration of latest amazon updates ([0fb0482](https://github.com/whitebox-co/amazon-ads-api/commit/0fb04826600d6ccabcd01df6f59b241e5dfe6862))

## [1.4.2](https://github.com/whitebox-co/amazon-ads-api/compare/v1.4.1...v1.4.2) (2022-03-14)

### Bug Fixes

-   retry refresh token logic was not properly awaited resulting in unhandled exceptions ([c33d31a](https://github.com/whitebox-co/amazon-ads-api/commit/c33d31a48df67c0223e9642b52e7a97ad98e8d05))

## [1.4.1](https://github.com/whitebox-co/amazon-ads-api/compare/v1.4.0...v1.4.1) (2022-03-14)

### Bug Fixes

-   removing limiter id to avoid id collisions, limiter will assign its own ids ([0828bc5](https://github.com/whitebox-co/amazon-ads-api/commit/0828bc5ef2ade3e7b093a7bbc3d7d3054947359e))

# [1.4.0](https://github.com/whitebox-co/amazon-ads-api/compare/v1.3.0...v1.4.0) (2022-03-14)

### Bug Fixes

-   **deps:** bump axios from 0.25.0 to 0.26.1 ([#87](https://github.com/whitebox-co/amazon-ads-api/issues/87)) ([86694da](https://github.com/whitebox-co/amazon-ads-api/commit/86694da162795f9a9dcd9a57d5b5316be34087dd))

### Features

-   auto generated updates based on latest amazon schema changes ([2477264](https://github.com/whitebox-co/amazon-ads-api/commit/24772642a69d92595ad7587e5601e54c9eec9691))
-   configuration and adsapi constructor now take a bottleneck limiter as an optional param ([9a2f127](https://github.com/whitebox-co/amazon-ads-api/commit/9a2f127b7ad66bd5ac454030ea6e2c1222d7c32c))
-   integrating latest amazon schema changes, adding ability for retries to refresh tokens on 401 ([60751a0](https://github.com/whitebox-co/amazon-ads-api/commit/60751a01b202f2e88c7610c1dc90208f111502fa))

# [1.3.0](https://github.com/whitebox-co/amazon-ads-api/compare/v1.2.0...v1.3.0) (2022-03-04)

### Features

-   auto generated updates based on latest amazon schema changes ([9cff834](https://github.com/whitebox-co/amazon-ads-api/commit/9cff8348a3ba73fc3c970849009c22f576b662ac))
-   configuration and adsapi constructor now take a bottleneck limiter as an optional param ([bda0901](https://github.com/whitebox-co/amazon-ads-api/commit/bda09014e04f5c0b025e69f8719a06af4c75d975))

# [1.2.0](https://github.com/whitebox-co/amazon-ads-api/compare/v1.1.0...v1.2.0) (2022-02-01)

### Bug Fixes

-   **deps:** bump axios from 0.21.4 to 0.25.0 ([#53](https://github.com/whitebox-co/amazon-ads-api/issues/53)) ([8f8ff60](https://github.com/whitebox-co/amazon-ads-api/commit/8f8ff60401bbcc4be0d9871fc1a8ec2a1ce4407f))

### Features

-   add throttling and rate-limiting ([#49](https://github.com/whitebox-co/amazon-ads-api/issues/49)) ([5cf5adb](https://github.com/whitebox-co/amazon-ads-api/commit/5cf5adbfe934aa5beb5af8d85b920de8841c4b8a)), closes [#30](https://github.com/whitebox-co/amazon-ads-api/issues/30)
-   auto-generated amazon api updates to brand, data, dsp, and sponsored-products ([6e1313b](https://github.com/whitebox-co/amazon-ads-api/commit/6e1313b8a11286b4d6d17b88e3e15100d6df9084))

# [1.1.0](https://github.com/whitebox-co/amazon-ads-api/compare/v1.0.0...v1.1.0) (2022-01-21)

### Bug Fixes

-   fixed merge conflict typo ([f75d661](https://github.com/whitebox-co/amazon-ads-api/commit/f75d661a91f4d1ac9c02d71f106d847302644e1c))
-   fixed sponsored brand extra overriding sponsored brands resource ([dd8d8ca](https://github.com/whitebox-co/amazon-ads-api/commit/dd8d8cafe3fcfa5142e5370f331a79d1464d6f26))

### Features

-   **attribution:** amazon schema changes ([77e00e4](https://github.com/whitebox-co/amazon-ads-api/commit/77e00e4d02f899cf9c09f8741db06e9f8fcf6376))
-   **sponsored-products-extra:** amazon schema changes ([613793e](https://github.com/whitebox-co/amazon-ads-api/commit/613793efd53d3ed4cc5b1e158906858074941e42))

# 1.0.0 (2022-01-03)

### Bug Fixes

-   adding ability for generator to replace unknown_types so lint does not fail ([dde2762](https://github.com/whitebox-co/amazon-ads-api/commit/dde2762ca42304f128414a8788c5d50ac9e017e2))

### Features

-   adding latest changes based on amazon schema changes ([b3eba3b](https://github.com/whitebox-co/amazon-ads-api/commit/b3eba3b9c0065f8b89ab4ed7228b1a81f4cdc3c9))
-   initial commit of codebase to github ([14bb531](https://github.com/whitebox-co/amazon-ads-api/commit/14bb531211e968a80cc67c7981063033540dc012))
