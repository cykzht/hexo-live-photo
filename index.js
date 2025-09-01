'use strict';

const path = require('path');
const fs = require('hexo-fs');

// 插件默认配置
const defaultConfig = {
  enable: true,
  autoplay: true,
  hover_to_play: true, // 改为悬停触发
  touch_to_play: true, // 添加触摸触发选项
  lazy_load: true,
  threshold: 0.8,
  badge: true,
  badge_text: 'Live',
  badge_position: 'bottom-left',
  loading_animation: true,
  preload: 'auto',
  hover_delay: 300, // 添加悬停延迟
  touch_delay: 100  // 添加触摸延迟
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