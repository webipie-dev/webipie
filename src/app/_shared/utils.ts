import {backendProtocol, backendDomainName, backendHttpProtocol} from 'src/app/configuration';
export class Utils {
  public static baseUrl = `${backendHttpProtocol}://${backendDomainName}:${backendProtocol}`;
  public static url = Utils.baseUrl;
}
