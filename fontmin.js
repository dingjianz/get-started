/**
 * 用于对字体进行按需压缩的 node 工具
 * src 原字体
 * dest 输出目录
 * chars 用到的字符集
 *
 * https://github.com/ecomfe/fontmin
 */

const fs = require('fs');
const path = require('path');
const Fontmin = require('fontmin');
const rename = require('gulp-rename');

const assetPath = path.resolve(__dirname, '../assets');

const chars = fs.readFileSync(path.resolve(assetPath, 'index/fonts/chars.txt'), 'utf-8');

console.log('=============== 用到的字符 ===================');
console.log(chars);
console.log('=============================================');

const src = path.resolve(assetPath, 'index/pm.ttf');
const dest = path.resolve(assetPath, 'index/fonts');
console.log('输入: ', src);
console.log('输出: ', dest);
const fontmin = new Fontmin()
  .src(src)
  .dest(dest)
  .use(rename('index.ttf'))
  .use(
    Fontmin.glyph({
      text: chars,
      hinting: false, // keep ttf hint info (fpgm, prep, cvt). default = true
    })
  );

fontmin.run(function (err, files) {
  if (err) {
    throw err;
  }
  // console.log(files[0]);
  // => { contents: <Buffer 00 01 00 ...> }
});
