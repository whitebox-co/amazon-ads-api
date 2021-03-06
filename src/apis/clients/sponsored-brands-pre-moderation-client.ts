
/* tslint:disable */
/* eslint-disable */
/**
 * SponsoredBrandsPreModerationClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { PreModerationApi } from '../models/sponsored-brands-pre-moderation';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class SponsoredBrandsPreModerationClient extends PreModerationApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


