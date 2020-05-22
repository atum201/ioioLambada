const minify = require('minify');
const fs = require('fs');
minify('ioioLambdaBasicCG/index.js')
.then(text=>fs.writeFileSync('zip/index.js', text))
.catch(console.error);