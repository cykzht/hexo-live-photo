'use strict';

const { url_for } = require('hexo-util');

module.exports.tag = function(hexo, config) {
  return function(args) {
    // 解析参数
    const imageUrl = args[0];
    const videoUrl = args[1];
    const altText = args[2] || 'Live Photo';
    const caption = args[3] || '';
    const width = args[4] || '';
    const height = args[5] || '';
    
    // 生成唯一ID
    const id = 'livephoto-' + Math.random().toString(36).substr(2, 9);
    
    // 处理URL
    const processedImageUrl = imageUrl.startsWith('http') ? imageUrl : url_for.call(hexo, imageUrl);
    const processedVideoUrl = videoUrl.startsWith('http') ? videoUrl : url_for.call(hexo, videoUrl);
    
    // 构建HTML
    let html = `
      <div class="live-photo-container" id="${id}" ${width ? `style="max-width: ${width};"` : ''}>
        <img src="${processedImageUrl}" alt="${altText}" class="live-photo-static" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"` : ''}>
        <video muted playsinline preload="${config.preload}" class="live-photo-video">
          <source src="${processedVideoUrl}" type="video/mp4">
        </video>
    `;
    
    // 添加Live标识
    if (config.badge) {
      html += `
        <div class="live-badge ${config.badge_position}">${config.badge_text}</div>
      `;
    }
    
    // 添加加载指示器
    if (config.loading_animation) {
      html += `
        <div class="live-loading"></div>
      `;
    }
    
    html += `</div>`;
    
    // 添加标题
    if (caption) {
      html += `
        <div class="live-caption">${caption}</div>
      `;
    }
    
    return html;
  };
};