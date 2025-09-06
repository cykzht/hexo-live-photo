'use strict';

const path = require('path');
const fs = require('hexo-fs');

// 注入资源文件到HTML中
module.exports.injectAssets = function(hexo, config) {
  const { injector } = hexo.extend;
  
  // 获取资源文件路径
  const cssPath = path.join(__dirname, '../assets/livephoto.css');
  const jsPath = path.join(__dirname, '../assets/livephoto.js');
  
  // 读取CSS和JS文件内容
  const css = fs.readFileSync(cssPath);
  const js = fs.readFileSync(jsPath);
  
  // 将配置注入到JavaScript中
  const configScript = `
    <script>
      window.LivePhotoConfig = ${JSON.stringify(config)};
    </script>
  `;
  
  // 注入到head中
  injector.register('head_begin', () => configScript, 'post');
  injector.register('head_begin', () => `<style>${css}</style>`, 'post');
  injector.register('body_end', () => `<script>${js}</script>`, 'post');
};