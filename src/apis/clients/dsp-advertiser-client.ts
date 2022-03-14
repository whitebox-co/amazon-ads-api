
/* tslint:disable */
/* eslint-disable */
/**
 * DspAdvertiserClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { AdvertiserApi } from '../models/dsp-advertiser';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class DspAdvertiserClient extends AdvertiserApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


