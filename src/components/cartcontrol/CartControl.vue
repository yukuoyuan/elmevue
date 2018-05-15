<template>
  <div class="cart-control">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)">
    </div>
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
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 120, 220)
    .cart-count
      display inline-block
      vertical-align top
      font-size 10px
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      color rgb(147, 153, 159)
</style>
