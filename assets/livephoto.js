// LivePhoto类，管理单个Live Photo的行为
class LivePhoto {
  constructor(container, config) {
    this.container = container;
    this.staticImage = container.querySelector(".live-photo-static");
    this.video = container.querySelector(".live-photo-video");
    this.config = config;
    this.hasAutoPlayed = false;
    this.isPlaying = false;
    this.hoverTimeout = null;
    this.isWeixin = this.detectWeixinBrowser();

    // 在微信环境中调整配置
    if (this.isWeixin && this.config.weixin_disable_autoplay) {
      this.config.autoplay = false;

      // 修改微信环境下的badge
      this.modifyWeixinBadge();
    }

    // 绑定事件
    this.bindEvents();
  }

  // 检测微信浏览器
  detectWeixinBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("micromessenger");
  }

  // 修改微信环境下的badge
  modifyWeixinBadge() {
    let badge = this.container.querySelector(".live-badge");

    // 如果没有badge，创建一个
    if (!badge && this.config.badge) {
      badge = document.createElement("div");
      badge.className = `live-badge ${
        this.config.badge_position || "bottom-left"
      }`;
      this.container.appendChild(badge);
    }

    // 修改badge内容和样式
    if (badge) {
      if(!this.config.badge_text) {
        badge.innerHTML = "点击播放";
      } else{
        badge.innerHTML = this.config.badge_text + " | 点击播放";
      }
    }
  }

  // 绑定事件
  bindEvents() {
    // 桌面端：鼠标悬停播放
    if (this.config.hover_to_play) {
      this.container.addEventListener("mouseenter", () =>
        this.handleHoverStart()
      );
      this.container.addEventListener("mouseleave", () =>
        this.handleHoverEnd()
      );
    }

    // 点击事件 - 在微信环境中这是主要的交互方式
    if (this.config.click_to_play) {
      this.container.addEventListener("click", (e) => {
        this.play();
      });
    }

    // 监听视频结束事件
    this.video.addEventListener("ended", () => this.stop());

    // 监听视频加载事件
    this.video.addEventListener("loadstart", () => this.showLoading());
    this.video.addEventListener("canplay", () => this.hideLoading());
    this.video.addEventListener("error", () => this.hideLoading());
  }

  // 处理悬停开始
  handleHoverStart() {
    // 清除之前的超时
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout);

    // 设置延迟播放
    this.hoverTimeout = setTimeout(() => {
      this.play();
    }, this.config.hover_delay || 300);
  }

  // 处理悬停结束
  handleHoverEnd() {
    // 清除悬停超时
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    // 如果视频正在播放，不停止（让它播放完）
  }

  // 显示加载指示器
  showLoading() {
    let loadingEl = this.container.querySelector(".live-loading");
    if (!loadingEl && this.config.loading_animation) {
      loadingEl = document.createElement("div");
      loadingEl.className = "live-loading";
      this.container.appendChild(loadingEl);
    }
    if (loadingEl) {
      loadingEl.style.display = "block";
    }
  }

  // 隐藏加载指示器
  hideLoading() {
    const loadingEl = this.container.querySelector(".live-loading");
    if (loadingEl) {
      loadingEl.style.display = "none";
    }
  }

  // 播放视频
  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.staticImage.style.opacity = 0;
    this.video.classList.add("playing");
    if (this.video.readyState < 3) { // HAVE_FUTURE_DATA
      this.showLoading();
    }

    // 播放视频
    const playPromise = this.video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("视频播放失败:", error);
        this.hideLoading();
        this.isPlaying = false;
      });
    }
  }

  // 停止播放
  stop() {
    this.video.classList.remove("playing");
    this.staticImage.style.opacity = 1;
    this.isPlaying = false;
    this.hideLoading();
  }

  // 自动播放（当进入视口时）
  autoPlay() {
    if (!this.hasAutoPlayed && this.config.autoplay) {
      this.hasAutoPlayed = true;
      this.play();
    }
  }
}

// 页面主控制器
class LivePhotoPage {
  constructor(config) {
    this.config = config;
    this.livePhotos = [];
    this.observer = null;

    this.init();
  }

  // 初始化
  init() {
    this.detectLivePhotos();

    // 检测是否为微信环境
    const isWeixin = navigator.userAgent
      .toLowerCase()
      .includes("micromessenger");

    // 如果在微信环境中且禁用自动播放，则不设置Intersection Observer
    if (isWeixin && this.config.weixin_disable_autoplay) {
      return;
    }

    // 如果启用懒加载，设置Intersection Observer
    if (this.config.lazy_load) {
      this.setupIntersectionObserver();
    } else if (this.config.autoplay) {
      // 如果不使用懒加载，直接自动播放所有
      this.livePhotos.forEach((livePhoto) => livePhoto.autoPlay());
    }
  }

  // 检测页面中的所有Live Photo容器
  detectLivePhotos() {
    const containers = document.querySelectorAll(".live-photo-container");

    containers.forEach((container) => {
      // 检查是否已经初始化过
      if (!container.dataset.initialized) {
        const livePhoto = new LivePhoto(container, this.config);
        this.livePhotos.push(livePhoto);
        container.dataset.initialized = "true";
      }
    });
  }

  // 设置Intersection Observer
  setupIntersectionObserver() {
    // 如果已有observer，先断开所有观察
    if (this.observer) {
      this.observer.disconnect();
    }

    // 创建新的observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 找到对应的LivePhoto实例
            const container = entry.target;
            const livePhoto = this.livePhotos.find(
              (lp) => lp.container === container
            );

            if (livePhoto) {
              livePhoto.autoPlay();

              // 如果不需要持续观察，可以取消观察
              if (!this.config.keep_observing) {
                this.observer.unobserve(container);
              }
            }
          }
        });
      },
      {
        threshold: this.config.threshold,
        rootMargin: "0px 0px 10% 0px", // 底部提前10%触发
      }
    );

    // 开始观察所有Live Photo容器
    this.livePhotos.forEach((livePhoto) => {
      this.observer.observe(livePhoto.container);
    });
  }
}

// 当DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  if (window.LivePhotoConfig && window.LivePhotoConfig.enable) {
    window.livePhotoPage = new LivePhotoPage(window.LivePhotoConfig);
  }
});
