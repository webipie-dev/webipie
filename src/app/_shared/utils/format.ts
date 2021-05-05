export class Format {
  static fmtPort(port: number){
      if (port == 80)
        return ""
      else
        return `:${port}`
  }
}
