
/* tslint:disable */
/* eslint-disable */
/**
 * AttributionClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { AdvertisersApi,AttributionTagsApi,PublishersApi,ReportsApi } from '../models/attribution';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class AttributionClient extends AdvertisersApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


    export interface AttributionClient extends AdvertisersApi,AttributionTagsApi,PublishersApi,ReportsApi {}
    applyMixins(AttributionClient, [AdvertisersApi,AttributionTagsApi,PublishersApi,ReportsApi])
    
