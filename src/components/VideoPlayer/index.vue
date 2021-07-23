<template>
	<div class="video-wraper">
		<video-player
			class="video-player vjs-custom-skin"
			ref="videoPlayer"
			:playsinline="true"
			:options="playerOptions"
		></video-player>
	</div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
	name: 'VideoPlayer',
	components: {
		videoPlayer,
	},
	props: {
		sources: {
			type: Array,
			default() {
				return []
      },
		},
		poster: {
			type: String,
			default: '@/assets/logo/logo.png',
		},
		playbackRates: {
			type: Array,
			default() {
				return [0.7, 1.0, 1.5, 2.0]
			},
		},
		autoplay: {
			type: Boolean,
			default: false,
		},
		muted: {
			type: Boolean,
			default: false,
    },
    language: {
      type: String,
      default: 'zh-CN'
    },
    aspectRatio: {
      type: String,
      default: '16:9'
    },
    preload: {
      type: String,
      default: 'auto'
    },
    fluid: {
      type: Boolean,
      default: true
    },
		loop: {
			type: Boolean,
			default: false,
    },
    width: {
      type: Number,
      default: 200
    },
		notSupportedMessage: {
			type: String,
			default: '此视频暂无法播放，请稍后再试',
		},
		controlBar: {
			type: Object,
			default() {
				return ({
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true, //全屏按钮
				})
			},
		},
	},
	data() {
		return {
			playerOptions: {
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoplay: false, //如果true,浏览器准备好时开始回放。
				muted: false, // 默认情况下将会消除任何音频。
				loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
				],
				poster: '@/assets/logo/logo.png', //你的封面地址
        width: 200,
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true, //全屏按钮
				},
			},
		}
  },
  created() {
    this.playerOptions = {
      playbackRates: this.playbackRates,
      autoplay: this.autoplay,
      muted: this.muted,
      loop: this.loop,
      preload: this.preload,
      language: this.language,
      aspectRatio: this.aspectRatio,
      fluid: this.fluid,
      sources: this.sources,
      poster: this.poster,
      width: this.width,
      height: this.height,
      notSupportedMessage: this.notSupportedMessage,
      controlBar: this.controlBar
		}		
},
mounted() {

},
  computed: {
    videoPlayer() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .video-wraper {
    display: inline-block;
    width: 200px;
    height: 150px;
    .video-player .vjs-custom-skin {
      display: inline-block;
      width: 200px;
      height: 150px;
    }
  }
	.video-js .vjs-big-play-button{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
}
</style>
