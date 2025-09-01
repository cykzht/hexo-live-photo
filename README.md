# Hexo-live-photo

A lightweight and easy-to-use Hexo plugin for elegantly displaying Live Photos (dynamic photos) and similar animated images taken by devices like iPhone, Android, etc., in blog posts.

## Origin and Introduction

Today's smartphones (such as iPhone's Live Photo and similar features on some Android devices) can capture dynamic photos, recording approximately 3 seconds of dynamic video and audio before and after the shot. However, when we deploy blog posts to static websites, these dynamic photos are often degraded to static JPEG images, losing their vivid core experience.

**Hexo-live-photo** is a plugin born to solve this problem. It parses Live Photo resources (a `.jpg` image and an `.mp4` video) and utilizes HTML5 video playback technology to perfectly restore the playback effect of dynamic photos without affecting page loading performance, making your memories more vivid.

## Usage Instructions

- [中文说明](https://www.g2022cyk.top/2025/09/01/hexo-live-photo使用说明)
- [English instructions](https://www.g2022cyk.top/2025/09/01/hexo-live-photo-user-guide)

## Installation

Run the following command in the root directory of your Hexo blog:

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
  touch_to_play: true
  click_to_play: false
  lazy_load: true
  threshold: 0.8
  badge: true
  badge_text: 'Live'
  badge_position: 'bottom-left'
  loading_animation: true
  preload: 'auto'
  keep_observing: false
  hover_delay: 300
  touch_delay: 100
```

## Usage in Articles

Use the `{% live_photo %}` tag anywhere in your Markdown articles (`.md` files) where you need to insert dynamic photos.

**Basic syntax:**

```markdown
{% livephoto image_path video_path %}
```

## Contributions

Welcome to submit Issues and Pull Requests!

## License

MIT

## Support

If this plugin has helped you, please give a star ⭐. If you encounter any issues during use, please submit [Issues](https://github.com/cykzht/hexo-live-photo/issues).