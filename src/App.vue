<template>
  <div id="app">
    <home-header :seller="seller"></home-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">
        商品
      </router-link>
      <router-link to="/ratings" class="tab-item">
        评论
      </router-link>
      <router-link to="/seller" class="tab-item">
        商家
      </router-link>
    </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
  import HomeHeader from '@/components/header/Header'
  import axios from 'axios'

  const ERR_OK = 0
  export default {
    name: 'App',
    data () {
      return {
        seller: {}
      }
    },
    components: {
      HomeHeader
    },
    methods: {},
    created () {
      axios.get('http://localhost:3030/api/seller/').then((res) => {
        res = res.data
        if (res.code === ERR_OK) {
          this.seller = res.list
        }
        console.log(res)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  /*@import "./common/stylus/mixin.styl"*/

  .tab >>> .router-link-exact-active {
    color: rgb(240, 20, 20);
  }

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .tab a {
    display: block;
    text-decoration: none;
  }

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
</style>
