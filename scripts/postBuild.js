const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const browserPath = path.join(process.cwd(), 'dist', 'index.js');
const unminified = fs.readFileSync(browserPath, 'utf8');
minify(unminified, {
  ecma: 2020,
  mangle: { toplevel: true },
  compress: {
    module: true,
    toplevel: true,
    unsafe_arrows: true,
    drop_console: true,
    drop_debugger: true,
  },
}).then((minified) => {
  fs.writeFileSync(browserPath, minified.code);
});

fs.writeFileSync(browserPath.replace('index.js', 'CNAME'), 'deliberative.eu');
