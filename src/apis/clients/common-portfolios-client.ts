
/* tslint:disable */
/* eslint-disable */
/**
 * CommonPortfoliosClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { PortfoliosApi } from '../models/common-portfolios';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class CommonPortfoliosClient extends PortfoliosApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}

