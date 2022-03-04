
/* tslint:disable */
/* eslint-disable */
/**
 * CommonInsightsClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { AudienceInsightsApi } from '../models/common-insights';
import { Configuration } from '../models/configuration';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins } from '../../helpers';

export class CommonInsightsClient extends AudienceInsightsApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new Configuration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}

