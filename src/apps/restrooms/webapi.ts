/* eslint class-methods-use-this: 0 */
import { RESTROOMS_SEARCH_API } from '@/constants';

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
  public static async getRestrooms(params: RestroomsByLocationParams) {
    const url = WebApi.buildUrlQueryParams(RESTROOMS_SEARCH_API, params);
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
