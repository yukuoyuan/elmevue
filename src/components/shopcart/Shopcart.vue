<template>
  <div class="short-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="totalCount>0?'highlight':''">
            <span class="icon-shopping_cart" :class="totalCount>0?'highlight':''"></span>
          </div>
          <div class="num" v-if="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="totalCount>0?'highlight':''">${{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Shopcart',
    props: {
      deliveryPrice: Number,
      minPrice: Number,
      selectFoods: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      totalPrice: function () {
        let totalPrice = 0
        this.selectFoods.forEach((food) => {
          totalPrice += food.price * food.count
        })
        return totalPrice
      },
      totalCount: function () {
        let totalCount = 0
        this.selectFoods.forEach((food) => {
          totalCount += food.count
        })
        return totalCount
      },
      payDesc: function () {
        if (this.totalPrice === 0) {
          return `$ ${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          let wanting = this.minPrice - this.totalPrice
          return `还差$ ${wanting}起送`
        } else {
          return '去结算'
        }
      },
      payClass: function () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .short-cart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      background #141d27
      display flex
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color white
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight bold
          color #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height: 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight bold
          &.highlight
            color white
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        background #2b333b
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight bold
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color white
</style>
