# Hexo-live-photo

A lightweight and easy-to-use Hexo plugin for elegantly displaying Live Photos (dynamic photos) and similar animated images taken by devices like iPhone, Android, etc., in blog posts.

## Origin and Introduction

Today's smartphones (such as iPhone's Live Photo and similar features on some Android devices) can capture dynamic photos, recording approximately 3 seconds of dynamic video and audio before and after the shot. However, when we deploy blog posts to static websites, these dynamic photos are often degraded to static JPEG images, losing their vivid core experience.

**Hexo-live-photo** is a plugin born to solve this problem. It parses Live Photo resources (a `.jpg` image and a `.mp4` video) and utilizes HTML5 video playback technology to perfectly restore the playback effect of dynamic photos without affecting page loading performance, making your memories more vivid.

## Usage Instructions

- [中文说明](https://www.g2022cyk.top/2025/09/01/hexo-live-photo使用说明)
- [English instructions](https://www.g2022cyk.top/2025/09/01/hexo-live-photo-user-guide)

## Installation

Execute the following command in the root directory of your Hexo blog:

```bash
npm install hexo-live-photo --save
```

## Configuration

Add the following options to the main configuration file `_config.yml` of Hexo:

```yaml
livephoto:
  enable: true
  autoplay: true
  hover_to_play: true
  click_to_play: true
  lazy_load: true
  threshold: 0.8
  badge: true
  badge_text: 'Live'
  badge_position: 'bottom-left'
  loading_animation: true
  preload: 'auto'
  keep_observing: false
  hover_delay: 300
  weixin_disable_autoplay: true
```

## Usage in Articles

Use the `{% live_photo %}` tag anywhere in your Markdown articles (`.md` files) where you need to insert dynamic photos.

**Basic syntax:**

```markdown
{% livephoto image_path video_path %}
```

## Changelog

- V1.1.3: Optimized badge content, optimized page insertion logic, updated configuration file entries.
- V1.1.2: Fixed loading indicator display issues, added CSS styles for displaying two images in a row on mobile devices.
- V1.1.1: Added compatibility support for WeChat, fixed autoplay issues on some browsers.

## Contributions

Welcome to submit Issues and Pull Requests!

## License

MIT

## Support

If this plugin has helped you, please give a star ⭐. If you encounter any issues during use, please submit [Issues](https://github.com/cykzht/hexo-live-photo/issues).