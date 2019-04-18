module.exports = {
  src: [
        './dist/src/index.d.ts',
        // './node_modules/node-pty/typings/node-pty.d.ts'
    ],
  "mode": 'file',
  'includeDeclarations': true,
  'tsconfig': 'tsconfig.json',
  'out': 'docs/api/accursed',
  'excludePrivate': true,
  // 'excludeProtected': true,
  'excludeExternals': true,
  'readme': 'README.md',
  'name': 'accorsed'
}
