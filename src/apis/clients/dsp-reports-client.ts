
/* tslint:disable */
/* eslint-disable */
/**
 * DspReportsClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { ReportsApi } from '../models/dsp-reports';
import { Configuration } from '../models/configuration';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins } from '../../helpers';

export class DspReportsClient extends ReportsApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new Configuration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


