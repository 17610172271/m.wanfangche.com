<template>
  <div class="video-player">
    <video-player  class="video-player-box"
       ref="videoPlayer"
       :options="playerOptions"
       :playsinline="true"
       customEventName="customstatechangedeventname"

       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"

       @statechanged="playerStateChanged($event)"
       @ready="playerReadied">
    </video-player>

<!-- <video-player  class="video-player-box"
   ref="videoPlayer"
   :options="playerOptions"
   :playsinline="true"
   customEventName="customstatechangedeventname"

   @play="onPlayerPlay($event)"
   @pause="onPlayerPause($event)"
   
   @ended="onPlayerEnded($event)"
   @waiting="onPlayerWaiting($event)"
   @playing="onPlayerPlaying($event)"
   @loadeddata="onPlayerLoadeddata($event)"
   @timeupdate="onPlayerTimeupdate($event)"
   @canplay="onPlayerCanplay($event)"
   @canplaythrough="onPlayerCanplaythrough($event)"

   @statechanged="playerStateChanged($event)"
   @ready="playerReadied">
</video-player> -->

    </div>
</template>

<script>
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },

  props: {
    src: {
      type: String,
      default: null
    },
    poster: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    preload: {
      type: String,
      default: 'auto'
    }
  },

  data: () => ({
    playerOptions: {
      // videojs options
      // muted: true,
      // width: 300,
      // height: 300 * 9 / 16,
      // language: 'en',
      // playbackRates: [0.7, 1.0, 1.5, 2.0],
      // sources: [{
      //   type: 'video/mp4',
      //   src: 'http://img01.wanfangche.com/video/Camping_World_Captures_The_West.mp4'
      // }],
      // poster: '/static/images/author.jpg'
    }
  }),

  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },

  mounted () {
    this.playerOptions = {
      // videojs options
      muted: false,
      width: this.width || this.$el.clientWidth,
      height: this.height || Math.ceil(this.$el.clientWidth * 9 / 16),
      language: 'en',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [{
        type: 'video/mp4',
        src: this.src
      }],
      poster: this.poster,
      preload: this.preload
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },

    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      // console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style>
  .video-player {
    position: relative;
    padding: 0 0;
    margin: 0 0;
    line-height: .1;
  }
 .video-player .video-js .vjs-big-play-button {
      width: 1.6em;
      height: 1.6em;
      left: 50%;
      top: 50%;
      margin-left: -.8em;
      margin-top: -.8em;
      background-color: rgba(0,0,0,0.5);
      border-radius: 50%;
      -webkit-border-radius: 50%;
      font-size: 3em;
      line-height: 1.5em;
  }
</style>
