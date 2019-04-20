export interface Options {
  /**
   * could be a file or a url. if not provided input will be read from stdin
   */
  input?: string
  /** if given, only nodes matching the given CCS4 selector will be shown. http://www.w3.org/TR/2011/WD-selectors4-20110929/#subject  */
  filter?:string

  help?: boolean
}