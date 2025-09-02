'use strict';

const path = require('path');
const fs = require('hexo-fs');

// 插件默认配置
const defaultConfig = {
  enable: true,
  autoplay: true,
  hover_to_play: true,
  click_to_play: true,
  lazy_load: true,
  threshold: 0.8,
  badge: true,
  badge_text: 'Live',
  badge_position: 'bottom-left',
  loading_animation: true,
  preload: 'auto',
  keep_observing: false,
  hover_delay: 300,
  weixin_disable_autoplay: true
};

// 主插件类
class HexoLivePhoto {
  constructor(hexo, config) {
    this.hexo = hexo;
    this.config = Object.assign({}, defaultConfig, config);
  }

  // 注册短代码
  registerTag() {
    const { tag } = require('./lib/tags');
    this.hexo.extend.tag.register('livephoto', tag(this.hexo, this.config), {ends: false});
  }

  // 注入资源文件
  injectAssets() {
    const { injectAssets } = require('./lib/helpers');
    injectAssets(this.hexo, this.config);
  }

  // 初始化
  init() {
    if (!this.config.enable) return;
    
    this.registerTag();
    this.injectAssets();
  }
}

// 插件入口函数
hexo.config.livephoto = Object.assign({}, defaultConfig, hexo.config.livephoto);

const livephoto = new HexoLivePhoto(hexo, hexo.config.livephoto);
livephoto.init();