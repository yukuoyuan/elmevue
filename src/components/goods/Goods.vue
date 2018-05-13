<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) of goods" :key="index">
          <span class="text">
            <span v-show="item.type>0" class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foot-wrapper"></div>
  </div>
</template>

<script>
  import axios from 'axios'

  const ERR_OK = 0
  export default {
    name: 'Goods',
    data: function () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        goods: []
      }
    },
    created: function () {
      axios.get('http://localhost:3030/api/goods/').then((res) => {
        res = res.data
        if (res.code === ERR_OK) {
          this.goods = res.list
        }
        console.log(res)
      })
    }
  }
</script>

<style lang="stylus" scoped>
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

  /*.foot-wrapper*/
</style>
