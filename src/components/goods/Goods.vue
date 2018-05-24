<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <div>
          <div v-for="(item,index) of goods" :key="index" class="menu-item" :class="currentIndex===index?'current':''"
               @click="selectMenu(index,$event)">
          <span class="text"><span v-show="item.type>0" class="icon"
                                   :class="classMap[item.type]"></span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="food-wrapper" ref="goodWrapper">
        <div>
          <div v-for="(item,index) in goods" :key="index" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <div v-for="(food,index) of item.foods" :key="index" class="food-item" @click="checkedFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月销售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">${{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @addCartTarget="addCartTargetClick"></cart-control>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <shop-cart ref="shopcart" :deliveryPrice="seller.deliveryPrice"
                 :minPrice="seller.minPrice"
                 :selectFoods="selectFoods"></shop-cart>
    </div>
    <food :food="selectFood" ref="food"></food>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import ShopCart from '@/components/shopcart/Shopcart'
  import CartControl from '@/components/cartcontrol/CartControl'
  import Food from '@/components/food/Food'

  export default {
    name: 'Goods',
    components: {
      ShopCart,
      CartControl,
      Food
    },
    props: {
      seller: Object
    },
    data: function () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        goods: [],
        scrollY: 0,
        listHeight: [],
        selectFood: {}
      }
    },
    created: function () {
      // http://ustbhuangyi.com/sell/api/goods
      // /api/goods/
      axios.get('http://ustbhuangyi.com/sell/api/goods').then((res) => {
        res = res.data.data
        this.goods = res
        /**
         * 延迟去初始化滚动,因为这个时候dom还没有更新完毕,类似于settimeout的延时操作
         */
        this.$nextTick(() => {
          this.initScroll()
          this.caculateHeight()
        })
      })
    },
    methods: {
      /**
       * 左侧menu点击调用的方法
       */
      selectMenu: function (index, event) {
        /**
         *如果是浏览器派发的事件,就返回
         */
        if (!event._constructed) {
          return
        }
        let goodslist = this.$refs.goodWrapper.getElementsByClassName('food-list')
        let checkitem = goodslist[index]
        this.goodScroll.scrollToElement(checkitem)
        this.scrollY = this.listHeight[index]
      },
      initScroll: function () {
        /**
         * 延迟去初始化滚动,因为这个时候dom还没有更新完毕,类似于settimeout的延时操作
         */
        this.$nextTick(() => {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          })
          this.goodScroll = new BScroll(this.$refs.goodWrapper, {
            click: true,
            probeType: 3
          })
          /**
           * 设置监听
           */
          this.goodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
          })
        })
      },
      /**
       * 计算高度
       */
      caculateHeight: function () {
        let goodslist = this.$refs.goodWrapper.getElementsByClassName('food-list')
        /**
         *获取到所有的元素之后,计算总共的高度
         */
        let height = 0
        /**
         * 初始化空的
         */
        this.listHeight.push(height)
        for (let i = 0; i < goodslist.length; i++) {
          // 获取每一个数据
          let item = goodslist[i]
          height += item.clientHeight
          /**
           *添加每个数据的高度区间
           */
          this.listHeight.push(height)
        }
      },
      /**
       *当点击添加按钮的时候监听
       */
      addCartTargetClick: function (target) {
        // this.shopcartTarget = target
        this.$refs.shopcart.shopcartTargets(target)
      },
      checkedFood: function (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectFood = food
        this.$refs.food.show()
      }
    },
    computed: {
      /**
       * 计算选中的
       */
      currentIndex: function () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let lineheight1 = this.listHeight[i]
          let lineheight2 = this.listHeight[i + 1]
          if (!lineheight2 || (this.scrollY < lineheight2 && this.scrollY >= lineheight1)) {
            return i
          }
        }
        return 0
      },
      selectFoods: function () {
        let selectFoods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count && food.count > 0) {
              selectFoods.push(food)
            }
          })
        })
        return selectFoods
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top: 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          font-weight bold
          background white
          .text
            border-bottom 0px
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .food-wrapper
      flex 1
      .food-list
        margin-top -8px
        .title
          padding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(147, 153, 159)
          background #f3f5f7
        .food-item
          display flex
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          margin 18px
          padding-bottom 18px
          .icon
            flex 0 0 57px
            margin-right 10px
          .content
            position relative
            flex 1
            .name
              margin 2px 0 8px 0
              font-size 14px
              line-height 14px
              height 14px
              color rgb(7, 17, 27)
            .desc, .extra
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .desc
              line-height 12px
              margin-bottom 8px
            .extra
              .count
                margin-right 12px
            .price
              font-weight bold
              line-height 24px
              .now
                margin-right 8px
                font-size 14px
                color rgb(240, 20, 20)
                line-height 24px
              .old
                text-decoration line-through
                color rgb(147, 153, 159)
                font-size 10px
            .cart-control-wrapper
              position absolute
              right 0
              bottom -8px
</style>
