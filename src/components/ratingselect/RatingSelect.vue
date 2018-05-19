<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive" :class="selectType==2?'active':''"
            @click="select(2,$event)">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="selectType==0?'active':''" @click="select(0,$event)">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="selectType==1?'active':''" @click="select(1,$event)">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="onlyContent==true?'on':''">
      <span class="icon-check_circle" @click="toggleContent($event)"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    name: 'RatingSelect',
    props: {
      ratings: {
        type: Array,
        default: function () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: function () {
          return ALL
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default: function () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select: function (type, event) {
        if (!event._constructed) {
          return
        }
        console.log(type)
        this.$emit('ratingtypeselect', type)
      },
      toggleContent: function (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('onlyContentchecked')
      }
    },
    computed: {
      positives: function () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives: function () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .ratingSelect
    .rating-type
      padding 18px 0
      margin 0 18px
      font-size 0
      .block
        display inline-block
        padding 8px 10px
        margin-right 8px
        border-radius 1px
        font-size 12px
        color rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left 2px
          line-height 16px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background rgba(70, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
