import env from 'env-var';

/**
 * Reads environment variables.
 *
 * Set either via CLI or in the `.env` file.
 *
 * @example
 *
 * `CLIENT_ID=xyz npm start`
 */

export const AMAZON_ADS_CLIENT_ID = env.get('AMAZON_ADS_CLIENT_ID').required().asString();
export const AMAZON_ADS_CLIENT_SECRET = env.get('AMAZON_ADS_CLIENT_SECRET').required().asString();
export const AMAZON_ADS_PROFILE_ID = env.get('AMAZON_ADS_PROFILE_ID').required().asString();
export const AMAZON_ADS_ACCESS_TOKEN = env.get('AMAZON_ADS_ACCESS_TOKEN').asString();
export const AMAZON_ADS_REFRESH_TOKEN = env.get('AMAZON_ADS_REFRESH_TOKEN').required().asString();
