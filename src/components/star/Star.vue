<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) of itemClasses" :class="itemClass" :key="index" class="star-item">
    </span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    name: 'Star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType: function () {
        return 'star-' + this.size
      },
      itemClasses: function () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDeceimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDeceimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/mixin.styl"
  .star {
    font-size: 0;
  }

  .star .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  .star.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
  }

  .star.star-24 .star-item.on {
    bg-image('star24_on')

  }

  .star.star-24 .star-item.half {
    bg-image('star24_half')

  }

  .star.star-24 .star-item.off {
    bg-image('star24_off')

  }

  .star.star-24 .star-item.last-child {
    margin-right 0
  }

  .star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
  }

  .star.star-36 .star-item.on {
    bg-image('star36_on')

  }

  .star.star-36 .star-item.half {
    bg-image('star36_half')
  }

  .star.star-36 .star-item.off {
    bg-image('star36_off')
  }

  .star.star-36 .star-item.last-child {
    margin-right 0
  }

  .star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }

  .star.star-48 .star-item.on {
    bg-image('star48_on')
  }

  .star.star-48 .star-item.half {
    bg-image('star48_half')
  }

  .star.star-48 .star-item.off {
    bg-image('star48_off')
  }

  .star.star-48 .star-item.last-child {
    margin-right 0
  }

</style>
