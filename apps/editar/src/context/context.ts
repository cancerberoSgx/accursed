export interface Context {
  fs: FS
}

export interface FS {
  read(path: string): Promise<string>
  ls(path: string): Promise<string[]>
  isDirectory(path: string): Promise<boolean>
  write(path: string, content: string): Promise<void>
  // list(pattern: string, options?: FSGlobOptions ): Promise<string[]>
}

export interface FSGlobOptions {
  cwd?: string
  exclude?: string[]
}
