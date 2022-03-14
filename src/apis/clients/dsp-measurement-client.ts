
/* tslint:disable */
/* eslint-disable */
/**
 * DspMeasurementClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { MeasurementApi } from '../models/dsp-measurement';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class DspMeasurementClient extends MeasurementApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


