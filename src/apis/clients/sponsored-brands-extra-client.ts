
/* tslint:disable */
/* eslint-disable */
/**
 * SponsoredBrandsExtraClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { AdCreativesApi,AdGroupsApi,AdsApi,BudgetRecommendationsApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignsApi,DefaultApi,KeywordRecommendationsApi,ProductTargetingApi,RecommendationsApi,SuggestionsApi } from '../models/sponsored-brands-extra';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class SponsoredBrandsExtraClient extends AdCreativesApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


    export interface SponsoredBrandsExtraClient extends AdCreativesApi,AdGroupsApi,AdsApi,BudgetRecommendationsApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignsApi,DefaultApi,KeywordRecommendationsApi,ProductTargetingApi,RecommendationsApi,SuggestionsApi {}
    applyMixins(SponsoredBrandsExtraClient, [AdCreativesApi,AdGroupsApi,AdsApi,BudgetRecommendationsApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignsApi,DefaultApi,KeywordRecommendationsApi,ProductTargetingApi,RecommendationsApi,SuggestionsApi])
    
