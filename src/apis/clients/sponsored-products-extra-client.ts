
/* tslint:disable */
/* eslint-disable */
/**
 * SponsoredProductsExtraClient
 *
 * NOTE: This class is auto generated by ts-morph
 * Do not edit the class manually.
 */

import { AdGroupsApi,BudgetRecommendationNewCampaignsApi,BudgetRecommendationsAndMissedOpportunitiesApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignNegativeKeywordsApi,CampaignNegativeTargetingClausesApi,CampaignOptimizationRulesApi,CampaignsApi,ConsolidatedRecommendationsApi,KeywordRecommendationsApi,KeywordsApi,NegativeKeywordsApi,NegativeTargetingClausesApi,ProductAdsApi,ProductRecommendationServiceApi,ProductTargetingApi,TargetingClausesApi,ThemeBasedBidRecommendationApi } from '../models/sponsored-products-extra';
import { DEFAULT_API_BASE_PATH, APIConfigurationParameters } from '../../constants';
import { getAxiosInstance, applyMixins, AdsConfiguration } from '../../helpers';

export class SponsoredProductsExtraClient extends AdGroupsApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = getAxiosInstance(parameters)
    const configuration = new AdsConfiguration(parameters)
    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}


    export interface SponsoredProductsExtraClient extends AdGroupsApi,BudgetRecommendationNewCampaignsApi,BudgetRecommendationsAndMissedOpportunitiesApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignNegativeKeywordsApi,CampaignNegativeTargetingClausesApi,CampaignOptimizationRulesApi,CampaignsApi,ConsolidatedRecommendationsApi,KeywordRecommendationsApi,KeywordsApi,NegativeKeywordsApi,NegativeTargetingClausesApi,ProductAdsApi,ProductRecommendationServiceApi,ProductTargetingApi,TargetingClausesApi,ThemeBasedBidRecommendationApi {}
    applyMixins(SponsoredProductsExtraClient, [AdGroupsApi,BudgetRecommendationNewCampaignsApi,BudgetRecommendationsAndMissedOpportunitiesApi,BudgetRulesApi,BudgetRulesRecommendationApi,BudgetUsageApi,CampaignNegativeKeywordsApi,CampaignNegativeTargetingClausesApi,CampaignOptimizationRulesApi,CampaignsApi,ConsolidatedRecommendationsApi,KeywordRecommendationsApi,KeywordsApi,NegativeKeywordsApi,NegativeTargetingClausesApi,ProductAdsApi,ProductRecommendationServiceApi,ProductTargetingApi,TargetingClausesApi,ThemeBasedBidRecommendationApi])
    
