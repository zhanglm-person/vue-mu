<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TopTip extends Vue {
  @Prop({ default: 2000 }) public delay!: number

  public showFlag: boolean = false
  public timer!: number

  public hide() {
    this.showFlag = false
  }

  public show() {
    this.showFlag = true
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.hide()
    }, this.delay)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"

  .top-tip
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      transform: translate3d(0, -100%, 0)
</style>
