import {environment} from '../../environments/environment';

export class Utils {
  public static baseUrl = environment.production ?
    '' : '';
}
