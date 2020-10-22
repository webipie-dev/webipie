import {environment} from '../../environments/environment';

export class Utils {
  public static baseUrl = environment.production ?
    '' : '';

  static toggleSidenav() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebar-non-active").classList.toggle("active");
    document.getElementById("sidebar-next").classList.toggle("sidenav-next");
  }
}
