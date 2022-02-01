import axios from 'axios';
import { getConfiguration } from '../config';

enum RateLimitStats {
	second = 'second',
	minute = 'minute',
	hour = 'hour',
	day = 'day',
}

export enum RateLimitResponseCode {
	OVER_LIMIT = 'OVER_LIMIT',
	NEAR_LIMIT = 'NEAR_LIMIT',
	OK = 'OK',
}

interface RateLimitDescriptor {
	unit?: RateLimitStats;
	requestPerUnit?: number;
	unlimited?: boolean;
}

interface RateLimitResponseStatus {
	code: RateLimitResponseCode;
	currentLimit: RateLimitDescriptor;
	limitRemaining: number;
}

export interface RateLimitResponse {
	overallCode: RateLimitResponseCode;
	statuses: RateLimitResponseStatus[];
}

const getLimit = async (domain: string, descriptorEntries: any[]): Promise<RateLimitResponse> => {
	const configuration = getConfiguration();

	// since we are using this service as a rate limiter reverse proxy we want to make sure we expose the 429 error to the user instead of letting axios bubble up the error.
	let response: any;
	try {
		response = await axios.post(`${configuration.envoyProxyRateLimitUrl}/json`, {
			domain,
			descriptors: [{ entries: descriptorEntries }],
		});
	} catch (err) {
		if (err.response?.status === 429) {
			response = err.response;
		} else {
			throw err;
		}
	}
	return response.data as RateLimitResponse;
};

export default { getLimit };
