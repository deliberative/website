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

const icoPath = path.join(
  process.cwd(),
  'src',
  'static',
  'images',
  'logo-icon-dark.jpeg',
);
const jpeg = fs.readFileSync(icoPath);
const icoOutpath = path.join(process.cwd(), 'dist', 'static', 'images');
fs.mkdirSync(icoOutpath, { recursive: true });
fs.writeFileSync(icoOutpath + path.sep + 'logo-icon-dark.jpeg', jpeg);

const htmlPath = browserPath.replace('index.js', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(
  htmlPath,
  html.replace(
    '</head>',
    '<link rel="icon" type="image/x-icon" href="/static/images/logo-icon-dark.ico">\n</head>',
  ),
);
