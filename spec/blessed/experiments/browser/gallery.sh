# manual steps: 
# *  manually remove browserify prop form node_modules/gradstop (issue reported)
# * edit src/index and comment export for editorWidget

 mkdir -p docs/browser
browserify -r "term.js" --ignore-missing -o docs/browser/termjs.js
browserify -r blessed --ignore-missing -o docs/browser/blessed.js 
browserify -r blessed-contrib --ignore-missing -o docs/browser/blessed-contrib.js 
npx tsc #ignore errors
browserify -x blessed  -x term.js -x blessed-contrib -x editor-widget  -x text-buffer dist/spec/blessed/gallery/main.js -o docs/browser/gallery.js --ignore-missing 
cp spec/blessed/experiments/browser/gallery.html docs/browser

# and to minify
npx terser -o docs/browser/blessed.js docs/browser/blessed.js
npx terser -o docs/browser/blessed-contrib.js docs/browser/blessed-contrib.js
npx terser -o docs/browser/termjs.js docs/browser/termjs.js
npx terser -o docs/browser/gallery.js docs/browser/gallery.js