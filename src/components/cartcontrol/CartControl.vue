<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'CartControl',
    props: {
      food: {
        type: Object
      }
    },
    created: function () {
    },
    methods: {
      addCart: function (event) {
        /**
         *如果是浏览器派发的事件,就返回
         */
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('addCartTarget', event.target)
      },
      decreaseCart: function (event) {
        /**
         *如果是浏览器派发的事件,就返回
         */
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cart-control
    font-size 0
    display inline-block
    .cart-decrease
      padding 6px
      transition all 0.4s linear
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 120, 220)
      &.move-enter-active, &.move-enter-active
        opacity 1
        transform translate3D(0, 0, 0) rotate(0)
      &.move-enter, &.move-leave
        opacity 0
        transform translate3D(24px, 0, 0) rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      font-size 10px
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 120, 220)
</style>
