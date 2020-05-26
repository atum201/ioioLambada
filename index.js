const minify = require('minify');
const fs = require('fs');

minify("function/"+process.argv[2]+'.js')
.then(text=>fs.writeFileSync('zip/index.js', text))
.catch(console.error);