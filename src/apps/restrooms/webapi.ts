/* eslint class-methods-use-this: 0 */
import { RESTROOMS_BY_LOCATION_API } from '@/constants';

interface RestroomSearchParams {
  query: string,
}

interface RestroomsByLocationParams {
  lat: number,
  lon: number,
  ada?: boolean,
  unisex?: boolean,
  page?: number,
  offset?: number,
}

export default class WebApi {
  public static async getRestroomsByLocation(params: RestroomsByLocationParams) {
    const requestParams = {
      per_page: 20,
      ...params,
    };
    const url = WebApi.buildUrlQueryParams(RESTROOMS_BY_LOCATION_API, requestParams);
    const response = await fetch(url);
    const respJson = await response.json();
    return respJson;
  }

  private static buildUrlQueryParams(url: string, queryParams: any) {
    const queryString = Object.keys(queryParams)
      .map(k => `${k}=${queryParams[k]}`)
      .join('&');
    return `${url}?${queryString}`;
  }
}
