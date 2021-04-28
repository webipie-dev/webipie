import {backendPort, backendDomainName, backendHttpProtocol} from 'src/app/configuration';
export class Utils {
  public static baseUrl = `${backendHttpProtocol}://${backendDomainName}:${backendPort}`;
  public static url = Utils.baseUrl;
}
