module.exports = {
  // src: [
    // './src/index.ts'
    // './dist/src/index.d.ts',
  // ],
  // "mode": 'file',
  // excludeNotExported: true,
  'includeDeclarations': true,
  // 'tsconfig': './tsconfig.json',
  'tsconfig': './tsconfigTypedoc.json',

  // 'out': 'docs/api/accursed',
  // 'excludePrivate': true,
  exclude: './spec/**',
  // 'excludeProtected': true,
  'excludeExternals': true,
  'readme': 'README.md',
  'name': 'accursed',
  // top: true, 
  hideGenerator: true, 
  ignoreCompileErrors: true,
}